import DetailsCard from '../../components/users/DetailsCard'
import styles from './UsersPage.module.scss'

import personIcon from '../../assets/persons.png'
import peopleIcon from '../../assets/people.png'
import fileIcon from '../../assets/file.png'
import moneyIcon from '../../assets/money.png'
import { UsersTable } from '../../components/users/usersTable/UsersTable'
import Pagination from '../../components/pagination/Pagination'
import { useMemo, useState } from 'react'
import { useUsers } from '../../context/UsersContext'
import Loading from '../../components/loading/Loading'

export default function UsersPage() {
  const { users, stats, isLoading } = useUsers();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    organization: '',
    username: '',
    email: '',
    date: '',
    phoneNumber: '',
    status: '',
  });
  const [tempFilters, setTempFilters] = useState({ ...filters })

  // const [filteredUsers, setFilteredUsers] = useState<User[]>()

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      return (
        (!filters.organization || user.organization === filters.organization) &&
        (!filters.username || user.username.toLowerCase().includes(filters.username.toLowerCase())) &&
        (!filters.email || user.email.toLowerCase().includes(filters.email.toLowerCase())) &&
        (!filters.date || new Date(user.dateJoined).toLocaleDateString() === new Date(filters.date).toLocaleDateString()) &&
        (!filters.phoneNumber || user.phoneNumber.includes(filters.phoneNumber)) &&
        (!filters.status || user.status === filters.status)
      );
    });
  }, [users, filters]);

  const result = filteredUsers;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = result.slice(indexOfFirstItem, indexOfLastItem);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.userContainer}>
      <h1 className={styles.title}>Users</h1>
      <div className={styles.cardContainer}>
        <DetailsCard icon={personIcon} title="Users" amount={stats.totalUsers} />
        <DetailsCard icon={peopleIcon} title="Active Users" amount={stats.activeUsers} />
        <DetailsCard icon={fileIcon} title="Users with loans" amount={stats.usersWithLoans} />
        <DetailsCard icon={moneyIcon} title="Users with savings" amount={stats.usersWithSavings} />
      </div>
      <div>
        <UsersTable
          data={currentUsers}
          filters={tempFilters}
          onFilterChange={(e) =>
            setTempFilters((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          onFilterApply={() => {
            setCurrentPage(1);
            setFilters(tempFilters)
          }}
        />
        <Pagination
          totalItems={result?.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setItemsPerPage={(val) => setItemsPerPage(val)}
        />
      </div>
    </div>
  );
}
