import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import bellIcon from '../../assets/notification.png';
import avatar from '../../assets/avatar.png';
import arrowDown from '../../assets/dropdown.svg';
import searchIcon from '../../assets/search.svg';

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [placeholder, setPlaceholder] = useState('Search for anything');

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setPlaceholder('Search'); // Mobile screen
            } else {
                setPlaceholder('Search for anything'); // Desktop screen
            }
        };

        // Set the initial placeholder based on screen size
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <nav className={styles.navbar}>
            <div className={styles.logoAndSearchContainer}>
                <div className={styles.logo}>
                    <img src='./logo.svg' alt="LendSQR Logo" />
                </div>
                <div className={styles.hamburger} onClick={toggleMenu}>
                    <FontAwesomeIcon
                        width={24}
                        height={24}
                        icon={menuOpen ? faTimes : faBars}
                    />
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
        </nav>
    );
};

export default Navbar;