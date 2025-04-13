import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./assets/scss/main.scss"

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <div>Home Page</div>
    }
  ])

  return <RouterProvider router={router} />
}

export default App
