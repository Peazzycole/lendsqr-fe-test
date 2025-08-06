import styles from './DetailsHeader.module.scss'

import userIcon from '@assets/images/profile.svg'
import starFilledIcon from '@assets/images/star-filled.svg'
import starIcon from '@assets/images/star.svg'

interface DetailsHeaderProps {
    fullName: string
    bankId: string
    tier: number
    balance: number
    accountNumber: number
    bank: string
}

export default function DetailsHeader({
    fullName,
    bankId,
    tier,
    balance,
    accountNumber,
    bank
}: DetailsHeaderProps) {
    return (
        <div className={styles.container}>
            <div className={styles.topSection}>
                <div className={styles.imageAndNameContainer}>
                    <div className={styles.profileImage}>
                        <img src={userIcon} alt="" />
                    </div>
                    <div className={styles.nameContainer}>
                        <h3>{fullName}</h3>
                        <p>{bankId}</p>
                    </div>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.tierContainer}>
                    <span>User's Tier</span>
                    <div>
                        {[1, 2, 3].map((val, i) => (
                            <img key={i} src={val > tier ? starIcon : starFilledIcon} alt="" />
                        ))}
                    </div>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.amountContainer}>
                    <h3>₦{balance.toLocaleString()}.00</h3>
                    <p>{accountNumber}/{bank}</p>
                </div>
            </div>
            <div className={styles.menuContainer}>
                <div>General Details</div>
                <div>Documents</div>
                <div>Bank Details</div>
                <div>Loans</div>
                <div>Savings</div>
                <div>App and System</div>
            </div>
        </div>
    )
}
