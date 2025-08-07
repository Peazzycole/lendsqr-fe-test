/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterPanel from './FilterPanel';
import { useUserFilters } from '@/hooks/useUsersFilters';
import type { FilterValues } from '@/types/user.types';

// Mock dependencies
jest.mock('@/hooks/useUsersFilters');
jest.mock('@/utils', () => ({
    USERS_STATUS: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Pending', value: 'pending' },
        { label: 'Blacklisted', value: 'blacklisted' }
    ]
}));

jest.mock('@/components/ui', () => ({
    InputField: ({ label, name, value, onChange, ...props }: any) => (
        <input
            {...props}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={label}
        />
    ),
    SelectInput: ({ placeholder, value, onChange, options }: any) => (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
            <option value="">{placeholder}</option>
            {options.map((option: any) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}));

// Mock CSS module
jest.mock('./FilterPanel.module.scss', () => ({
    container: 'mock-container',
    buttons: 'mock-buttons',
    reset: 'mock-reset',
    filter: 'mock-filter'
}));

const mockedUseUserFilters = useUserFilters as jest.MockedFunction<typeof useUserFilters>;

describe('FilterPanel', () => {
    const mockOrganizations = [
        { label: 'TechCorp', value: 'techcorp' },
        { label: 'StartupInc', value: 'startupinc' }
    ];

    const defaultValues: FilterValues = {
        organization: '',
        username: '',
        email: '',
        date: '',
        phoneNumber: '',
        status: ''
    };

    const defaultProps = {
        values: defaultValues,
        onChange: jest.fn(),
        onFilter: jest.fn(),
        onClose: jest.fn(),
        onReset: jest.fn()
    };

    beforeEach(() => {
        mockedUseUserFilters.mockReturnValue({
            uniqueOrganizations: mockOrganizations
        } as any);

        jest.clearAllMocks();
    });

    // Positive scenarios
    it('renders all filter fields', () => {
        render(<FilterPanel {...defaultProps} />);

        expect(screen.getByText('Organization')).toBeInTheDocument();
        expect(screen.getByText('Username')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Date')).toBeInTheDocument();
        expect(screen.getByText('Phone Number')).toBeInTheDocument();
        expect(screen.getByText('Status')).toBeInTheDocument();
        expect(screen.getByText('Reset')).toBeInTheDocument();
        expect(screen.getByText('Filter')).toBeInTheDocument();
    });

    it('displays current filter values', () => {
        const values = {
            ...defaultValues,
            username: 'john_doe',
            email: 'john@example.com',
            phoneNumber: '1234567890'
        };

        render(<FilterPanel {...defaultProps} values={values} />);

        expect(screen.getByDisplayValue('john_doe')).toBeInTheDocument();
        expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
        expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();
    });

    it('handles filter button click', () => {
        render(<FilterPanel {...defaultProps} />);

        fireEvent.click(screen.getByText('Filter'));

        expect(defaultProps.onFilter).toHaveBeenCalled();
        expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it('handles reset button click', () => {
        render(<FilterPanel {...defaultProps} />);

        fireEvent.click(screen.getByText('Reset'));

        expect(defaultProps.onReset).toHaveBeenCalled();
        expect(defaultProps.onClose).toHaveBeenCalled();
    });

    // Integration scenarios
    it('renders organization options from hook', () => {
        render(<FilterPanel {...defaultProps} />);

        const organizationSelect = screen.getAllByDisplayValue('Select')[0];
        fireEvent.click(organizationSelect);

        expect(screen.getByText('TechCorp')).toBeInTheDocument();
        expect(screen.getByText('StartupInc')).toBeInTheDocument();
    });

    it('renders status options from constants', () => {
        render(<FilterPanel {...defaultProps} />);

        const statusSelect = screen.getAllByDisplayValue('Select')[1];
        fireEvent.click(statusSelect);

        expect(screen.getByText('Active')).toBeInTheDocument();
        expect(screen.getByText('Inactive')).toBeInTheDocument();
        expect(screen.getByText('Pending')).toBeInTheDocument();
        expect(screen.getByText('Blacklisted')).toBeInTheDocument();
    });

    // Edge cases
    it('handles empty organizations list', () => {
        mockedUseUserFilters.mockReturnValue({
            uniqueOrganizations: []
        } as any);

        render(<FilterPanel {...defaultProps} />);

        expect(screen.getByText('Organization')).toBeInTheDocument();
        // Should still render without crashing
    });
});