import { useState, useEffect, useMemo, useCallback } from "react";
import { UsersAPI } from "@services/api/users.api";
import { toast } from "sonner";
import type { UserDto } from "@/types/user.types";

interface UserFilters {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  usersWithLoans: number;
  usersWithSavings: number;
}

interface UseUsersReturn {
  // Data
  users: UserDto[];
  filteredUsers: UserDto[];
  currentUsers: UserDto[];
  stats: UserStats;
  uniqueOrganizations: Array<{ label: string; value: string }>;

  // Loading states
  isLoading: boolean;
  isError: boolean;
  error: string | null;

  // Filters & Pagination
  filters: UserFilters;
  tempFilters: UserFilters;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;

  // Actions
  setFilters: (filters: UserFilters) => void;
  setTempFilters: (filters: UserFilters) => void;
  applyFilters: () => void;
  clearFilters: () => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  activateUser: (userId: string) => void;
  blacklistUser: (userId: string) => void;
  deactivateUser: (userId: string) => void;
  refetchUsers: () => Promise<void>;
}

const initialFilters: UserFilters = {
  organization: "",
  username: "",
  email: "",
  date: "",
  phoneNumber: "",
  status: "",
};

export const useUsers = (): UseUsersReturn => {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter and pagination states
  const [filters, setFilters] = useState<UserFilters>(initialFilters);
  const [tempFilters, setTempFilters] = useState<UserFilters>(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch users
  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      setError(null);

      const fetchedUsers = await UsersAPI.fetchAllUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      setIsError(true);
      setError(err instanceof Error ? err.message : "Failed to fetch users");
      toast.error("Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Filter users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      return (
        (!filters.organization || user.organization === filters.organization) &&
        (!filters.username ||
          user.username
            .toLowerCase()
            .includes(filters.username.toLowerCase())) &&
        (!filters.email ||
          user.email.toLowerCase().includes(filters.email.toLowerCase())) &&
        (!filters.date ||
          new Date(user.dateJoined).toLocaleDateString() ===
            new Date(filters.date).toLocaleDateString()) &&
        (!filters.phoneNumber ||
          user.phoneNumber.includes(filters.phoneNumber)) &&
        (!filters.status || user.status === filters.status)
      );
    });
  }, [users, filters]);

  // Paginated users
  const currentUsers = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredUsers, currentPage, itemsPerPage]);

  // Total pages
  const totalPages = useMemo(() => {
    return Math.ceil(filteredUsers.length / itemsPerPage);
  }, [filteredUsers.length, itemsPerPage]);

  // Stats
  const stats = useMemo((): UserStats => {
    const totalUsers = users.length;
    const activeUsers = users.filter((user) => user.status === "active").length;
    const usersWithLoans = users.filter(
      (user) => user.loanRepayment > 0
    ).length;
    const usersWithSavings = users.filter((user) => user.savings > 0).length;

    return { totalUsers, activeUsers, usersWithLoans, usersWithSavings };
  }, [users]);

  // Unique organizations
  const uniqueOrganizations = useMemo(() => {
    const organizations = users.map((user) => user.organization);
    const uniqueOrgs = Array.from(new Set(organizations));
    return uniqueOrgs.map((org) => ({ label: org, value: org }));
  }, [users]);

  // User actions
  const updateUserState = useCallback((userId: string, newStatus: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
  }, []);

  const activateUser = useCallback(
    (userId: string) => {
      updateUserState(userId, "active");
      toast.success("User activated successfully!");
    },
    [updateUserState]
  );

  const blacklistUser = useCallback(
    (userId: string) => {
      updateUserState(userId, "blacklisted");
      toast.success("User blacklisted successfully!");
    },
    [updateUserState]
  );

  const deactivateUser = useCallback(
    (userId: string) => {
      updateUserState(userId, "inactive");
      toast.success("User deactivated successfully!");
    },
    [updateUserState]
  );

  // Filter actions
  const applyFilters = useCallback(() => {
    setCurrentPage(1);
    setFilters(tempFilters);
  }, [tempFilters]);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
    setTempFilters(initialFilters);
    setCurrentPage(1);
  }, []);

  return {
    // Data
    users,
    filteredUsers,
    currentUsers,
    stats,
    uniqueOrganizations,

    // Loading states
    isLoading,
    isError,
    error,

    // Filters & Pagination
    filters,
    tempFilters,
    currentPage,
    itemsPerPage,
    totalPages,

    // Actions
    setFilters,
    setTempFilters,
    applyFilters,
    clearFilters,
    setCurrentPage,
    setItemsPerPage,
    activateUser,
    blacklistUser,
    deactivateUser,
    refetchUsers: fetchUsers,
  };
};
