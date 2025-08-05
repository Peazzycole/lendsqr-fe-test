import React, { useState } from 'react';
import styles from './SelectInput.module.scss';
import { ChevronDown, ChevronUp } from 'lucide-react';

type Option = { label: string; value: string };

interface SelectInputProps {
    placeholder: string;
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    direction?: "top" | "bottom"
}

const SelectInput: React.FC<SelectInputProps> = ({
    placeholder,
    options,
    value,
    onChange,
    direction
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (val: string) => {
        onChange(val);
        setIsOpen(false);
    };

    return (
        <div className={styles.selectWrapper}>
            <div className={styles.selectBox} onClick={() => setIsOpen(!isOpen)}>
                <span>{value || placeholder}</span>
                {isOpen ? <ChevronUp /> : <ChevronDown />}
            </div>
            {isOpen && (
                <ul className={`${styles.options} ${direction === 'top' && styles.top}`} >
                    {options.map((option) => (
                        <li key={option.value} onClick={() => handleSelect(option.value)}>
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SelectInput;
