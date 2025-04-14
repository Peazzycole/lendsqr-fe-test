import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchAllUsers } from '../../services/api';
import { User } from '../../utils/types';

interface UsersContextProps {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    isLoading: boolean;
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

    return (
        <UsersContext.Provider value={{ users, setUsers, isLoading }}>
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