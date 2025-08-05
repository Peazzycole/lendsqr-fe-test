import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@store/auth.store'

export default function PublicLayout() {
    const { isAuthenticated } = useAuthStore()

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />
    }

    return <Outlet />
}
