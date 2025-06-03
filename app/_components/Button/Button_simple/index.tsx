"use client";
import React, { useState } from "react";
import styles from "./index.module.css";

interface ButtonProps {
    // 基本機能
    onClick?: () => void;
    autoStart?: boolean;
    onText?: string;
    offText?: string;
    isRunning?: boolean;
    setIsRunning?: (value: boolean) => void;

    // カスタマイズオプション
    variant?: "primary" | "secondary" | "warning" | "info" | "default";
    size?: "small" | "medium" | "large";
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    fullWidth?: boolean;

    // アクセシビリティ
    ariaLabel?: string;

    // その他
    className?: string;
}

export default function Button_simple({
    // 基本機能
    onClick,
    autoStart = false,
    onText = "ON",
    offText = "OFF",
    isRunning: externalIsRunning,
    setIsRunning: externalSetIsRunning,

    // カスタマイズオプション
    variant = "default",
    size = "medium",
    disabled = false,
    type = "button",
    icon = null,
    iconPosition = "left",
    fullWidth = false,

    // アクセシビリティ
    ariaLabel,

    // その他
    className = "",
}: ButtonProps) {
    // 内部状態管理
    const [internalIsRunning, setInternalIsRunning] = useState<boolean>(autoStart);

    // 外部状態か内部状態のどちらかを使用
    const isRunning = externalIsRunning !== undefined ? externalIsRunning : internalIsRunning;

    const handleClick = () => {
        if (disabled) return;

        // 状態の更新
        if (externalSetIsRunning) {
            externalSetIsRunning(!isRunning);
        } else {
            setInternalIsRunning(!internalIsRunning);
        }

        // 追加のクリックハンドラーを実行
        if (onClick) {
            onClick();
        }
    };

    // 適用するクラス名の生成
    const buttonClasses = [
        styles.button,
        styles[`variant-${variant}`],
        styles[`size-${size}`],
        isRunning ? styles.active : "",
        disabled ? styles.disabled : "",
        fullWidth ? styles.fullWidth : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    // アクセシビリティ属性
    const accessibilityProps = {
        "aria-pressed": isRunning,
        "aria-disabled": disabled,
        "aria-label": ariaLabel || (isRunning ? onText : offText),
        role: "switch",
        tabIndex: disabled ? -1 : 0,
    };

    // キーボード操作のサポート
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (disabled) return;
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
        }
    };

    return (
        <button
            className={buttonClasses}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            type={type}
            disabled={disabled}
            {...accessibilityProps}
        >
            {/* アイコンと文字列を配置 */}
            {icon && iconPosition === "left" && <span className={styles.iconLeft}>{icon}</span>}
            <span className={styles.text}>{isRunning ? onText : offText}</span>
            {icon && iconPosition === "right" && <span className={styles.iconRight}>{icon}</span>}
        </button>
    );
}
