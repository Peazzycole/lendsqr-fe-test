/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { ActionMenu } from './ActionMenu';
import { useUsersStore } from '@/store/users.store';
import { saveUserDetails } from '@/services/storage/localStorage.service';

// Mock dependencies
jest.mock('@/store/users.store');
jest.mock('@/services/storage/localStorage.service');
jest.mock('@/utils', () => ({
  ROUTES: {
    GO_TO_USER_DETAILS: (id: string) => `/user/${id}`
  }
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

// Mock CSS module
jest.mock('./ActionMenu.module.scss', () => ({
  menuContainer: 'mock-menu-container',
  menuItem: 'mock-menu-item'
}));

// Mock image imports
jest.mock('@assets/images/eye.svg', () => 'eye-icon.svg');
jest.mock('@assets/images/blacklist.svg', () => 'blacklist-icon.svg');
jest.mock('@assets/images/activate.svg', () => 'activate-icon.svg');

const mockedUseUsersStore = useUsersStore as jest.MockedFunction<typeof useUsersStore>;
const mockedSaveUserDetails = saveUserDetails as jest.MockedFunction<typeof saveUserDetails>;

describe('ActionMenu', () => {
  const mockUsers = [
    { id: 'user-123', fullName: 'John Doe', status: 'active' },
    { id: 'user-456', fullName: 'Jane Smith', status: 'inactive' }
  ] as any;

  const mockActions = {
    users: mockUsers,
    deactivateUser: jest.fn(),
    activateUser: jest.fn(),
    blacklistUser: jest.fn()
  };

  const defaultProps = {
    onClose: jest.fn(),
    userId: 'user-123',
    status: 'active'
  };

  beforeEach(() => {
    mockedUseUsersStore.mockReturnValue(mockActions as any);
    jest.clearAllMocks();
  });

  // Positive scenarios
  it('renders view details option', () => {
    render(
      <BrowserRouter>
        <ActionMenu {...defaultProps} />
      </BrowserRouter>
    );

    expect(screen.getByText('View Details')).toBeInTheDocument();
  });

  it('handles view details action', () => {
    render(
      <BrowserRouter>
        <ActionMenu {...defaultProps} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('View Details'));

    expect(mockedSaveUserDetails).toHaveBeenCalledWith('selectedUser', mockUsers[0]);
    expect(mockNavigate).toHaveBeenCalledWith('/user/user-123');
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('shows blacklist option for non-blacklisted users', () => {
    render(
      <BrowserRouter>
        <ActionMenu {...defaultProps} status="active" />
      </BrowserRouter>
    );

    expect(screen.getByText('Blacklist User')).toBeInTheDocument();
  });

  it('handles blacklist user action', () => {
    render(
      <BrowserRouter>
        <ActionMenu {...defaultProps} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Blacklist User'));

    expect(mockActions.blacklistUser).toHaveBeenCalledWith('user-123');
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('shows activate option for non-active users', () => {
    render(
      <BrowserRouter>
        <ActionMenu {...defaultProps} status="inactive" />
      </BrowserRouter>
    );

    expect(screen.getByText('Activate User')).toBeInTheDocument();
  });

  it('handles activate user action', () => {
    render(
      <BrowserRouter>
        <ActionMenu {...defaultProps} status="inactive" />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Activate User'));

    expect(mockActions.activateUser).toHaveBeenCalledWith('user-123');
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('shows deactivate option for active users', () => {
    render(
      <BrowserRouter>
        <ActionMenu {...defaultProps} status="active" />
      </BrowserRouter>
    );

    expect(screen.getByText('Deactivate User')).toBeInTheDocument();
  });

  it('handles deactivate user action', () => {
    render(
      <BrowserRouter>
        <ActionMenu {...defaultProps} status="active" />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Deactivate User'));

    expect(mockActions.deactivateUser).toHaveBeenCalledWith('user-123');
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  // Conditional rendering scenarios
  it('hides blacklist option for blacklisted users', () => {
    render(
      <BrowserRouter>
        <ActionMenu {...defaultProps} status="blacklisted" />
      </BrowserRouter>
    );

    expect(screen.queryByText('Blacklist User')).not.toBeInTheDocument();
  });

  it('hides activate option for active users', () => {
    render(
      <BrowserRouter>
        <ActionMenu {...defaultProps} status="active" />
      </BrowserRouter>
    );

    expect(screen.queryByText('Activate User')).not.toBeInTheDocument();
  });

  it('hides deactivate option for inactive users', () => {
    render(
      <BrowserRouter>
        <ActionMenu {...defaultProps} status="inactive" />
      </BrowserRouter>
    );

    expect(screen.queryByText('Deactivate User')).not.toBeInTheDocument();
  });

  // Edge cases
  it('handles non-existent user gracefully', () => {
    render(
      <BrowserRouter>
        <ActionMenu {...defaultProps} userId="non-existent" />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('View Details'));

    expect(mockedSaveUserDetails).toHaveBeenCalledWith('selectedUser', undefined);
    expect(mockNavigate).toHaveBeenCalledWith('/user/non-existent');
  });
});