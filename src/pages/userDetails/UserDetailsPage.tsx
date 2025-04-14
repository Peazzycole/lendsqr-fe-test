import { useEffect, useState } from 'react'
import arrowBackIcon from '../../assets/backArrow.png'
import DetailsContent from '../../components/userDetails/detailsContent/DetailsContent'
import DetailsHeader from '../../components/userDetails/detailsHeader/DetailsHeader'
import styles from './UserDetailsPage.module.scss'
import { useNavigate } from 'react-router-dom'
import { User } from '../../utils/types'
import { getUserDetails } from '../../services/storage'

export default function UserDetailsPage() {
    const navigate = useNavigate()

    const [userDetails, setUserDetails] = useState<User>();

    useEffect(() => {
        const storedUserDetails = getUserDetails('selectedUser');
        if (storedUserDetails) {
            setUserDetails(storedUserDetails);
            console.log(storedUserDetails)
        } else {
            console.error('No user details found in local storage');
        }
    }, []);

    return (
        userDetails && (<div className={styles.container}>
            <div className={styles.arrowBack} onClick={() => navigate(-1)}>
                <img src={arrowBackIcon} alt="" />
                <span>Back to Users</span>
            </div>
            <div className={styles.headerTextAndButtonContainer}>
                <h1>User Details</h1>
                <div>
                    <button className={styles.danger}>Blacklist User</button>
                    <button>Activate User</button>
                </div>
            </div>
            <DetailsHeader
                fullName={userDetails.fullName}
                bankId={userDetails.bank}
                tier={userDetails.tier}
                balance={userDetails.balance}
                accountNumber={userDetails.accountNumber}
                bank={userDetails.bank}
            />
            <DetailsContent userDetails={userDetails} />
        </div>)
    )
}
