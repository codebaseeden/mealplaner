import styles from './MealCard.module.css'

type MealCardProps = {
  title: string
  mealType: 'breakfast' | 'lunch' | 'dinner'
  duration: number
}

function MealCard({
  title,
  mealType,
  duration,
}: MealCardProps) {
    return (
        <article className={styles.card}>
            <span className={styles.mealType}>{mealType}</span>

            <h3 className={styles.title}>{title}</h3>

            <p className={styles.duration}>{duration} min</p>
        </article>
    )
}

export default MealCard