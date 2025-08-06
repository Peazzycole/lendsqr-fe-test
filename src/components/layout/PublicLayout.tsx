import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@store/auth.store'
import { ROUTES } from '@/utils'

export default function PublicLayout() {
    const { isAuthenticated } = useAuthStore()

    if (isAuthenticated) {
        return <Navigate to={ROUTES.USERS} replace />
    }

    return <Outlet />
}
