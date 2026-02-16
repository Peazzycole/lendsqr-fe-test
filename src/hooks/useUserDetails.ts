import { useEffect, useState } from "react";
import { useUsersStore } from "@/store/users.store";
import {
  getUserDetails,
  saveUserDetails,
} from "@/services/storage/localStorage.service";
import type { UserDto } from "@/types/user.types";

export const useUserDetails = () => {
  const { activateUser, blacklistUser, deactivateUser } = useUsersStore();
  const [userDetails, setUserDetails] = useState<UserDto | null>(null);

  useEffect(() => {
    const storedUser = getUserDetails("selectedUser");
    if (storedUser) {
      setUserDetails(storedUser);
    } else {
      console.error("No user details found in local storage");
    }
  }, []);

  const updateUserState = (updatedUser: UserDto) => {
    setUserDetails(updatedUser);
    saveUserDetails("selectedUser", updatedUser);
  };

  const handleActivateUser = () => {
    if (!userDetails) return;
    activateUser(userDetails.id);
    updateUserState({ ...userDetails, status: "active" });
  };

  const handleDeactivateUser = () => {
    if (!userDetails) return;
    deactivateUser(userDetails.id);
    updateUserState({ ...userDetails, status: "inactive" });
  };

  const handleBlacklistUser = () => {
    if (!userDetails) return;
    blacklistUser(userDetails.id);
    updateUserState({ ...userDetails, status: "blacklisted" });
  };

  return {
    userDetails,
    handleActivateUser,
    handleDeactivateUser,
    handleBlacklistUser,
  };
};


