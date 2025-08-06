import { useQuery } from "@tanstack/react-query";
import { UsersAPI } from "@/services/api/users.api";
// import { toast } from "sonner";
import { useUsersStore } from "@/store/users.store";
import { useEffect } from "react";
import { toast } from "sonner";

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
    console.log(data);
    if (data) {
      setUsers(data);
    }
  }, [data, setUsers]);

  return {
    isLoading,
  };
};
