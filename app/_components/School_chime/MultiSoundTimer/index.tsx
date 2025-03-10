"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./index.module.css";

// タイマー設定の型定義
export interface TimerSetting {
    id: string | number; // 一意のID
    hour: number; // 時 (0-23)
    minute: number; // 分 (0-59)
    label?: string; // オプションのラベル
}

// コンポーネントのProps型定義
interface MultiSoundTimerProps {
    timerSettings: TimerSetting[]; // 時間設定の配列
    soundUrl?: string; // カスタムサウンドURL（オプション）
    autoStart?: boolean; // 自動開始するかどうか（デフォルトfalse）
}

export default function MultiSoundTimer({
    timerSettings = [],
    soundUrl = "https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3", // デフォルトサウンドを変更
    autoStart = false,
}: MultiSoundTimerProps): React.ReactElement {
    // 状態管理
    const [isRunning, setIsRunning] = useState<boolean>(autoStart);
    const [triggeredTimers, setTriggeredTimers] = useState<Set<string | number>>(new Set());
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // 現在時刻を取得する関数（内部計算用）
    const getCurrentTime = (): { hours: number; minutes: number; seconds: number } => {
        const now = new Date();
        return {
            hours: now.getHours(),
            minutes: now.getMinutes(),
            seconds: now.getSeconds(),
        };
    };

    // タイマー発火時のハンドラー
    const handleTimerTriggered = (timer: TimerSetting) => {
        console.log(`${timer.label}の時間です！`);
        // 通知APIが利用可能であれば通知も表示
        if ("Notification" in window && Notification.permission === "granted") {
            new Notification(`${timer.label || "アラーム"}の時間です！`, {
                body: `${String(timer.hour).padStart(2, "0")}:${String(timer.minute).padStart(2, "0")}になりました。`,
            });
        }
    };

    // タイマーが実行中の場合にアラームをチェックする
    useEffect(() => {
        if (!isRunning) return;

        const intervalId = setInterval(() => {
            const { hours, minutes, seconds } = getCurrentTime();

            // 全てのタイマーをチェック
            timerSettings.forEach((timer) => {
                // すでに発火したタイマーはスキップ
                if (triggeredTimers.has(timer.id)) return;

                // 時と分が一致し、秒が0のときにアラーム
                if (timer.hour === hours && timer.minute === minutes && seconds === 0) {
                    // サウンド再生を試みる
                    if (audioRef.current) {
                        // サウンドを再生し、エラーをキャッチして詳細にログ出力
                        audioRef.current
                            .play()
                            .then(() => console.log("アラーム音声再生成功"))
                            .catch((err) => {
                                console.error("オーディオ再生エラー:", err);
                                // エラーの詳細情報
                                console.error("オーディオのsrc:", audioRef.current?.src);
                                console.error("オーディオの状態:", audioRef.current?.readyState);
                            });
                    }

                    // タイマー発火のハンドラーを呼び出し
                    handleTimerTriggered(timer);

                    // 発火済みタイマーとして記録
                    setTriggeredTimers((prev) => new Set([...prev, timer.id]));
                }
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isRunning, timerSettings, triggeredTimers]);

    // タイマーの開始/停止を切り替え
    const toggleTimer = () => {
        if (isRunning) {
            // タイマーを停止する場合
            setIsRunning(false);
        } else {
            // タイマーを開始する場合は発火済みリストをリセット
            setTriggeredTimers(new Set());
            setIsRunning(true);
        }
    };

    // 時間のフォーマット（00:00 形式）
    const formatTime = (hour: number, minute: number): string => {
        return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
    };

    return (
        <div className={styles.timerContainer}>
            {/* タイマー一覧 - isRunning が true の場合のみ表示 */}
            {isRunning && (
                <div className={styles.timerList}>
                    {timerSettings.length === 0 ? (
                        <p>設定されたアラームはありません</p>
                    ) : (
                        <ul>
                            {timerSettings.map((timer) => (
                                <li key={timer.id} className="timer-item">
                                    <div className="timer-info">
                                        <span className="timer-time">{formatTime(timer.hour, timer.minute)}</span>
                                        {timer.label && <span className="timer-label"> {timer.label}</span>}
                                        {triggeredTimers.has(timer.id) && (
                                            <span className="timer-triggered"> ✓ 発火済み</span>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* タイマー制御ボタン */}
            <div className="timer-controls">
                <button className={styles.timerButton} onClick={toggleTimer}>
                    {isRunning ? "チャイム停止" : "チャイム起動"}
                </button>
            </div>

            {/* サウンド要素 */}
            <audio ref={audioRef}>
                <source src={soundUrl} type="audio/mpeg" />
                お使いのブラウザはオーディオ要素をサポートしていません。
            </audio>

            {/* ステータス表示 */}
            <p className="timer-status">{isRunning ? "実行中" : "停止中"}</p>
        </div>
    );
}
