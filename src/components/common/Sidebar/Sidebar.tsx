import React from 'react';
import styles from './Sidebar.module.scss';

import briefcase from '../../../assets/images/briefcase.svg';
import arrowDown from '../../../assets/images/down-button.svg';
import dashboard from '../../../assets/images/home.svg';
import logoutIcon from '../../../assets/images/sign-out.svg'

import { ROUTES, SIDEBAR_MENUS } from '@/utils';
import { X } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { useNavigate } from 'react-router-dom';

type SidebarProps = {
    height?: string
    boxShadow?: string
    toggleMenu?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ height, boxShadow, toggleMenu }) => {
    const { setIsAuthenticated } = useAuthStore()
    const navigate = useNavigate()

    const logoutHandler = () => {
        setIsAuthenticated(false)
        navigate(ROUTES.LOGIN)
    }


    return (
        <aside className={styles.sidebar} style={{ height, boxShadow }}>
            <div className={styles.mobileNavLogoContainer}>
                <img src="/logo.svg" alt="" />
                <div onClick={toggleMenu}>
                    <X />
                </div>
            </div>
            <div className={styles.sidebarContent}>
                {/* Top Section */}
                <div className={styles.switchOrg}>
                    <img src={briefcase} alt="" />
                    <span>Switch Organization</span>
                    <img src={arrowDown} alt="" />
                </div>

                {/* Dashboard */}
                <div className={styles.dashboard}>
                    <img src={dashboard} alt="" />
                    <span>Dashboard</span>
                </div>

                <div className={styles.listContainer}>
                    {SIDEBAR_MENUS.map((menu, i) => (
                        <div className={styles.section} key={i}>
                            <h3>{menu.name}</h3>

                            <ul>
                                {menu.subCategories.map((category, i) => (
                                    <li key={i} className={category.name === "Users" ? styles.selected : ""}>
                                        <img src={category.icon} alt="" />
                                        <span>{category.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            {/* Customers */}
            <div className={styles.logout} onClick={logoutHandler}>
                <img src={logoutIcon} alt="" />
                <span>Logout</span>
            </div>
        </aside>
    );
};

export default Sidebar;