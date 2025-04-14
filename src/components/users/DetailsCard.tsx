import styles from './Users.module.scss'

type DetailsCardProps = {
    icon: string
    title: string
    amount: number
}

export default function DetailsCard({
    icon,
    title,
    amount
}: DetailsCardProps) {
    return (
        <div className={styles.detailsCard}>
            <div>
                <img src={icon} alt="" />
            </div>
            <h4>{title}</h4>
            <span>{amount.toLocaleString()}</span>
        </div>
    )
}
