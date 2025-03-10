"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import SimpleClock from "../SimpleClock";
import styles from "./index.module.css";

// タイマー設定の型定義を拡張して音源情報を追加
export interface TimerSetting {
    id: string | number; // 一意のID
    hour: number; // 時 (0-23)
    minute: number; // 分 (0-59)
    label?: string; // オプションのラベル
    soundUrl?: string; // 個別のサウンドURL（オプション）
}

// コンポーネントのProps型定義
interface MultiSoundTimerProps {
    timerSettings: TimerSetting[]; // 時間設定の配列
    defaultSoundUrl?: string; // デフォルトサウンドURL（個別設定がない場合に使用）
    autoStart?: boolean; // 自動開始するかどうか（デフォルトfalse）
}

export default function MultiSoundTimer({
    timerSettings = [],
    defaultSoundUrl = "https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3", // デフォルトサウンド
    autoStart = false,
}: MultiSoundTimerProps): React.ReactElement {
    // 状態管理
    const [isRunning, setIsRunning] = useState<boolean>(autoStart);
    const [triggeredTimers, setTriggeredTimers] = useState<Set<string | number>>(new Set());

    // 複数の音源を管理するためのオブジェクト
    const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

    // 現在時刻を取得する関数（内部計算用）
    const getCurrentTime = (): { hours: number; minutes: number; seconds: number } => {
        const now = new Date();
        return {
            hours: now.getHours(),
            minutes: now.getMinutes(),
            seconds: now.getSeconds(),
        };
    };

    // 音源再生関数 - useCallbackでメモ化
    const playSound = useCallback((soundUrl: string, timerId: string | number) => {
        const audioKey = `audio-${timerId}`;

        // すでに存在する場合は使い回し、なければ新規作成
        if (!audioRefs.current[audioKey]) {
            audioRefs.current[audioKey] = new Audio(soundUrl);
        } else if (audioRefs.current[audioKey].src !== soundUrl) {
            // 音源URLが変わっている場合は更新
            audioRefs.current[audioKey].src = soundUrl;
        }

        // 音源再生
        audioRefs.current[audioKey]
            .play()
            .then(() => console.log(`アラーム音声再生成功 (ID: ${timerId})`))
            .catch((err) => {
                console.error(`オーディオ再生エラー (ID: ${timerId}):`, err);
                console.error("オーディオのsrc:", audioRefs.current[audioKey]?.src);
                console.error("オーディオの状態:", audioRefs.current[audioKey]?.readyState);
            });
    }, []);

    // タイマー発火時のハンドラー - useCallbackでメモ化
    const handleTimerTriggered = useCallback(
        (timer: TimerSetting) => {
            console.log(`${timer.label || "アラーム"}の時間です！`);

            // 使用する音源URLの決定（個別設定 or デフォルト）
            const soundToPlay = timer.soundUrl || defaultSoundUrl;

            // 対応する音源を再生
            playSound(soundToPlay, timer.id);

            // 通知APIが利用可能であれば通知も表示
            if ("Notification" in window && Notification.permission === "granted") {
                new Notification(`${timer.label || "アラーム"}の時間です！`, {
                    body: `${String(timer.hour).padStart(2, "0")}:${String(timer.minute).padStart(
                        2,
                        "0"
                    )}になりました。`,
                });
            }
        },
        [defaultSoundUrl, playSound]
    );

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
                    // タイマー発火のハンドラーを呼び出し
                    handleTimerTriggered(timer);

                    // 発火済みタイマーとして記録
                    setTriggeredTimers((prev) => new Set([...prev, timer.id]));
                }
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isRunning, timerSettings, triggeredTimers, handleTimerTriggered]);

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
                        <>
                            <SimpleClock />
                            <ul>
                                {timerSettings.map((timer) => (
                                    <li key={timer.id} className="timer-item">
                                        <div className="timer-info">
                                            <span className="timer-time">{formatTime(timer.hour, timer.minute)}</span>
                                            {timer.label && <span className="timer-label"> {timer.label}</span>}
                                            {timer.soundUrl && <span className="timer-custom-sound"> 👋</span>}
                                            {triggeredTimers.has(timer.id) && (
                                                <span className="timer-triggered"> ✓</span>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            )}

            {/* タイマー制御ボタン */}
            <div className={styles.timerControls}>
                <button className={styles.timerButton} onClick={toggleTimer}>
                    {isRunning ? "チャイム停止" : "チャイム起動"}
                </button>
            </div>

            {/* ステータス表示 必要なら*/}
            {/* <p className="timer-status">{isRunning ? "実行中" : "停止中"}</p> */}
        </div>
    );
}
