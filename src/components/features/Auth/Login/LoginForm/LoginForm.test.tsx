/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import { useAuthStore } from '@/store/auth.store';
import { ROUTES } from '@/utils';

// Mock dependencies
jest.mock('@/store/auth.store');
jest.mock('@/utils', () => ({
    ROUTES: {
        USERS: '/users'
    }
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

jest.mock('@/components/ui', () => ({
    Button: ({ children, ...props }: any) => (
        <button {...props}>{children}</button>
    ),
    InputField: ({ label, error, ...props }: any) => (
        <div>
            <input {...props} placeholder={label} />
            {error && <span data-testid="error">{error}</span>}
        </div>
    )
}));

// Mock CSS module
jest.mock('./LoginForm.module.scss', () => ({
    formContainer: 'mock-form-container',
    logo: 'mock-logo',
    login: 'mock-login',
    inputWrapper: 'mock-input-wrapper'
}));

const mockedUseAuthStore = useAuthStore as jest.MockedFunction<typeof useAuthStore>;

describe('LoginForm', () => {
    const mockSetIsAuthenticated = jest.fn();

    const renderLoginForm = () => {
        return render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );
    };

    beforeEach(() => {
        mockedUseAuthStore.mockReturnValue({
            setIsAuthenticated: mockSetIsAuthenticated,
            isAuthenticated: false
        } as any);

        jest.clearAllMocks();
    });

    // Positive scenarios
    it('renders login form elements', () => {
        renderLoginForm();

        expect(screen.getByText('Welcome!')).toBeInTheDocument();
        expect(screen.getByText('Enter details to login')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByText('LOG IN')).toBeInTheDocument();
        expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
    });

    it('submits form with valid data', async () => {
        renderLoginForm();

        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByText('LOG IN');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockSetIsAuthenticated).toHaveBeenCalledWith(true);
            expect(mockNavigate).toHaveBeenCalledWith(ROUTES.USERS);
        });
    });

    // Validation scenarios
    it('shows email validation error', async () => {
        renderLoginForm();

        const emailInput = screen.getByPlaceholderText('Email');
        const submitButton = screen.getByText('LOG IN');

        fireEvent.change(emailInput, { target: { value: '' } });
        fireEvent.blur(emailInput);
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Email is required')).toBeInTheDocument();
        });
    });

    it('shows password validation error', async () => {
        renderLoginForm();

        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByText('LOG IN');

        fireEvent.change(passwordInput, { target: { value: '123' } });
        fireEvent.blur(passwordInput);
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
        });
    });

    it('shows required field errors', async () => {
        renderLoginForm();

        const submitButton = screen.getByText('LOG IN');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Email is required')).toBeInTheDocument();
            expect(screen.getByText('Password is required')).toBeInTheDocument();
        });
    });

    // Negative scenarios
    it('does not submit form with validation errors', async () => {
        renderLoginForm();

        const emailInput = screen.getByPlaceholderText('Email');
        const submitButton = screen.getByText('LOG IN');

        fireEvent.change(emailInput, { target: { value: 'invalid' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockSetIsAuthenticated).not.toHaveBeenCalled();
            expect(mockNavigate).not.toHaveBeenCalled();
        });
    });
});


