import type { Day } from '../types/meal'
import MealCard from './MealCard'
import styles from './DayPlan.module.css'

type DayPlanProps = {
  day: Day
}

function DayPlan({ day }: DayPlanProps) {
  return (
    <section
      className={styles.day}
      aria-labelledby={`day-${day.id}`}
    >
      <div className={styles.dayHeader}>
        <h2
          className={styles.dayTitle}
          id={`day-${day.id}`}
        >
          {day.day}
        </h2>
      </div>

      {day.meals.length > 0 ? (
        day.meals.map((meal) => (
          <MealCard
            key={meal.id}
            title={meal.recipe.title}
            mealType={meal.mealType}
            duration={meal.recipe.duration}
          />
        ))
      ) : (
        <div className={styles.emptyState}>
          <p>No meals planned yet.</p>
        </div>
      )}
    </section>
  )
}

export default DayPlan