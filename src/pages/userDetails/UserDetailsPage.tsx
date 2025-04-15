import { useEffect, useState } from 'react'
import arrowBackIcon from '../../assets/backArrow.png'
import DetailsContent from '../../components/userDetails/detailsContent/DetailsContent'
import DetailsHeader from '../../components/userDetails/detailsHeader/DetailsHeader'
import styles from './UserDetailsPage.module.scss'
import { useNavigate } from 'react-router-dom'
import { User } from '../../utils/types'
import { getUserDetails } from '../../services/storage'
import { useUsers } from '../../context/UsersContext'

export default function UserDetailsPage() {
    const navigate = useNavigate()

    const { blacklistUser, activateUser, deactivateUser } = useUsers()
    const [userDetails, setUserDetails] = useState<User>();

    useEffect(() => {
        const storedUserDetails = getUserDetails('selectedUser');
        if (storedUserDetails) {
            setUserDetails(storedUserDetails);
        } else {
            console.error('No user details found in local storage');
        }
    }, []);

    const handleActivateUser = (userId: string) => {
        activateUser(userId);
        setUserDetails((prev) => prev ? { ...prev, status: 'active' } : prev);
    };

    const handleBlacklistUser = (userId: string) => {
        blacklistUser(userId);
        setUserDetails((prev) => prev ? { ...prev, status: 'blacklisted' } : prev);
    };

    const handleDeactivateUser = (userId: string) => {
        deactivateUser(userId);
        setUserDetails((prev) => prev ? { ...prev, status: 'inactive' } : prev);
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])

    return (
        userDetails && (
            <div className={styles.container}>
                <div className={styles.arrowBack} onClick={() => navigate(-1)}>
                    <img src={arrowBackIcon} alt="" />
                    <span>Back to Users</span>
                </div>
                <div className={styles.headerTextAndButtonContainer}>
                    <h1>User Details</h1>
                    {(userDetails.status === 'inactive' || userDetails.status === 'pending') && <div>
                        <button
                            className={styles.danger}
                            onClick={() => handleBlacklistUser(userDetails.id)}
                        >
                            Blacklist User
                        </button>
                        <button onClick={() => handleActivateUser(userDetails.id)}>
                            Activate User
                        </button>
                    </div>}
                    {userDetails.status === 'active' && <div>
                        <button
                            className={styles.danger}
                            onClick={() => handleBlacklistUser(userDetails.id)}
                        >
                            Blacklist User
                        </button>
                        <button onClick={() => handleDeactivateUser(userDetails.id)}>
                            Deactivate User
                        </button>
                    </div>}
                    {userDetails.status === 'blacklisted' && <div>
                        <button onClick={() => handleActivateUser(userDetails.id)}>
                            Activate User
                        </button>
                    </div>}
                </div>

                <DetailsHeader
                    fullName={userDetails.fullName}
                    bankId={userDetails.bankId}
                    tier={userDetails.tier}
                    balance={userDetails.balance}
                    accountNumber={userDetails.accountNumber}
                    bank={userDetails.bank}
                />
                <DetailsContent userDetails={userDetails} />
            </div>
        )
    )
}