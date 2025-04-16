import React from 'react';
import { render, screen } from '@testing-library/react';
import UsersPage from '../../src/pages/users/UsersPage';
import { useUsers } from '../../src/context/UsersContext';
import '@testing-library/jest-dom';
import { usersMockData } from '../usersMockData';

// Mock dependencies
jest.mock('../../src/context/UsersContext', () => ({
    useUsers: jest.fn(),
}));

jest.mock('../../src/components/users/DetailsCard', () => jest.fn(({ title, amount }) => (
    <div data-testid="details-card">{title}: {amount}</div>
)));

jest.mock('../../src/components/users/usersTable/UsersTable.tsx', () => () => <div data-testid="users-table" />);
jest.mock('../../src/components/pagination/Pagination', () => () => <div data-testid="pagination" />);

jest.mock('../../src/components/loading/Loading', () => () => <div data-testid="loading" />);

const mockedUseUsers = useUsers as jest.Mock;

// Define mock users
const mockUsers = usersMockData

describe('UsersPage', () => {
    beforeEach(() => {
        mockedUseUsers.mockReturnValue({
            users: mockUsers,
            stats: { totalUsers: 15, activeUsers: 8, usersWithLoans: 5, usersWithSavings: 10 },
            isLoading: false,
        });
        jest.clearAllMocks();
    });

    test('renders the title "Users"', () => {
        render(<UsersPage />);
        expect(screen.getByRole('heading', { name: /users/i })).toBeInTheDocument();
    });

    test('renders four DetailsCard components with correct data', () => {
        render(<UsersPage />);
        const cards = screen.getAllByTestId('details-card');
        expect(cards).toHaveLength(4);
        expect(cards[0]).toHaveTextContent('Users: 15');
        expect(cards[1]).toHaveTextContent('Active Users: 8');
        expect(cards[2]).toHaveTextContent('Users with loans: 5');
        expect(cards[3]).toHaveTextContent('Users with savings: 10');
    });

    test('displays Loading component when isLoading is true', () => {
        mockedUseUsers.mockReturnValue({
            users: [],
            stats: {},
            isLoading: true,
        });
        render(<UsersPage />);
        expect(screen.getByTestId('loading')).toBeInTheDocument();
    });

    test('renders the users table', () => {
        mockedUseUsers.mockReturnValue({
            users: mockUsers,
            stats: { totalUsers: 15, activeUsers: 8, usersWithLoans: 5, usersWithSavings: 10 },
            isLoading: false,
        });
        render(<UsersPage />);
        expect(screen.getByTestId('users-table')).toBeInTheDocument();
    });

    test('renders the pagination component', () => {
        mockedUseUsers.mockReturnValue({
            users: mockUsers,
            stats: { totalUsers: 15, activeUsers: 8, usersWithLoans: 5, usersWithSavings: 10 },
            isLoading: false,
        });
        render(<UsersPage />);
        expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });
});