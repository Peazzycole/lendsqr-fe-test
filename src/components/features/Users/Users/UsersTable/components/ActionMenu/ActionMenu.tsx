import React from 'react';
import styles from './ActionMenu.module.scss';

import eyeIcon from '@assets/images/eye.svg'
import userIcon from '@assets/images/blacklist.svg'
import userDeletecon from '@assets/images/activate.svg'
import { useNavigate } from 'react-router-dom';
import { saveUserDetails } from '@/services/storage/localStorage.service';
import { useUsersStore } from '@/store/users.store';
import { toast } from 'sonner';

interface ActionMenuProps {
    onClose: () => void;
    userId: string
    status: string
}

export const ActionMenu: React.FC<ActionMenuProps> = ({ onClose, userId, status }) => {
    const { users, deactivateUser, activateUser, blacklistUser } = useUsersStore()
    const navigate = useNavigate()

    const handleViewDetails = () => {
        const user = users.filter((val) => val.id === userId)
        saveUserDetails('selectedUser', user[0])
        navigate(`/users/${userId}`)
        onClose();
    };

    const handleBlacklistUser = () => {
        blacklistUser(userId)
        toast.success("Successful blacklisted user")
        onClose();
    };

    const handleActivateUser = () => {
        activateUser(userId)
        toast.success("Successful activated user")
        onClose();
    };

    const handleDeactivateUser = () => {
        deactivateUser(userId)
        toast.success("Successful deactivated user")

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
