"use client";

import MultiSoundTimer, { TimerSetting } from "./MultiSoundTimer";
import Styles from "./index.module.css";

// 親コンポーネントでの使用例
export default function TimerPage() {
    // タイマー設定の定義
    const sannomiyaNomal: TimerSetting[] = [
        { id: 1, hour: 10, minute: 0, label: "１限目開始" },
        { id: 2, hour: 10, minute: 50, label: "１限目終わり" },
        { id: 3, hour: 11, minute: 0, label: "２限目開始" },
        { id: 4, hour: 11, minute: 50, label: "２限目終わり" },
        { id: 5, hour: 12, minute: 0, label: "３限目開始" },
        { id: 6, hour: 12, minute: 50, label: "３限目終わり" },
        { id: 7, hour: 13, minute: 50, label: "４限目開始" },
        { id: 8, hour: 14, minute: 40, label: "４限目終わり" },
        { id: 9, hour: 14, minute: 50, label: "５限目開始" },
        { id: 10, hour: 15, minute: 40, label: "５限目終わり" },
        { id: 11, hour: 15, minute: 50, label: "６限目開始" },
        { id: 12, hour: 16, minute: 40, label: "６限目終わり" },
        // 最大20個まで追加可能
    ];

    const sannomiyaSlide: TimerSetting[] = [
        { id: 1, hour: 10, minute: 0, label: "１限目開始" },
        { id: 2, hour: 10, minute: 45, label: "１限目終わり" },
        { id: 3, hour: 10, minute: 55, label: "２限目開始" },
        { id: 4, hour: 11, minute: 45, label: "２限目終わり" },
        { id: 5, hour: 11, minute: 55, label: "３限目開始" },
        { id: 6, hour: 12, minute: 50, label: "３限目終わり" },
        { id: 7, hour: 13, minute: 50, label: "４限目開始" },
        { id: 8, hour: 14, minute: 35, label: "４限目終わり" },
        { id: 9, hour: 14, minute: 45, label: "５限目開始" },
        { id: 10, hour: 15, minute: 35, label: "５限目終わり" },
        { id: 11, hour: 15, minute: 45, label: "６限目開始" },
        { id: 12, hour: 16, minute: 40, label: "６限目終わり" },
        // 最大20個まで追加可能
    ];

    const hiroshima302: TimerSetting[] = [
        { id: 1, hour: 9, minute: 30, label: "１限目開始" },
        { id: 2, hour: 10, minute: 20, label: "１限目終わり" },
        { id: 3, hour: 10, minute: 30, label: "２限目開始" },
        { id: 4, hour: 11, minute: 20, label: "２限目終わり" },
        { id: 5, hour: 11, minute: 30, label: "３限目開始" },
        { id: 6, hour: 12, minute: 20, label: "３限目終わり" },
        { id: 7, hour: 13, minute: 20, label: "４限目開始" },
        { id: 8, hour: 14, minute: 10, label: "４限目終わり" },
        { id: 9, hour: 14, minute: 20, label: "５限目開始" },
        { id: 10, hour: 15, minute: 10, label: "５限目終わり" },
        { id: 11, hour: 15, minute: 20, label: "６限目開始" },
        { id: 12, hour: 16, minute: 10, label: "６限目終わり" },
        // 最大20個まで追加可能
    ];

    return (
        <>
            <h2>チャイム</h2>
            <section className={Styles.chimeContainer}>
                <MultiSoundTimer
                    timerSettings={sannomiyaNomal}
                    soundUrl="https://github.com/Syo-M/studio02base/raw/main/bgm/school_Bell.mp3"
                    autoStart={false}
                />

                <MultiSoundTimer
                    timerSettings={sannomiyaSlide}
                    soundUrl="https://github.com/Syo-M/studio02base/raw/main/bgm/school_Bell.mp3"
                    autoStart={false}
                />

                <MultiSoundTimer
                    timerSettings={hiroshima302}
                    soundUrl="https://github.com/Syo-M/studio02base/raw/main/bgm/school_Bell.mp3"
                    autoStart={false}
                />
            </section>
        </>
    );
}
