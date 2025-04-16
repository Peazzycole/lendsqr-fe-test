import LoginForm from '../../components/login/LoginForm'
import LoginIllustration from '../../components/login/LoginIllustration'
import styles from './LoginPage.module.scss'

export default function LoginPage() {
    return (
        <main className={styles.loginContainer}>
            <LoginIllustration />
            <LoginForm />
        </main>
    )
}
