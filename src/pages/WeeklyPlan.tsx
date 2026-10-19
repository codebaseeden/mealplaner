import { ChevronLeft, ChevronRight } from 'lucide-react'

import styles from './WeeklyPlan.module.css'

import type { Day } from '../types/meal'
import { getRecipeById } from '../data/recipes'

import DayPlan from '../components/DayPlan'

const weekPlan: Day[] = [
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
            <DayPlan key={day.id} day={day} />
        ))}
    </section>
  )
}

export default WeeklyPlan