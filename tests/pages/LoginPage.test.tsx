import { render, screen } from '@testing-library/react';
import LoginPage from '../../src/pages/login/LoginPage';
import '@testing-library/jest-dom';

jest.mock('../../src/components/login/LoginForm', () => () => <div data-testid="login-form">LoginForm</div>);
jest.mock('../../src/components/login/LoginIllustration', () => () => <div data-testid="login-illustration">LoginIllustration</div>);

describe('LoginPage', () => {
    test('renders LoginPage with LoginForm and LoginIllustration', () => {
        render(<LoginPage />);

        expect(screen.getByTestId('login-form')).toBeInTheDocument();

        expect(screen.getByTestId('login-illustration')).toBeInTheDocument();
    });
});