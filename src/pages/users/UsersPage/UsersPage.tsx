import React from 'react'
import styles from './UsersPage.module.scss'

import personIcon from '@assets/images/persons.svg'
import peopleIcon from '@assets/images/people.svg'
import fileIcon from '@assets/images/document.svg'
import moneyIcon from '@assets/images/database.svg'
import Loading from '@/components/ui/Loading/Loading'
import StatsCard from '@/components/features/Users/Users/StatsCard/StatsCard'
import Pagination from '@/components/ui/Pagination/Pagination'
import UsersTable from '@/components/features/Users/Users/UsersTable/UsersTable'
import { useFetchUsers } from '@/hooks/useFetchUsers'
import { useUsersStore } from '@/store/users.store'
import { useUserFilters } from '@/hooks/useUsersFilters'
import { usePagination } from '@/hooks/usePagination'

const UsersPage: React.FC = () => {
    const { isLoading } = useFetchUsers()
    const { stats } = useUsersStore()
    const { setTempFilters, applyFilters, tempFilters, clearFilters, filteredUsers } = useUserFilters()
    const { currentPage, itemsPerPage, setCurrentPage, setItemsPerPage, currentItems } = usePagination(filteredUsers)

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setTempFilters({
            ...tempFilters,
            [e.target.name]: e.target.value,
        })
    }

    if (isLoading) {
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
                <StatsCard
                    icon={personIcon}
                    title="Users"
                    amount={stats.totalUsers}
                />
                <StatsCard
                    icon={peopleIcon}
                    title="Active Users"
                    amount={stats.activeUsers}
                />
                <StatsCard
                    icon={fileIcon}
                    title="Users with loans"
                    amount={stats.usersWithLoans}
                />
                <StatsCard
                    icon={moneyIcon}
                    title="Users with savings"
                    amount={stats.usersWithSavings}
                />
            </div>

            {/* Users Table */}
            <div>
                <UsersTable
                    data={currentItems}
                    filters={tempFilters}
                    onFilterChange={handleFilterChange}
                    onFilterApply={applyFilters}
                    clearFilters={clearFilters}
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