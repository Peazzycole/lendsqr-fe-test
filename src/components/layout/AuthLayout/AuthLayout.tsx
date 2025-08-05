import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@store/auth.store'
import { Navbar, Sidebar } from '@/components/common'
import styles from './AuthLayout.module.scss'

export default function AuthLayout() {
    const { isAuthenticated } = useAuthStore()

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return (
        <div>
            <Navbar />
            <div className={styles.sidebarAndOutletLayout}>
                <div className={styles.sidebar}>
                    <Sidebar />
                </div>
                <div className={styles.outlet}>
                    <Outlet />

                </div>
            </div>
        </div>
    )
}
