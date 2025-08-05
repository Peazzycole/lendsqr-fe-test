export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  USERS: "/users",
  USER_DETAILS: (id: string | number) => `/users/${id}`,
  USER_DETAILS_ROUTE: "/users/:userId",
} as const;
