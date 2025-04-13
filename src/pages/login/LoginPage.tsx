import LoginForm from '../../components/login/LoginForm'
import LoginIllustration from '../../components/login/LoginIllustration'
import './LoginPage.scss'

export default function LoginPage() {
    return (
        <div className='login-container'>
            <LoginIllustration />
            <LoginForm />
        </div>
    )
}
