import React from 'react';
import { render, screen } from '@testing-library/react';
import UsersTable from '../../src/components/users/usersTable/UsersTable';
import '@testing-library/jest-dom';
import { usersMockData } from '../usersMockData'

const mockUsers = usersMockData

const mockFilters = {
    organization: '',
    username: '',
    email: '',
    date: '',
    phoneNumber: '',
    status: '',
};

// Mock callback functions
const mockOnFilterChange = jest.fn();
const mockOnFilterApply = jest.fn();

describe('UsersTable', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders table headers', () => {
        render(
            <UsersTable
                data={mockUsers}
                filters={mockFilters}
                onFilterChange={mockOnFilterChange}
                onFilterApply={mockOnFilterApply}
            />
        );

        expect(screen.getByText('Organization')).toBeInTheDocument();
        expect(screen.getByText('Username')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Phone Number')).toBeInTheDocument();
        expect(screen.getByText('Date Joined')).toBeInTheDocument();
        expect(screen.getByText('Status')).toBeInTheDocument();
    });

    test('renders user data rows', () => {
        render(
            <UsersTable
                data={mockUsers}
                filters={mockFilters}
                onFilterChange={mockOnFilterChange}
                onFilterApply={mockOnFilterApply}
            />
        );

        // Check first user
        expect(screen.getByText(mockUsers[0].organization)).toBeInTheDocument();
        expect(screen.getByText(mockUsers[0].username)).toBeInTheDocument();
        expect(screen.getByText(mockUsers[0].email)).toBeInTheDocument();

        // Check second user
        expect(screen.getByText(mockUsers[1].organization)).toBeInTheDocument();
        expect(screen.getByText(mockUsers[1].username)).toBeInTheDocument();
        expect(screen.getByText(mockUsers[1].email)).toBeInTheDocument();
    });
});