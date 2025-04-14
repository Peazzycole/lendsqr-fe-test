import React, { useState } from 'react';
import styles from './UsersTable.module.scss';

// Sample icons (you can replace them with your own icons or an icon library)
import { UserData } from '../../../utils/types';
import filterIcon from '../../../assets/filter.svg'
import menuIcon from '../../../assets/menu.svg'
import { ActionMenu } from '../actionMenu/ActionMenu';

interface UsersTable {
    data: UserData[];
}

export const UsersTable: React.FC<UsersTable> = ({ data }) => {
    // State to show/hide the filter panel
    const [showFilter, setShowFilter] = useState<boolean>(false);

    // State to keep track of which row's action menu is open (store row ID or null)
    const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);
    const [menuPosition, setMenuPosition] = useState<{ top: number, left: number }>({ top: 0, left: 0 })

    // Toggle filter panel
    const handleToggleFilter = () => {
        setShowFilter(!showFilter);
    };

    // Toggle action menu for a specific row
    const handleToggleActionMenu = (id: string, event: React.MouseEvent<HTMLButtonElement>) => {
        const buttonElement = event.currentTarget; // The button that was clicked
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
                    <div className={styles.dataItem}>{user.dateJoined}</div>
                    <div className={styles.dataItem}>
                        <span
                            className={`${styles.statusBadge} ${user.status === 'Active'
                                ? styles.active
                                : user.status === 'Inactive'
                                    ? styles.inactive
                                    : user.status === 'Pending'
                                        ? styles.pending
                                        : styles.blacklisted
                                }`}
                        >
                            {user.status}
                        </span>
                        <div className={styles.dataItem}>
                            <button
                                className={styles.actionButton}
                                onClick={(e) => handleToggleActionMenu(user.id, e)}
                            >
                                <img src={menuIcon} alt="" />
                            </button>
                            {actionMenuOpen === user.id && (
                                <ActionMenu onClose={closeActionMenu} position={menuPosition} />
                            )}
                        </div>
                    </div>

                </div>
            ))}
        </div>
    );
};
