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
}

export const ActionMenu: React.FC<ActionMenuProps> = ({ onClose, userId }) => {
    const { users } = useUsers()
    const navigate = useNavigate()

    const handleViewDetails = () => {
        const user = users.filter((val) => val.id === userId)
        saveUserDetails('selectedUser', user[0])
        navigate(`/users/${userId}`)
        onClose();
    };

    const handleBlacklistUser = () => {
        console.log('Blacklist User');
        onClose();
    };

    const handleActivateUser = () => {
        console.log('Activate User');
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
            <div className={styles.menuItem} onClick={handleBlacklistUser}>
                <img src={userIcon} alt="" />
                Blacklist User
            </div>
            <div className={styles.menuItem} onClick={handleActivateUser}>
                <img src={userDeletecon} alt="" />
                Activate User
            </div>
        </div>
    );

};
