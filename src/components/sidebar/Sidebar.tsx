import React from 'react';
import styles from './Sidebar.module.scss';

import briefcase from '../../assets/briefcase.png';
import arrowDown from '../../assets/arrowDown.svg';
import dashboard from '../../assets/dashboard.png';
import { sidebarMenus } from '../../utils/constants';

import logoutIcon from '../../assets/logout.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

type SidebarProps = {
    height?: string
    boxShadow?: string
    toggleMenu?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ height, boxShadow, toggleMenu }) => {

    return (
        <aside className={styles.sidebar} style={{ height, boxShadow }}>
            <div className={styles.mobileNavLogoContainer}>
                <img src="/logo.svg" alt="" />
                <div onClick={toggleMenu}>
                    <FontAwesomeIcon
                        size='xl'
                        icon={faTimes}
                    />
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
                    {sidebarMenus.map((menu, i) => (
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
            <div className={styles.logout}>
                <img src={logoutIcon} alt="" />
                <span>Logout</span>
            </div>
        </aside>
    );
};

export default Sidebar;