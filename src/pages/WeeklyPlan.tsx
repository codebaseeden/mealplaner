import { ChevronLeft, ChevronRight } from 'lucide-react'

import styles from './WeeklyPlan.module.css'

import MealCard from '../components/MealCard'

const weekPlan = [
  {
    id: 1,
    day: 'Monday',
    meals: [
      {
        title: 'Creamy Tomato Orzo',
        mealType: 'dinner' as const,
        duration: 25,
      },
    ],
  },
  {
    id: 2,
    day: 'Tuesday',
    meals: [
      {
        title: 'Overnight Oats',
        mealType: 'breakfast' as const,
        duration: 10,
      },
      {
        title: 'Crispy Tofu Bowl',
        mealType: 'dinner' as const,
        duration: 30,
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
            <section
                key={day.id}
                className={styles.day}
                aria-labelledby={`day-${day.id}`}
            >
                <div className={styles.dayHeader}>
                    <h2
                        id={`day-${day.id}`}
                        className={styles.dayTitle}
                    >
                        {day.day}
                    </h2>
                </div>

                {day.meals.length > 0 ? (
                    day.meals.map((meal, index) => (
                        <MealCard
                        key={index}
                        title={meal.title}
                        mealType={meal.mealType}
                        duration={meal.duration}
                        />
                    ))
                    ) : (
                    <div className={styles.emptyState}>
                        <p>No meals planned yet.</p>
                    </div>
                )}
            </section>
        ))}
    </section>
  )
}

export default WeeklyPlan