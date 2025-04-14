import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import styles from './Layout.module.scss'

export default function Layout() {
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
