import React from 'react';
import styles from './ActionMenu.module.scss';

import eyeIcon from '../../../assets/eye.svg'
import userIcon from '../../../assets/np_user.svg'
import userDeletecon from '../../../assets/np_delete.svg'
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../../context/UsersContext';
import { saveUserDetails } from '../../../services/storage';

interface ActionMenuProps {
    onClose: () => void;
    userId: string
    status: string
}

export const ActionMenu: React.FC<ActionMenuProps> = ({ onClose, userId, status }) => {
    const { users, deactivateUser, activateUser, blacklistUser } = useUsers()
    const navigate = useNavigate()

    const handleViewDetails = () => {
        const user = users.filter((val) => val.id === userId)
        saveUserDetails('selectedUser', user[0])
        navigate(`/users/${userId}`)
        onClose();
    };

    const handleBlacklistUser = () => {
        blacklistUser(userId)
        onClose();
    };

    const handleActivateUser = () => {
        activateUser(userId)
        onClose();
    };

    const handleDeactivateUser = () => {
        deactivateUser(userId)
        onClose();
    };

    return (
        <div
            className={styles.menuContainer}
        >
            <div className={styles.menuItem} onClick={handleViewDetails}>
                <img src={eyeIcon} alt="" />
                View Details
            </div>
            {(status !== 'blacklisted') && <div className={styles.menuItem} onClick={handleBlacklistUser}>
                <img src={userIcon} alt="" />
                Blacklist User
            </div>}
            {status !== 'active' && <div className={styles.menuItem} onClick={handleActivateUser}>
                <img src={userDeletecon} alt="" />
                Activate User
            </div>}
            {status === 'active' && <div className={styles.menuItem} onClick={handleDeactivateUser}>
                <img src={userDeletecon} alt="" />
                Deactivate User
            </div>}
        </div>
    );

};
