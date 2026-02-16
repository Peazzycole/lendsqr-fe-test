import { useQuery } from "@tanstack/react-query";
import { UsersAPI } from "@/services/api/users.api";
import { useUsersStore } from "@/store/users.store";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const useFetchUsers = () => {
  const { setUsers } = useUsersStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: UsersAPI.fetchAllUsers,
    staleTime: Infinity,
    retry: 2,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch users");
    }
  }, [isError]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data, setUsers]);

  return {
    isLoading,
  };
};


