import AuthLayout from '@/components/layout/AuthLayout/AuthLayout';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import UserDetailsPage from '@/pages/users/UserDetailsPage/UserDetailsPage';
import UsersPage from '@/pages/users/UsersPage/UsersPage';
import { getNestedRoute, ROUTES } from '@/utils';

const ProtectedRoutes = [
    {
        path: "/",
        element: (
            <AuthLayout />
        ),
        children: [
            {
                path: getNestedRoute(ROUTES.DASHBOARD),
                element: <DashboardPage />,
            },
            {
                path: getNestedRoute(ROUTES.USERS),
                element: <UsersPage />
            },
            {
                path: getNestedRoute(ROUTES.USER_DETAILS),
                element: <UserDetailsPage />
            }
        ],
    },
];

export default ProtectedRoutes