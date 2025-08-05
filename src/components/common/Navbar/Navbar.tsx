import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.scss';


import bellIcon from '../../../assets/images/notification.svg';
import avatar from '../../../assets/images/avatar.svg';
import arrowDown from '../../../assets/images/down-button.svg';
import searchIcon from '../../../assets/images/search.svg';
import Sidebar from '../Sidebar/Sidebar';
import { Menu } from 'lucide-react';

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [placeholder, setPlaceholder] = useState('Search for anything');

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setPlaceholder('Search');
            } else {
                setPlaceholder('Search for anything');
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <nav className={styles.navbar}>
            <div className={styles.logoAndSearchContainer}>
                <div className={styles.logo}>
                    <img src='/logo.svg' alt="LendSQR Logo" />
                </div>
                <div className={styles.hamburger} onClick={toggleMenu}>
                    <Menu />
                </div>

                <div className={styles.inputContainer}>
                    <input type="text" placeholder={placeholder} />
                    <button>
                        <img src={searchIcon} alt="" />
                    </button>
                </div>
            </div>

            {/* Right Section */}
            <div className={styles.navRight}>
                <a href="#" className={styles.navLink}>
                    Docs
                </a>
                <img className={styles.bellIcon} src={bellIcon} alt="Notifications" />
                <div className={styles.userProfile}>
                    <div className={styles.avatar}>
                        <img src={avatar} alt="" />
                    </div>
                    <span className={styles.userName}>Adeji</span>
                    <img className={styles.dropdownArrow} src={arrowDown} alt="" />
                </div>
            </div>

            {/* Overlay */}
            {menuOpen && (
                <div
                    className={`${styles.overlay} ${menuOpen ? styles.open : ''}`}
                    onClick={toggleMenu}
                ></div>
            )}

            {/* Mobile Menu */}
            <div
                className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}
            >
                <Sidebar
                    height={"100vh"}
                    boxShadow='none'
                    toggleMenu={toggleMenu}
                />
            </div>
        </nav>
    );
};

export default Navbar;