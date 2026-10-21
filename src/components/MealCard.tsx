import type { MealType } from '../types/meal'
import styles from './MealCard.module.css'
import { X } from 'lucide-react'

type MealCardProps = {
  title: string
  mealType?: MealType
  duration: number
  onRemove: () => void
}

function MealCard({
  title,
  mealType,
  duration,
  onRemove,
}: MealCardProps) {
  return (
    <article className={styles.card}>
      {mealType && (
        <span className={styles.mealType}>{mealType}</span>
      )}

      <h3 className={styles.title}>{title}</h3>

      <p className={styles.duration}>{duration} min</p>

      <button
        type="button"
        className={styles.removeButton}
        onClick={onRemove}
        aria-label={`Remove ${title} from meal plan`}
      >
        <X size={18} />
      </button>
    </article>
  )
}

export default MealCard