import DetailsCard from '../../components/users/DetailsCard'
import styles from './UsersPage.module.scss'

import personIcon from '../../assets/persons.png'
import peopleIcon from '../../assets/people.png'
import fileIcon from '../../assets/file.png'
import moneyIcon from '../../assets/money.png'
import { UsersTable } from '../../components/users/usersTable/UsersTable'
import { UserData } from '../../utils/types'
import Pagination from '../../components/pagination/Pagination'

const MOCK_DATA: UserData[] = [
  {
    id: '1',
    organization: 'Lendsqr',
    username: 'Adedeji',
    email: 'adedeji@lendsqr.com',
    phoneNumber: '08078903721',
    dateJoined: 'May 15, 2020 10:00 AM',
    status: 'Pending',
  },
  {
    id: '2',
    organization: 'Irorun',
    username: 'Debby Ogana',
    email: 'debby@irorun.com',
    phoneNumber: '07068708922',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Inactive',
  },
  {
    id: '3',
    organization: 'Lendsqr',
    username: 'Grace Effiom',
    email: 'grace@lendsqr.com',
    phoneNumber: '07068708922',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Blacklisted',
  },
  {
    id: '4',
    organization: 'Lendsqr',
    username: 'Tosin Dokunmu',
    email: 'tosin@lendsqr.com',
    phoneNumber: '07068708922',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Active',
  },
  {
    id: '5',
    organization: 'Lendsqr',
    username: 'Tosin Dokunmu',
    email: 'tosin@lendsqr.com',
    phoneNumber: '07068708922',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Active',
  },
  {
    id: '6',
    organization: 'Lendsqr',
    username: 'Tosin Dokunmu',
    email: 'tosin@lendsqr.com',
    phoneNumber: '07068708922',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Active',
  },
  {
    id: '7',
    organization: 'Lendsqr',
    username: 'Tosin Dokunmu',
    email: 'tosin@lendsqr.com',
    phoneNumber: '07068708922',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Active',
  },
  {
    id: '8',
    organization: 'Lendsqr',
    username: 'Tosin Dokunmu',
    email: 'tosin@lendsqr.com',
    phoneNumber: '07068708922',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Active',
  },
  {
    id: '9',
    organization: 'Lendsqr',
    username: 'Tosin Dokunmu',
    email: 'tosin@lendsqr.com',
    phoneNumber: '07068708922',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Active',
  },
  // ... more data
];

export default function UsersPage() {
  return (
    <div className={styles.userContainer}>
      <h1 className={styles.title}>Users</h1>
      <div className={styles.cardContainer}>
        <DetailsCard
          icon={personIcon}
          title='Users'
          amount={2453}
        />
        <DetailsCard
          icon={peopleIcon}
          title='Active Users'
          amount={2453}
        />
        <DetailsCard
          icon={fileIcon}
          title='Users with loans'
          amount={12453}
        />
        <DetailsCard
          icon={moneyIcon}
          title='Users with savings'
          amount={102453}
        />
      </div>
      <div>
        <UsersTable data={MOCK_DATA} />
        <Pagination totalItems={500} itemsPerPage={10} />
      </div>
    </div>
  )
}
