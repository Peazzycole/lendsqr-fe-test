import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { fetchAllUsers } from '../services/api';
import { User } from '../utils/types';
import { toast } from 'react-toastify';

interface UsersContextProps {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    isLoading: boolean;
    activateUser: (userId: string) => void;
    blacklistUser: (userId: string) => void;
    deactivateUser: (userId: string) => void;
    stats: {
        totalUsers: number;
        activeUsers: number;
        usersWithLoans: number;
        usersWithSavings: number;
    };
    uniqueOrganizations: Array<{
        label: string
        value: string
    }>
}

const UsersContext = createContext<UsersContextProps | undefined>(undefined);

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUsers = async () => {
            try {
                if (users.length === 0) {
                    const fetchedUsers = await fetchAllUsers();
                    setUsers(fetchedUsers);
                }
            } catch (error) {
                console.error('Failed to fetch users:', error);
            } finally {
                setIsLoading(false);
            }
        };

        getUsers();
    }, [users]);

    const updateUserState = (userId: string, newState: string) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === userId ? { ...user, status: newState } : user
            )
        );
    };

    const activateUser = (userId: string) => {
        updateUserState(userId, 'active');
        toast.success('User activated successfully!');
    };

    const blacklistUser = (userId: string) => {
        updateUserState(userId, 'blacklisted');
        toast.success('User blacklisted successfully!');
    };

    const deactivateUser = (userId: string) => {
        updateUserState(userId, 'inactive');
        toast.success('User deactivated successfully!');
    };

    const stats = useMemo(() => {
        const totalUsers = users.length;
        const activeUsers = users.filter((user) => user.status === 'active').length;
        const usersWithLoans = users.filter((user) => user.loanRepayment > 0).length;
        const usersWithSavings = users.filter((user) => user.savings > 0).length;

        return { totalUsers, activeUsers, usersWithLoans, usersWithSavings };
    }, [users]);

    const uniqueOrganizations = useMemo(() => {
        const organizations = users.map((user) => user.organization);
        const uniqueOrgs = Array.from(new Set(organizations)); // Get unique organizations
        return uniqueOrgs.map((org) => ({ label: org, value: org })); // Format as {label, value}
    }, [users]);

    return (
        <UsersContext.Provider
            value={{
                users,
                setUsers,
                isLoading,
                activateUser,
                blacklistUser,
                deactivateUser,
                stats,
                uniqueOrganizations
            }}
        >
            {children}
        </UsersContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUsers = () => {
    const context = useContext(UsersContext);
    if (!context) {
        throw new Error('useUsers must be used within a UsersProvider');
    }
    return context;
};