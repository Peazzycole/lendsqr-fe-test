import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./assets/scss/main.scss"
import LoginPage from "./pages/login/LoginPage"

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginPage />
    }
  ])

  return <RouterProvider router={router} />
}

export default App
