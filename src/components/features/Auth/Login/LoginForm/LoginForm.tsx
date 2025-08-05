import { useState } from "react";
import styles from './LoginForm.module.scss';
import { useNavigate } from "react-router-dom";
import { Button, InputField } from "@/components/ui";
import { useAuthStore } from "@/store/auth.store";
import { ROUTES } from "@/utils";

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
    const { setIsAuthenticated } = useAuthStore()

    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;
        const newErrors = { email: '', password: '' };

        // Validate email
        if (!email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleLogin = () => {
        if (validateForm()) {
            setIsAuthenticated(true)
            navigate(ROUTES.DASHBOARD);
        }
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.logo}>
                <img src="/logo.svg" alt="" />
            </div>
            <div className={styles.login}>
                <h1>Welcome!</h1>
                <h2>Enter details to login</h2>

                <div className={styles.inputWrapper}>
                    <InputField
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => {
                            setErrors((prev) => ({ ...prev, email: '' }))
                            setEmail(e.target.value)
                        }}
                        animatePlaceholder={true}
                        error={errors.email}
                    />
                    <InputField
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => {
                            setErrors((prev) => ({ ...prev, password: '' }))
                            setPassword(e.target.value)
                        }}
                        animatePlaceholder={true}
                        error={errors.password}
                    />
                    <p>Forgot Password?</p>
                </div>
                <Button onClick={handleLogin}>
                    LOG IN
                </Button>
            </div>
        </div>
    );
}