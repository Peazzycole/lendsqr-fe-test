import { useState } from "react";
import InputField from "../ui/input/InputField";
import styles from './Login.module.scss'
import Button from "../ui/button/Button";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

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
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputField
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p>Forgot Password?</p>
                </div>
                <Button onClick={() => navigate('/users')}>
                    LOG IN
                </Button>
            </div>
        </div>

    )
}
