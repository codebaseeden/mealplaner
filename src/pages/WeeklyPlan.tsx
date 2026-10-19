import { ChevronLeft, ChevronRight } from 'lucide-react'

import styles from './WeeklyPlan.module.css'

import MealCard from '../components/MealCard'

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

        <section
            className={styles.day}
            aria-labelledby="monday-title"
        >
            <div className={styles.dayHeader}>
                <h2
                id="monday-title"
                className={styles.dayTitle}
                >
                    Monday
                </h2>
            </div>

            <MealCard
                title="Creamy Tomato Orzo"
                mealType="dinner"
                duration={25}
            />
        </section>
    </section>
  )
}

export default WeeklyPlan