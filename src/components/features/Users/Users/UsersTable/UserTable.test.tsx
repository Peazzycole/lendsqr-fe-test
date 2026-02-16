/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UsersTable from './UsersTable';
import { formatDate } from '@/utils';
import type { FilterValues, UserDto } from '@/types/user.types';

// Mock dependencies
jest.mock('@/utils', () => ({
    formatDate: jest.fn((date) => new Date(date).toLocaleDateString())
}));

// Mock child components
jest.mock('./components/ActionMenu/ActionMenu', () => ({
    ActionMenu: ({ onClose, userId, status }: any) => (
        <div data-testid="action-menu">
            Action Menu for {userId} - {status}
            <button onClick={onClose}>Close</button>
        </div>
    )
}));

jest.mock('./components/FilterPanel/FilterPanel', () =>
    ({ onFilter, onClose, onReset }: any) => (
        <div data-testid="filter-panel">
            Filter Panel
            <button onClick={onFilter}>Apply Filter</button>
            <button onClick={onReset}>Reset</button>
            <button onClick={onClose}>Close</button>
        </div>
    )
);

// Mock CSS module
jest.mock('./UsersTable.module.scss', () => ({
    container: 'mock-container',
    tableContainer: 'mock-table-container',
    headerRow: 'mock-header-row',
    headerItem: 'mock-header-item',
    filterIcon: 'mock-filter-icon',
    dataRow: 'mock-data-row',
    dataItem: 'mock-data-item',
    statusBadge: 'mock-status-badge',
    active: 'mock-active',
    inactive: 'mock-inactive',
    pending: 'mock-pending',
    blacklisted: 'mock-blacklisted',
    actionButton: 'mock-action-button'
}));

// Mock image imports
jest.mock('@assets/images/filter-results-button.svg', () => 'filter-icon.svg');
jest.mock('@assets/images/menu.svg', () => 'menu-icon.svg');

