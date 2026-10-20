import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import styles from './WeeklyPlan.module.css'
import DayPlan from '../components/DayPlan'
import RecipePicker from '../components/RecipePicker'

import type { Day, Meal, MealType, PlanningMode } from '../types/meal'

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

type RemovedMeal = {
  weekKey: string
  dayId: number
  meal: Meal
}

function WeeklyPlan() {
  const [planningMode, setPlanningMode] = useState<PlanningMode>(() => {
    const savedMode = localStorage.getItem('meal-planner-mode')

    return savedMode === 'detailed' ? 'detailed' : 'simple'
  })
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

  useEffect(() => {
    localStorage.setItem('meal-planner-mode', planningMode)
  }, [planningMode])

  // States

  const [selectedDayId, setSelectedDayId] = useState<number | null>(null)
  const [weekOffset, setWeekOffset] = useState(0)
  const [removedMeal, setRemovedMeal] = useState<RemovedMeal | null>(null)
  const [isSnackbarClosing, setIsSnackbarClosing] = useState(false)
  const [mealPlanError, setMealPlanError] = useState<string | null>(null)

  useEffect(() => {
    if (removedMeal === null) {
      return
    }

    setIsSnackbarClosing(false)

    const timer = window.setTimeout(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setRemovedMeal(null)
        return
      }

      setIsSnackbarClosing(true)
    }, 5000)

    return () => {
      window.clearTimeout(timer)
    }
  }, [removedMeal])

  function addMeal(dayId: number, recipeId: number, mealType: MealType) {
    const currentDay = weekPlan.find(day => day.id === dayId)

    if (planningMode === 'simple' && (currentDay?.meals.length ?? 0) > 1) {
      setMealPlanError(
        'This day already has multiple meals. Switch to Detailed Mode to manage them.'
      )
      return false
    }

    setWeekPlans((currentPlans) => {
      const currentWeek = currentPlans[weekKey] ?? createEmptyWeekPlan()

      const updatedWeek = currentWeek.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            meals: planningMode === 'simple' && day.meals.length <= 1
              ? [{ id: Date.now(), mealType, recipeId }]
              : [...day.meals, { id: Date.now(), mealType, recipeId }],
          }
        }

        return day
      })

      return {
        ...currentPlans,
        [weekKey]: updatedWeek,
      }
    })
    return true
  }

  function removeMeal(dayId: number, mealId: number) {
    const currentDay = weekPlan.find((day) => day.id === dayId)
    const mealToRemove = currentDay?.meals.find((meal) => meal.id === mealId)

    if (!mealToRemove) {
      return
    }

    setIsSnackbarClosing(false)

    setRemovedMeal({
      weekKey,
      dayId,
      meal: mealToRemove,
    })

    setWeekPlans((currentPlans) => {
      const currentWeek = currentPlans[weekKey] ?? createEmptyWeekPlan()

      const updatedWeek = currentWeek.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            meals: day.meals.filter((meal) => meal.id !== mealId),
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

  function undoRemoveMeal() {
    if (!removedMeal) {
      return
    }

    const { weekKey: originalWeekKey, dayId, meal } = removedMeal

    setWeekPlans((currentPlans) => {
      const currentWeek =
        currentPlans[originalWeekKey] ?? createEmptyWeekPlan()

      const updatedWeek = currentWeek.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            meals: [...day.meals, meal],
          }
        }

        return day
      })

      return {
        ...currentPlans,
        [originalWeekKey]: updatedWeek,
      }
    })

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRemovedMeal(null)
    } else {
      setIsSnackbarClosing(true)
    }
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

      <div
        className={styles.planningModeSelector}
        role="group"
        aria-label="Planning mode"
      >
        <button
          type="button"
          className={`${styles.planningModeButton} ${planningMode === 'simple' ? styles.planningModeButtonActive : ''
            }`}
          onClick={() => setPlanningMode('simple')}
          aria-pressed={planningMode === 'simple'}
        >
          Simple
        </button>

        <button
          type="button"
          className={`${styles.planningModeButton} ${planningMode === 'detailed' ? styles.planningModeButtonActive : ''
            }`}
          onClick={() => setPlanningMode('detailed')}
          aria-pressed={planningMode === 'detailed'}
        >
          Detailed
        </button>
      </div>

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
          onRemoveMeal={removeMeal}
        />
      ))}
      {selectedDayId !== null && (
        <RecipePicker
          dayId={selectedDayId}
          planningMode={planningMode}
          onSelectRecipe={(dayId, recipeId, mealType) => {
            const success = addMeal(dayId, recipeId, mealType)

            if (success) {
              setMealPlanError(null)
            }

            return success
          }}
          onClose={() => setSelectedDayId(null)}
          errorMessage={mealPlanError}
        />
      )}

      {removedMeal !== null && (
        <div
          className={`${styles.snackbar} ${isSnackbarClosing ? styles.snackbarClosing : ''}`}
          role="status"
          onAnimationEnd={(event) => {
            if (event.target !== event.currentTarget || !isSnackbarClosing) {
              return
            }

            setRemovedMeal(null)
            setIsSnackbarClosing(false)
          }}
        >
          <span>Meal removed</span>

          <button type="button" onClick={undoRemoveMeal}>
            Undo
          </button>
        </div>
      )}
    </section>
  )
}

export default WeeklyPlan