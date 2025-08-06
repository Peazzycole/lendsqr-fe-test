import React, { useEffect, useState } from 'react';
import styles from './UsersTable.module.scss';

import filterIcon from '@assets/images/filter-results-button.svg'
import menuIcon from '@assets/images/menu.svg'
// import { ActionMenu } from '../actionMenu/ActionMenu';
import type { FilterValues, UserDto } from '@/types/user.types';
import { formatDate } from '@/utils';
import { ActionMenu } from './components/ActionMenu/ActionMenu';
import FilterPanel from './components/FilterPanel/FilterPanel';

interface UsersTableProps {
    data: UserDto[];
    filters: FilterValues
    onFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onFilterApply: () => void;
    clearFilters: () => void
}

export default function UsersTable({
    data,
    filters,
    onFilterChange,
    onFilterApply,
    clearFilters
}: UsersTableProps) {

    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

    const handleToggleFilter = () => {
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
        if (!target.closest('.dropdown-menu')) {
            setActionMenuOpen(null);
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
                    <div>
                        <FilterPanel
                            values={filters}
                            onChange={onFilterChange}
                            onFilter={onFilterApply}
                            onClose={() => setShowFilter(false)}
                            onReset={clearFilters}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
