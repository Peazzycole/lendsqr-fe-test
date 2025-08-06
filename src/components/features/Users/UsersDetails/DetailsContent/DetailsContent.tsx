import type { UserDto } from '@/types/user.types'
import styles from './DetailsContent.module.scss'

interface DetailsContentProps {
    userDetails: UserDto
}

export default function DetailsContent({ userDetails }: DetailsContentProps) {
    return (
        <div className={styles.container}>
            {/* personal information section */}
            <div className={styles.section}>
                <h3>Personal Information</h3>
                <div className={styles.grid}>
                    <div className={styles.singleInfo}>
                        <span>Full name</span>
                        <h4>{userDetails.fullName}</h4>
                    </div>
                    <div className={styles.singleInfo}>
                        <span>Phone Number</span>
                        <h4>{userDetails.phoneNumber}</h4>
                    </div>
                    <div className={styles.singleInfo}>
                        <span>Email Address</span>
                        <h4>{userDetails.email}</h4>
                    </div>
                    <div className={styles.singleInfo}>
                        <span>Bvn</span>
                        <h4>{userDetails.bvn}</h4>
                    </div>
                    <div className={styles.singleInfo}>
                        <span>Gender</span>
                        <h4>{userDetails.gender}</h4>
                    </div>
                    <div className={styles.singleInfo}>
                        <span>Marital Status</span>
                        <h4>{userDetails.maritalStatus}</h4>
                    </div>
                    <div className={styles.singleInfo}>
                        <span>Children</span>
                        <h4>{userDetails.children ? userDetails.children : "None"}</h4>
                    </div>
                    <div className={styles.singleInfo}>
                        <span>Type Of Residence</span>
                        <h4>{userDetails.residenceType}</h4>
                    </div>
                </div>
            </div>

            {/* divider */}
            <div className={styles.divider}></div>

            {/* Education and Employment */}
            <div className={styles.section}>
                <h3>Education and Employment</h3>
                <div className={styles.grid}>
                    <div className={styles.singleInfo}>
                        <span>level of education</span>
                        <h4>{userDetails.educationLevel}</h4>
                    </div>
                    <div className={styles.singleInfo}>
                        <span>employment status</span>
                        <h4>{userDetails.employmentStatus}</h4>
                    </div>
                    <div className={styles.singleInfo}>
                        <span>sector of employment</span>
                        <h4>{userDetails.sector}</h4>
                    </div>
                    <div className={styles.singleInfo}>
                        <span>Duration of employment</span>
                        <h4>{userDetails.durationEmployment}</h4>
                    </div>
                    <div className={styles.singleInfo}>
                        <span>Office Email</span>
                        <h4>{userDetails.officeEmail}</h4>
                    </div>
                    <div className={styles.singleInfo}>
                        <span>Monthly Income</span>
                        <h4>{userDetails.monthlyIncome}</h4>
                    </div>
                    <div className={styles.singleInfo}>
                        <span>loan repayment</span>
                        <h4>₦{userDetails.loanRepayment.toLocaleString()}</h4>
                    </div>
                </div>
            </div>

            {/* divider */}
            <div className={styles.divider}></div>

            {/* Socials */}
            <div className={styles.section}>
                <h3>Social</h3>
                <div className={styles.grid}>
                    <div className={styles.singleInfo}>
                        <span>Twitter</span>
                        <h4>{userDetails.twitter}</h4>
                    </div>
                    <div className={styles.singleInfo}>
                        <span>Facebook</span>
                        <h4>{userDetails.facebook}</h4>
                    </div>
                    <div className={styles.singleInfo}>
                        <span>Instagram</span>
                        <h4>{userDetails.instagram}</h4>
                    </div>
                </div>
            </div>

            {/* divider */}
            <div className={styles.divider}></div>

            {/* Guarantor */}
            <div className={styles.section}>
                <h3>{userDetails.guarantors.length > 1 ? "Guarantors" : "Guarantor"}</h3>
                {userDetails.guarantors.map((guarantor, i) => (
                    <div className={styles.grid} key={i}>
                        <div className={styles.singleInfo}>
                            <span>Full Name</span>
                            <h4>{guarantor.fullName}</h4>
                        </div>
                        <div className={styles.singleInfo}>
                            <span>Phone Number</span>
                            <h4>{guarantor.phoneNumber}</h4>
                        </div>
                        <div className={styles.singleInfo}>
                            <span>Email Address</span>
                            <h4>{guarantor.email}</h4>
                        </div>
                        <div className={styles.singleInfo}>
                            <span>Relationship</span>
                            <h4>{guarantor.relationship}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
