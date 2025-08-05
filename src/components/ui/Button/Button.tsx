import React from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
    children: React.ReactNode;
    backgroundColor?: string;
    textColor?: string;
    height?: string;
    borderRadius?: string;
    width?: string;
    onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
    children,
    backgroundColor = "#00d8dc",
    textColor = "#fff",
    height = "48px",
    borderRadius = "8px",
    width = "100%",
    onClick,
}) => {
    const styleOverrides = {
        backgroundColor,
        color: textColor,
        height,
        borderRadius,
        width,
    };

    return (
        <button
            className={styles.button}
            style={styleOverrides}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
