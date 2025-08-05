import LoginIllustration from '@/components/features/Auth/Login/LoginIllustration/LoginIllustration'
import styles from './LoginPage.module.scss'
import LoginForm from '@/components/features/Auth/Login/LoginForm/LoginForm'

export default function LoginPage() {
    return (
        <main className={styles.loginContainer}>
            <LoginIllustration />
            <LoginForm />
        </main>
    )
}
