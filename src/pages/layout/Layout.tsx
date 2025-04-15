import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import styles from './Layout.module.scss'
import { ToastContainer } from "react-toastify";

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
                    <ToastContainer
                        position='top-center'
                        theme='colored' autoClose={2000}
                        toastStyle={{
                            backgroundColor: '#39CDCC',
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
