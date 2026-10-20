import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import styles from './WeeklyPlan.module.css'
import type { Day, MealType } from '../types/meal'
import DayPlan from '../components/DayPlan'
import RecipePicker from '../components/RecipePicker'

function createEmptyWeekPlan(): Day[] {
  return [
    { id: 1, day: 'Monday', meals: [] },
    { id: 2, day: 'Tuesday', meals: [] },
    { id: 3, day: 'Wednesday', meals: [] },
    { id: 4, day: 'Thursday', meals: [] },
    { id: 5, day: 'Friday', meals: [] },
    { id: 6, day: 'Saturday', meals: [] },
    { id: 7, day: 'Sunday', meals: [] },
  ]
}

function WeeklyPlan() {
  const [weekPlans, setWeekPlans] = useState<Record<string, Day[]>>(() => {
    try {
      const savedPlans = localStorage.getItem('meal-planner-week-plans')

      return savedPlans ? JSON.parse(savedPlans) : {}
    } catch (error) {
      console.error('Failed to load saved meal plans:', error)
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem(
      'meal-planner-week-plans',
      JSON.stringify(weekPlans)
    )
  }, [weekPlans])

  const [selectedDayId, setSelectedDayId] = useState<number | null>(null)
  const [weekOffset, setWeekOffset] = useState(0)

  function addMeal(dayId: number, recipeId: number, mealType: MealType) {
    setWeekPlans((currentPlans) => {
      const currentWeek = currentPlans[weekKey] ?? createEmptyWeekPlan()

      const updatedWeek = currentWeek.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            meals: [
              ...day.meals,
              {
                id: Date.now(),
                mealType,
                recipeId,
              },
            ],
          }
        }

        return day
      })

      return {
        ...currentPlans,
        [weekKey]: updatedWeek,
      }
    })
  }

  const today = new Date()
  const monday = new Date(today)

  const dayOfWeek = monday.getDay()
  const daysSinceMonday = (dayOfWeek + 6) % 7

  monday.setDate(monday.getDate() - daysSinceMonday + weekOffset * 7)

  const weekKey = [
    monday.getFullYear(),
    String(monday.getMonth() + 1).padStart(2, '0'),
    String(monday.getDate()).padStart(2, '0'),
  ].join('-')

  const weekPlan = weekPlans[weekKey] ?? createEmptyWeekPlan()

  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)

  const dateLocale = 'de-AT'
  const weekLabel = `${monday.toLocaleDateString(dateLocale, {
    month: '2-digit',
    day: '2-digit',
  })} - ${sunday.toLocaleDateString(dateLocale, {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  })}`

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
          onClick={() => setWeekOffset((current) => current - 1)}
        >
          <ChevronLeft size={20} />
        </button>

        <span className={styles.weekLabel}>{weekLabel}</span>

        <button
          type="button"
          className={styles.weekButton}
          aria-label="Next week"
          onClick={() => setWeekOffset((current) => current + 1)}
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