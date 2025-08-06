import { useNavigate } from 'react-router-dom'
import arrowBackIcon from '@assets/images/long-back-arrow.svg'
import styles from './UserDetailsPage.module.scss'

import DetailsHeader from '@/components/features/Users/UsersDetails/DetailsHeader/DetailsHeader'
import DetailsContent from '@/components/features/Users/UsersDetails/DetailsContent/DetailsContent'

import { useUserDetails } from '@/hooks/useUserDetails'
import { useEffect } from 'react'

export default function UserDetailsPage() {
    const navigate = useNavigate()
    const {
        userDetails,
        handleActivateUser,
        handleBlacklistUser,
        handleDeactivateUser,
    } = useUserDetails()

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
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

                    {(userDetails.status === 'inactive' || userDetails.status === 'pending') && (
                        <div>
                            <button
                                className={styles.danger}
                                onClick={handleBlacklistUser}
                            >
                                Blacklist User
                            </button>
                            <button onClick={handleActivateUser}>Activate User</button>
                        </div>
                    )}

                    {userDetails.status === 'active' && (
                        <div>
                            <button
                                className={styles.danger}
                                onClick={handleBlacklistUser}
                            >
                                Blacklist User
                            </button>
                            <button onClick={handleDeactivateUser}>Deactivate User</button>
                        </div>
                    )}

                    {userDetails.status === 'blacklisted' && (
                        <div>
                            <button onClick={handleActivateUser}>Activate User</button>
                        </div>
                    )}
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
