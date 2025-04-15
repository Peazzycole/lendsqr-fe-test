import DetailsCard from '../../components/users/DetailsCard'
import styles from './UsersPage.module.scss'

import personIcon from '../../assets/persons.png'
import peopleIcon from '../../assets/people.png'
import fileIcon from '../../assets/file.png'
import moneyIcon from '../../assets/money.png'
import { UsersTable } from '../../components/users/usersTable/UsersTable'
import Pagination from '../../components/pagination/Pagination'
import { useState } from 'react'
import { useUsers } from '../../context/UsersContext'
import Loading from '../../components/loading/Loading'

export default function UsersPage() {
  const { users, stats, isLoading } = useUsers()
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Loading />
      </div>
    )
  }

  return (
    <div className={styles.userContainer}>
      <h1 className={styles.title}>Users</h1>
      <div className={styles.cardContainer}>
        <DetailsCard
          icon={personIcon}
          title='Users'
          amount={stats.totalUsers}
        />
        <DetailsCard
          icon={peopleIcon}
          title='Active Users'
          amount={stats.activeUsers}
        />
        <DetailsCard
          icon={fileIcon}
          title='Users with loans'
          amount={stats.usersWithLoans}
        />
        <DetailsCard
          icon={moneyIcon}
          title='Users with savings'
          amount={stats.usersWithSavings}
        />
      </div>
      <div>
        <UsersTable data={currentUsers} />

        {/* Pagination Component */}
        <Pagination
          totalItems={users.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  )
}
