import styles from './LoginIllustration.module.scss'

export default function LoginIllustration() {
    return (
        <div className={styles.illustrationContainer}>
            <div className={styles.illustration}>
                <div>
                    <img src="/logo.svg" alt="" />
                </div>
                <div>
                    <img src="/illustration.svg" alt="" />
                </div>
            </div>
        </div>
    )
}


