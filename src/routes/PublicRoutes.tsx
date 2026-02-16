import PublicLayout from '@/components/layout/PublicLayout';
import LoginPage from '@/pages/auth/LoginPage/LoginPage';
import { ROUTES } from '@/utils';

const PublicRoutes = [
    {
        path: "/",
        element: (
            <PublicLayout />
        ),
        children: [
            {
                path: ROUTES.LOGIN,
                element: (
                    <LoginPage />
                ),
            },
        ],
    },
];

export default PublicRoutes