describe('UsersTable', () => {
    const mockUsers: UserDto[] = [
        {
            id: 'user-1',
            organization: 'TechCorp',
            username: 'john_doe',
            email: 'john@techcorp.com',
            phoneNumber: '+1234567890',
            dateJoined: '2023-01-15T00:00:00Z',
            status: 'active'
        },
        {
            id: 'user-2',
            organization: 'StartupInc',
            username: 'jane_smith',
            email: 'jane@startup.com',
            phoneNumber: '+0987654321',
            dateJoined: '2023-02-20T00:00:00Z',
            status: 'inactive'
        }
    ] as UserDto[];

    const mockFilters: FilterValues = {
        organization: '',
        username: '',
        email: '',
        date: '',
        phoneNumber: '',
        status: ''
    };

    const defaultProps = {
        data: mockUsers,
        filters: mockFilters,
        onFilterChange: jest.fn(),
        onFilterApply: jest.fn(),
        clearFilters: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Positive scenarios
    it('renders table headers correctly', () => {
        render(<UsersTable {...defaultProps} />);

        expect(screen.getByText('Organization')).toBeInTheDocument();
        expect(screen.getByText('Username')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Phone Number')).toBeInTheDocument();
        expect(screen.getByText('Date Joined')).toBeInTheDocument();
        expect(screen.getByText('Status')).toBeInTheDocument();
    });

    it('renders user data correctly', () => {
        render(<UsersTable {...defaultProps} />);

        expect(screen.getByText('TechCorp')).toBeInTheDocument();
        expect(screen.getByText('john_doe')).toBeInTheDocument();
        expect(screen.getByText('john@techcorp.com')).toBeInTheDocument();
        expect(screen.getByText('+1234567890')).toBeInTheDocument();
        expect(screen.getByText('active')).toBeInTheDocument();

        expect(screen.getByText('StartupInc')).toBeInTheDocument();
        expect(screen.getByText('jane_smith')).toBeInTheDocument();
        expect(screen.getByText('inactive')).toBeInTheDocument();
    });

    it('formats dates correctly', () => {
        render(<UsersTable {...defaultProps} />);

        expect(formatDate).toHaveBeenCalledWith('2023-01-15T00:00:00Z');
        expect(formatDate).toHaveBeenCalledWith('2023-02-20T00:00:00Z');
    });

    it('toggles filter panel on filter icon click', () => {
        render(<UsersTable {...defaultProps} />);

        // Initially filter panel should not be visible
        expect(screen.queryByTestId('filter-panel')).not.toBeInTheDocument();

        // Click filter icon
        const filterIcons = screen.getAllByAltText('');
        fireEvent.click(filterIcons[0]); // First filter icon

        // Filter panel should be visible
        expect(screen.getByTestId('filter-panel')).toBeInTheDocument();
    });

    it('closes filter panel when onClose is called', () => {
        render(<UsersTable {...defaultProps} />);

        // Open filter panel
        const filterIcons = screen.getAllByAltText('');
        fireEvent.click(filterIcons[0]);
        expect(screen.getByTestId('filter-panel')).toBeInTheDocument();

        // Close filter panel
        fireEvent.click(screen.getByText('Close'));
        expect(screen.queryByTestId('filter-panel')).not.toBeInTheDocument();
    });

    it('toggles action menu on menu button click', () => {
        render(<UsersTable {...defaultProps} />);

        // Initially no action menu
        expect(screen.queryByTestId('action-menu')).not.toBeInTheDocument();

        // Click first menu button
        const menuButtons = screen.getAllByRole('button');
        const firstMenuButton = menuButtons.find(btn => btn.querySelector('img'));
        fireEvent.click(firstMenuButton!);

        // Action menu should appear
        expect(screen.getByTestId('action-menu')).toBeInTheDocument();
        expect(screen.getByText('Action Menu for user-1 - active')).toBeInTheDocument();
    });

    it('closes action menu when clicking close', () => {
        render(<UsersTable {...defaultProps} />);

        // Open action menu
        const menuButtons = screen.getAllByRole('button');
        const firstMenuButton = menuButtons.find(btn => btn.querySelector('img'));
        fireEvent.click(firstMenuButton!);

        // Close action menu
        fireEvent.click(screen.getByText('Close'));
        expect(screen.queryByTestId('action-menu')).not.toBeInTheDocument();
    });

    it('shows only one action menu at a time', () => {
        render(<UsersTable {...defaultProps} />);

        const menuButtons = screen.getAllByRole('button').filter(btn => btn.querySelector('img'));

        // Open first action menu
        fireEvent.click(menuButtons[0]);
        expect(screen.getByText('Action Menu for user-1 - active')).toBeInTheDocument();

        // Open second action menu
        fireEvent.click(menuButtons[1]);
        expect(screen.queryByText('Action Menu for user-1 - active')).not.toBeInTheDocument();
        expect(screen.getByText('Action Menu for user-2 - inactive')).toBeInTheDocument();
    });

    it('applies correct status badge classes', () => {
        render(<UsersTable {...defaultProps} />);

        const activeStatus = screen.getByText('active');
        const inactiveStatus = screen.getByText('inactive');

        expect(activeStatus).toHaveClass('mock-status-badge', 'mock-active');
        expect(inactiveStatus).toHaveClass('mock-status-badge', 'mock-inactive');
    });

    // Event handling scenarios
    it('passes correct props to FilterPanel', () => {
        render(<UsersTable {...defaultProps} />);

        // Open filter panel
        const filterIcons = screen.getAllByAltText('');
        fireEvent.click(filterIcons[0]);

        // Test filter panel interactions
        fireEvent.click(screen.getByText('Apply Filter'));
        expect(defaultProps.onFilterApply).toHaveBeenCalled();

        fireEvent.click(screen.getByText('Reset'));
        expect(defaultProps.clearFilters).toHaveBeenCalled();
    });

    // Edge cases
    it('handles empty data array', () => {
        render(<UsersTable {...defaultProps} data={[]} />);

        expect(screen.getByText('Organization')).toBeInTheDocument();
        expect(screen.queryByText('TechCorp')).not.toBeInTheDocument();
    });
});


