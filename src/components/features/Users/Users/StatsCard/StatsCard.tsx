import styles from './StatsCard.module.scss'

interface StatsCardProps {
    icon: string
    title: string
    amount: number
}

export default function StatsCard({
    icon,
    title,
    amount
}: StatsCardProps) {
    return (
        <div className={styles.statsCard}>
            <div>
                <img src={icon} alt="" />
            </div>
            <h4>{title}</h4>
            <span>{amount.toLocaleString()}</span>
        </div>
    )
}
