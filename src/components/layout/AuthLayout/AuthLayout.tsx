import { Outlet } from 'react-router-dom'
// import { useAuthStore } from '@store/auth.store'
import { Navbar, Sidebar } from '@/components/common'
import styles from './AuthLayout.module.scss'
// import { ROUTES } from '@/utils'

export default function AuthLayout() {
    // const { isAuthenticated } = useAuthStore()

    // For the sake of testing i will omit this, as refreshing the page will always reset the state
    // if (!isAuthenticated) {
    //     return <Navigate to={ROUTES.LOGIN} replace />
    // }

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


