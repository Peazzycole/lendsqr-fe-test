import React, { useState } from 'react';
import styles from './UsersTable.module.scss';

// Sample icons (you can replace them with your own icons or an icon library)
import { User } from '../../../utils/types';
import filterIcon from '../../../assets/filter.svg'
import menuIcon from '../../../assets/menu.svg'
import { ActionMenu } from '../actionMenu/ActionMenu';
import { formatDate } from '../../../utils/dateformatter';

interface UsersTable {
    data: User[];
}

export const UsersTable: React.FC<UsersTable> = ({ data }) => {
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);
    const [menuPosition, setMenuPosition] = useState<{ top: number, left: number }>({ top: 0, left: 0 })

    const handleToggleFilter = () => {
        setShowFilter(!showFilter);
    };

    const handleToggleActionMenu = (id: string, event: React.MouseEvent<HTMLButtonElement>) => {
        const buttonElement = event.currentTarget;
        const rect = buttonElement.getBoundingClientRect(); // Get the position of the button
        setMenuPosition({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
        });
        if (actionMenuOpen === id) {
            setActionMenuOpen(null);
        } else {
            setActionMenuOpen(id);
        }
    };

    // This function can be used to handle outside clicks if desired.
    // For a fully robust solution, you could use refs or libraries (like react-onclickoutside).
    const closeActionMenu = () => {
        setActionMenuOpen(null);
    };

    return (
        <div className={styles.tableContainer}>
            <div className={styles.headerRow}>
                <div className={styles.headerItem}>
                    Organization
                    {/* Filter icon for Organization column */}
                    <span className={styles.filterIcon} onClick={handleToggleFilter}>
                        <img src={filterIcon} alt="" />
                    </span>
                </div>
                <div className={styles.headerItem}>
                    Username
                    {/* Filter icon for Username column */}
                    <span className={styles.filterIcon} onClick={handleToggleFilter}>
                        <img src={filterIcon} alt="" />
                    </span>
                </div>
                <div className={styles.headerItem}>
                    Email
                    <span className={styles.filterIcon} onClick={handleToggleFilter}>
                        <img src={filterIcon} alt="" />
                    </span>
                </div>
                <div className={styles.headerItem}>
                    Phone Number
                    <span className={styles.filterIcon} onClick={handleToggleFilter}>
                        <img src={filterIcon} alt="" />
                    </span>
                </div>
                <div className={styles.headerItem}>
                    Date Joined
                    <span className={styles.filterIcon} onClick={handleToggleFilter}>
                        <img src={filterIcon} alt="" />
                    </span>
                </div>
                <div className={styles.headerItem}>
                    Status
                    <span className={styles.filterIcon} onClick={handleToggleFilter}>
                        <img src={filterIcon} alt="" />
                    </span>
                </div>
            </div>

            {/* Data Rows */}
            {data.map((user) => (
                <div key={user.id} className={styles.dataRow}>
                    <div className={styles.dataItem}>{user.organization}</div>
                    <div className={styles.dataItem}>{user.username}</div>
                    <div className={styles.dataItem}>{user.email}</div>
                    <div className={styles.dataItem}>{user.phoneNumber}</div>
                    <div className={styles.dataItem}>{formatDate(user.dateJoined)}</div>
                    <div className={styles.dataItem}>
                        <span
                            className={`${styles.statusBadge} ${user.status === 'active'
                                ? styles.active
                                : user.status === 'inactive'
                                    ? styles.inactive
                                    : user.status === 'pending'
                                        ? styles.pending
                                        : styles.blacklisted
                                }`}
                        >
                            {user.status}
                        </span>
                        <div className={styles.dataItem}>
                            <button
                                className={styles.actionButton}
                                onClick={(e) => handleToggleActionMenu(user.id.toString(), e)}
                            >
                                <img src={menuIcon} alt="" />
                            </button>
                            {actionMenuOpen === user.id.toString() && (
                                <ActionMenu
                                    onClose={closeActionMenu}
                                    position={menuPosition}
                                    userId={user.id}
                                />
                            )}
                        </div>
                    </div>

                </div>
            ))}
        </div>
    );
};
