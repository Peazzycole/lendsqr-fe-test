import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import { ROUTES } from "@/utils";


const AppRouter = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: (<Navigate to={ROUTES.LOGIN} />), // Because I want to start from the loginPage on initial render
        },
        {
            path: "*",
            element: (<Navigate to={ROUTES.LOGIN} />),
        },
        ...PublicRoutes,
        ...ProtectedRoutes,
    ]);

    return <RouterProvider router={router} />;
};

export default AppRouter;