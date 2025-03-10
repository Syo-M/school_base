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
        {
            id: 13,
            hour: 17,
            minute: 35,
            label: "自習終了5分前",
            soundUrl: "https://github.com/Syo-M/studio02base/raw/main/bgm/hotaru_piano_10.mp3",
        },
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
        {
            id: 13,
            hour: 17,
            minute: 35,
            label: "自習終了5分前",
            soundUrl: "https://github.com/Syo-M/studio02base/raw/main/bgm/hotaru_piano_10.mp3",
        },
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
        {
            id: 13,
            hour: 17,
            minute: 5,
            label: "自習終了5分前",
            soundUrl: "https://github.com/Syo-M/studio02base/raw/main/bgm/hotaru_piano_10.mp3",
        },
        // 最大20個まで追加可能
    ];

    return (
        <section className={Styles.sec01}>
            <h2 className={Styles.pageTitle}>チャイム</h2>

            <div className={Styles.chimeContainer}>
                <h3>リカレントスクール三宮校</h3>

                <div className={Styles.chimeInner}>
                    <div className={Styles.chimeBox}>
                        <h4>標準時</h4>
                        <MultiSoundTimer
                            timerSettings={sannomiyaNomal}
                            defaultSoundUrl="https://github.com/Syo-M/studio02base/raw/main/bgm/school_Bell.mp3"
                            autoStart={false}
                        />
                    </div>

                    <div className={Styles.chimeBox}>
                        <h4>スライド時</h4>
                        <MultiSoundTimer
                            timerSettings={sannomiyaSlide}
                            defaultSoundUrl="https://github.com/Syo-M/studio02base/raw/main/bgm/school_Bell.mp3"
                            autoStart={false}
                        />
                    </div>
                </div>
            </div>

            <div className={Styles.chimeContainer}>
                <h3>リカレントスクール広島校</h3>

                <div className={Styles.chimeInner}>
                    <div className={Styles.chimeBox}>
                        <h4>広島302教室</h4>
                        <MultiSoundTimer
                            timerSettings={hiroshima302}
                            defaultSoundUrl="https://github.com/Syo-M/studio02base/raw/main/bgm/school_Bell.mp3"
                            autoStart={false}
                        />
                    </div>
                </div>
            </div>

            {/* <MultiSoundTimer
                    timerSettings={[
                        { id: 1, hour: 9, minute: 0, label: "朝のミーティング", soundUrl: "/sounds/chime1.mp3" },
                        { id: 2, hour: 12, minute: 0, label: "昼休み", soundUrl: "/sounds/chime2.mp3" },
                        { id: 3, hour: 17, minute: 30, label: "終業時間" }, // デフォルト音源を使用
                    ]}
                    defaultSoundUrl="/sounds/default-alarm.mp3"
                    autoStart={true}
                /> */}
        </section>
    );
}
