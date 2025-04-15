import React, { useState } from 'react';
import styles from './InputField.module.scss';

type InputFieldProps = {
    label: string;
    type?: 'text' | 'email' | 'password' | "number";
    value: string;
    name?: string
    animatePlaceholder?: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    height?: string
    borderRadius?: string
    border?: string
};

const InputField: React.FC<InputFieldProps> = ({ label, type = 'text', value, onChange, animatePlaceholder, height, borderRadius, border, name }) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
        <div className={styles.inputContainer}>
            <label className={styles.label}>
                <input
                    className={`${styles.input} ${animatePlaceholder && styles.animateInputPlaceholder}`}
                    type={inputType}
                    name={name}
                    placeholder=" "
                    value={value}
                    onChange={onChange}
                    style={{ height, borderRadius, border }}
                />
                <span className={`${styles.placeholder} ${!animatePlaceholder && styles.defaultPlaceholder}`}>{label}</span>
                {isPassword && (
                    <span
                        className={styles.toggle}
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? 'HIDE' : 'SHOW'}
                    </span>
                )}
            </label>
        </div>
    );
};

export default InputField;
