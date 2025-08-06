import React from 'react'
import { useUsers } from '@hooks/useUsers'
import styles from './UsersPage.module.scss'

import personIcon from '@assets/images/persons.svg'
import peopleIcon from '@assets/images/people.svg'
import fileIcon from '@assets/images/document.svg'
import moneyIcon from '@assets/images/database.svg'
import Loading from '@/components/ui/Loading/Loading'
import DetailsCard from '@/components/features/Users/Users/DetailsCard/DetailsCard'
import Pagination from '@/components/ui/Pagination/Pagination'
import UsersTable from '@/components/features/Users/Users/UsersTable/UsersTable'

const UsersPage: React.FC = () => {
    const {
        // Data
        currentUsers,
        stats,

        // Loading states
        isLoading,
        isError,

        // Filters & Pagination
        tempFilters,
        currentPage,
        itemsPerPage,
        filteredUsers,

        // Actions
        setTempFilters,
        applyFilters,
        setCurrentPage,
        setItemsPerPage,
    } = useUsers()

    // Handle filter change
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setTempFilters({
            ...tempFilters,
            [e.target.name]: e.target.value,
        })
    }

    // Loading state
    if (isLoading || isError) {
        return (
            <div className={styles.loadingContainer}>
                <Loading />
            </div>
        )
    }

    return (
        <div className={styles.userContainer}>
            <h1 role="heading" className={styles.title}>
                Users
            </h1>

            {/* Stats Cards */}
            <div className={styles.cardContainer}>
                <DetailsCard
                    icon={personIcon}
                    title="Users"
                    amount={stats.totalUsers}
                />
                <DetailsCard
                    icon={peopleIcon}
                    title="Active Users"
                    amount={stats.activeUsers}
                />
                <DetailsCard
                    icon={fileIcon}
                    title="Users with loans"
                    amount={stats.usersWithLoans}
                />
                <DetailsCard
                    icon={moneyIcon}
                    title="Users with savings"
                    amount={stats.usersWithSavings}
                />
            </div>

            {/* Users Table */}
            <div>
                <UsersTable
                    data={currentUsers}
                    filters={tempFilters}
                    onFilterChange={handleFilterChange}
                    onFilterApply={applyFilters}
                />

                {/* Pagination */}
                <Pagination
                    totalItems={filteredUsers.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setItemsPerPage={setItemsPerPage}
                />
            </div>
        </div>
    )
}

export default UsersPage