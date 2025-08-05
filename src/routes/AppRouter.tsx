import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";


const AppRouter = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: (<Navigate to='/dashboard' />),
        },
        {
            path: "*",
            element: (<Navigate to='/login' />),
        },
        ...PublicRoutes,
        ...ProtectedRoutes,
    ]);

    return <RouterProvider router={router} />;
};

export default AppRouter;