import React, { useState } from 'react';
import styles from './InputField.module.scss';

type InputFieldProps = {
    label: string;
    type?: 'text' | 'email' | 'password';
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField: React.FC<InputFieldProps> = ({ label, type = 'text', value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
        <div className={styles.inputContainer}>
            <label className={styles.label}>
                <input
                    className={styles.input}
                    type={inputType}
                    placeholder=" "
                    value={value}
                    onChange={onChange}
                />
                <span className={styles.placeholder}>{label}</span>
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
