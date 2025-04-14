import React from 'react';
import ReactDOM from 'react-dom';
import styles from './ActionMenu.module.scss';

import eyeIcon from '../../../assets/eye.svg'
import userIcon from '../../../assets/np_user.svg'
import userDeletecon from '../../../assets/np_delete.svg'
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../context/UsersContext';
import { saveUserDetails } from '../../../services/storage';

interface ActionMenuProps {
    onClose: () => void;
    position: {
        top: number
        left: number
    }
    userId: number
}



export const ActionMenu: React.FC<ActionMenuProps> = ({ onClose, position, userId }) => {
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

    const menuContent = (
        <div
            className={styles.menuContainer}
            style={{
                position: "absolute",
                top: position.top,
                left: position.left - 100
            }}>
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

    return ReactDOM.createPortal(menuContent, document.getElementById('portal-root')!);
};
