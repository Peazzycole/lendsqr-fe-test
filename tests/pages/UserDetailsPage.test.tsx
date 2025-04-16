import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import UserDetailsPage from '../../src/pages/userDetails/UserDetailsPage';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../src/context/UsersContext';
import { getUserDetails } from '../../src/services/storage';

jest.mock('../../src/components/userDetails/detailsHeader/DetailsHeader.tsx', () => () => <div data-testid="details-header" />);
jest.mock('../../src/components/userDetails/detailsContent/DetailsContent.tsx', () => () => <div data-testid="details-content" />);

import '@testing-library/jest-dom';
import { usersMockData } from '../usersMockData';

// Mock dependencies
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));
jest.mock('../../src/context/UsersContext', () => ({
    useUsers: jest.fn(),
}));
jest.mock('../../src/services/storage', () => ({
    getUserDetails: jest.fn(),
}));

const mockedUseNavigate = useNavigate as jest.Mock;
const mockedUseUsers = useUsers as jest.Mock;
const mockedGetUserDetails = getUserDetails as jest.Mock;

describe('UserDetailsPage', () => {
    const mockNavigate = jest.fn();
    const mockBlacklistUser = jest.fn();
    const mockActivateUser = jest.fn();
    const mockDeactivateUser = jest.fn();

    beforeAll(() => {
        window.scrollTo = jest.fn();
    });

    beforeEach(() => {
        mockedUseNavigate.mockReturnValue(mockNavigate);
        mockedUseUsers.mockReturnValue({
            blacklistUser: mockBlacklistUser,
            activateUser: mockActivateUser,
            deactivateUser: mockDeactivateUser,
        });
        jest.clearAllMocks();
    });

    test('navigates back when Back to Users is clicked', () => {
        const mockUser = usersMockData[0];
        mockedGetUserDetails.mockReturnValue(mockUser);

        render(<UserDetailsPage />);

        const backButton = screen.getByText('Back to Users');
        fireEvent.click(backButton);

        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    test('renders user Details title', () => {
        const mockUser = usersMockData[0]
        mockedGetUserDetails.mockReturnValue(mockUser);

        render(<UserDetailsPage />);

        expect(screen.getByText('User Details')).toBeInTheDocument();
    });

    test('Changes user status when the button is clicked', () => {
        const mockUser = usersMockData[0];
        mockedGetUserDetails.mockReturnValue(mockUser);

        render(<UserDetailsPage />);

        const deactivateButton = screen.queryByText('DEACTIVATE USER');
        const activateButton = screen.queryByText('ACTIVATE USER');
        const blacklistButton = screen.queryByText('BLACKLIST USER');

        if (deactivateButton) {
            fireEvent.click(deactivateButton);
            expect(mockDeactivateUser).toHaveBeenCalledWith('1');
        }

        if (activateButton) {
            fireEvent.click(activateButton);
            expect(mockActivateUser).toHaveBeenCalledWith('1');
        }

        if (blacklistButton) {
            fireEvent.click(blacklistButton);
            expect(mockBlacklistUser).toHaveBeenCalledWith('1');
        }

    });

    test('renders detailsHeader and detailsContent', () => {
        const mockUser = usersMockData[0]
        mockedGetUserDetails.mockReturnValue(mockUser);

        render(<UserDetailsPage />);

        expect(screen.getByTestId('details-header')).toBeInTheDocument();
        expect(screen.getByTestId('details-content')).toBeInTheDocument();

    });
});