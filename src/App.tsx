import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import "./assets/scss/main.scss"
import LoginPage from "./pages/login/LoginPage"
import UsersPage from "./pages/users/UsersPage"
import Layout from "./pages/layout/Layout"

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/login" replace />
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/users',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <UsersPage />
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
