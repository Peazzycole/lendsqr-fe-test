import React, { useEffect, useState } from 'react';
import styles from './UsersTable.module.scss';

// Sample icons (you can replace them with your own icons or an icon library)
import { User } from '../../../utils/types';
import filterIcon from '../../../assets/filter.svg'
import menuIcon from '../../../assets/menu.svg'
import { ActionMenu } from '../actionMenu/ActionMenu';
import { formatDate } from '../../../utils/dateformatter';
import FilterPanel from '../../filterPanel/FilterPanel';

interface FilterValues {
    organization: string;
    username: string;
    email: string;
    date: string;
    phoneNumber: string;
    status: string;
}

interface UsersTable {
    data: User[];
    filters: FilterValues
    onFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onFilterApply: () => void;
}

export const UsersTable: React.FC<UsersTable> = ({
    data,
    filters,
    onFilterChange,
    onFilterApply
}) => {
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

    const handleToggleFilter = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation()
        setShowFilter(!showFilter);
    };

    const handleToggleActionMenu = (id: string) => {
        if (actionMenuOpen === id) {
            setActionMenuOpen(null);
        } else {
            setActionMenuOpen(id);
        }
    };

    const closeActionMenu = () => {
        setActionMenuOpen(null);
    };

    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.filter-menu')) {
            setActionMenuOpen(null);
            setShowFilter(false)
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.container}>
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
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleToggleActionMenu(user.id.toString())
                                    }}
                                >
                                    <img src={menuIcon} alt="" />
                                </button>
                                {actionMenuOpen === user.id.toString() && (
                                    <ActionMenu
                                        onClose={closeActionMenu}
                                        userId={user.id}
                                        status={user.status}
                                    />
                                )}
                            </div>
                        </div>

                    </div>
                ))}
                {showFilter && (
                    <div className='filter-menu'>

                        <FilterPanel
                            values={filters}
                            onChange={onFilterChange}
                            onFilter={onFilterApply}
                            onClose={() => setShowFilter(false)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
