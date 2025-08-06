import { useState, useMemo } from "react";
import { useUsersStore } from "@/store/users.store";

export interface UserFilters {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}

const initialFilters: UserFilters = {
  organization: "",
  username: "",
  email: "",
  date: "",
  phoneNumber: "",
  status: "",
};

export const useUserFilters = () => {
  const { users } = useUsersStore();
  const [filters, setFilters] = useState<UserFilters>(initialFilters);
  const [tempFilters, setTempFilters] = useState<UserFilters>(initialFilters);

  const applyFilters = () => {
    setFilters(tempFilters);
    console.log(tempFilters);
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    setTempFilters(initialFilters);
  };

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

  const uniqueOrganizations = useMemo(() => {
    const organizations = users.map((user) => user.organization);
    const unique = Array.from(new Set(organizations));
    return unique.map((org) => ({ label: org, value: org }));
  }, [users]);

  return {
    filters,
    tempFilters,
    setFilters,
    setTempFilters,
    applyFilters,
    clearFilters,
    filteredUsers,
    uniqueOrganizations,
  };
};
