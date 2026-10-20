import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useState } from 'react'
import styles from './WeeklyPlan.module.css'
import type { Day, MealType } from '../types/meal'
import DayPlan from '../components/DayPlan'
// import { recipes } from '../data/recipes'
import RecipePicker from '../components/RecipePicker'

const initialWeekPlan: Day[] = [
  {
    id: 1,
    day: 'Monday',
    meals: [
      {
        id: 101,
        mealType: 'dinner',
        recipeId: 1,
      },
    ],
  },
  {
    id: 2,
    day: 'Tuesday',
    meals: [
      {
        id: 102,
        mealType: 'breakfast',
        recipeId: 2,
      },
      {
        id: 103,
        mealType: 'dinner',
        recipeId: 3,
      },
    ],
  },
  {
    id: 3,
    day: 'Wednesday',
    meals: [],
  },
]

function WeeklyPlan() {
  const [weekPlan, setWeekPlan] = useState<Day[]>(initialWeekPlan)
  const [selectedDayId, setSelectedDayId] = useState<number | null>(null)

  function addMeal(dayId: number, recipeId: number, mealType: MealType) {
    setWeekPlan((currentPlan) =>
      currentPlan.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            meals: [
              ...day.meals,
              {
                id: Date.now(),
                mealType: mealType,
                recipeId: recipeId,
              },
            ],
          }
        }

        return day
      })
    )
  }

  return (
    <section className={styles.page} aria-labelledby="weekly-plan-title">

      <header className={styles.header}>
        <h1 id="weekly-plan-title">Your weekly plan</h1>
        <p className={styles.description}>
          A little planning, a lot of deliciousness.
        </p>
      </header>

      <div className={styles.weekNavigation} aria-label="Week navigation">
        <button
          type="button"
          className={styles.weekButton}
          aria-label="Previous week"
        >
          <ChevronLeft size={20} />
        </button>

        <span className={styles.weekLabel}>
          October 19 – 25, 2026
        </span>

        <button
          type="button"
          className={styles.weekButton}
          aria-label="Next week"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {weekPlan.map((day) => (
        <DayPlan
          key={day.id}
          day={day}
          onAddMeal={(dayId) => setSelectedDayId(dayId)}
        />
      ))}
      {selectedDayId !== null && (
        <RecipePicker
          dayId={selectedDayId}
          onSelectRecipe={(dayId, recipeId) => {
            addMeal(dayId, recipeId, 'dinner')
            setSelectedDayId(null)
          }}
          onClose={() => setSelectedDayId(null)}
        />
      )}
    </section>
  )
}

export default WeeklyPlan