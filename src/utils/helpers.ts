import type { UserDto } from "@/types/user.types";

export const getNestedRoute = (route: string): string => route.slice(1);

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
}

export const calculateStats = (users: UserDto[]) => ({
  totalUsers: users.length,
  activeUsers: users.filter((u) => u.status === "active").length,
  usersWithLoans: users.filter((u) => u.loanRepayment > 0).length,
  usersWithSavings: users.filter((u) => u.savings > 0).length,
});
