import styles from './LoginForm.module.scss';
import { useNavigate } from "react-router-dom";
import { Button, InputField } from "@/components/ui";
import { useAuthStore } from "@/store/auth.store";
import { ROUTES } from "@/utils";
import { Formik } from "formik";
import * as Yup from 'yup';

const loginInitialValues = {
    email: '',
    password: '',
};

const loginSchema = Yup.object({
    email: Yup.string().email('Please enter a valid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function LoginForm() {
    const { setIsAuthenticated } = useAuthStore()

    const navigate = useNavigate();

    const onSubmitHandler = () => {
        setIsAuthenticated(true)
        navigate(ROUTES.USERS);
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.logo}>
                <img src="/logo.svg" alt="" />
            </div>
            <Formik
                initialValues={loginInitialValues}
                onSubmit={onSubmitHandler}
                validationSchema={loginSchema}
            >
                {({ handleSubmit, values, handleChange, errors }) => (
                    <form className={styles.login} onSubmit={handleSubmit}>
                        <h1>Welcome!</h1>
                        <h2>Enter details to login</h2>

                        <div className={styles.inputWrapper}>
                            <InputField
                                type="email"
                                label="Email"
                                name='email'
                                value={values.email}
                                onChange={handleChange}
                                animatePlaceholder={true}
                                error={errors.email}
                            />
                            <InputField
                                type="password"
                                label="Password"
                                name='password'
                                value={values.password}
                                onChange={handleChange}
                                animatePlaceholder={true}
                                error={errors.password}
                            />
                            <p>Forgot Password?</p>
                        </div>
                        <Button>
                            LOG IN
                        </Button>
                    </form>
                )}
            </Formik>
        </div>
    );
}