import type { Day, PlanningMode } from '../types/meal'
import MealCard from './MealCard'
import styles from './DayPlan.module.css'
import { getRecipeById } from '../data/recipes'
import { Plus } from 'lucide-react'

type DayPlanProps = {
  day: Day
  planningMode: PlanningMode
  onAddMeal: (dayId: number) => void
  onRemoveMeal: (dayId: number, mealId: number) => void
}

function DayPlan({ day, onAddMeal, onRemoveMeal, planningMode }: DayPlanProps) {
  const mealTypeOrder = {
    breakfast: 0,
    lunch: 1,
    dinner: 2,
  }

  const sortedMeals = [...day.meals].sort(
    (a, b) =>
      mealTypeOrder[a.mealType] - mealTypeOrder[b.mealType]
  )
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
        <button
          type='button'
          className={styles.addButton}
          onClick={() => onAddMeal(day.id)}
          aria-label={`Add meal for ${day.day}`}
        >
          <Plus size={18} strokeWidth={2} />
        </button>
      </div>

      {day.meals.length > 0 ? (
        sortedMeals.map((meal) => {
          const recipe = getRecipeById(meal.recipeId)

          return (
            <MealCard
              key={meal.id}
              title={recipe.title}
              mealType={planningMode === 'detailed' ? meal.mealType : undefined}
              duration={recipe.duration}
              onRemove={() => onRemoveMeal(day.id, meal.id)}
            />
          )
        })
      ) : (
        <div className={styles.emptyState}>
          <p>No meals planned yet.</p>
        </div>
      )}
    </section>
  )
}

export default DayPlan