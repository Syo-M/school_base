// Next.jsに対してこのコンポーネントがクライアントサイドで実行されることを指示
"use client";
import React, { useState, useEffect } from "react";

// 時計を表示するReactコンポーネントを定義
// React.ReactElementは、このコンポーネントがReact要素を返すことを示す型アノテーション
export default function SimpleClock(): React.ReactElement {
    // useState Hookを使用して時刻の状態を管理
    // - time: 現在の時刻を保持する状態変数（Date型）
    // - setTime: 時刻の状態を更新するための関数
    // - new Date(): 初期値として現在の日時を設定
    const [time, setTime] = useState<Date>(new Date());

    // useEffect Hookを使用してコンポーネントのマウント時に一度だけ実行される処理を定義
    useEffect(() => {
        // 1秒（1000ミリ秒）ごとに時刻を更新するタイマーをセット
        // NodeJS.Timeoutは、setIntervalの戻り値の型を示すTypeScript型
        const timer: NodeJS.Timeout = setInterval(() => {
            // 現在時刻で状態を更新
            setTime(new Date());
        }, 1000);

        // コンポーネントがアンマウントされるときに実行されるクリーンアップ関数
        // タイマーを停止してメモリリークを防止
        return () => clearInterval(timer);
    }, []); // 空の依存配列により、マウント時のみ実行される

    // 数値を2桁の文字列フォーマットに変換するヘルパー関数
    // 10未満の数値には先頭に0を付加
    const formatTime = (num: number): string => {
        return num < 10 ? `0${num}` : String(num);
    };

    // Date オブジェクトから時間、分、秒を取得し、2桁フォーマットに変換
    const hours: string = formatTime(time.getHours());
    const minutes: string = formatTime(time.getMinutes());
    const seconds: string = formatTime(time.getSeconds());

    // コンポーネントのレンダリング結果を返す
    return (
        <>
            {/* フラグメント: 余分なDOMノードを作らずに複数要素をグループ化 */}
            <p>
                {/* HTML5のtimeタグで時刻を表す */}
                {/* dateTime属性: マシンリーダブルな形式（標準フォーマット） */}
                {/* 表示テキスト: 人間が読みやすい日本語形式 */}
                <time dateTime={`${hours}:${minutes}:${seconds}`}>
                    {hours}時{minutes}分{seconds}秒
                </time>
            </p>
        </>
    );
}
