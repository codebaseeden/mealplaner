
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
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
  // Planning mode
  const [planningMode, setPlanningMode] = useState<PlanningMode>(() => {
    const savedMode = localStorage.getItem('meal-planner-mode')
    return savedMode === 'detailed' ? 'detailed' : 'simple'
  })

  // Saved weekly plans
  const [weekPlans, setWeekPlans] = useState<Record<string, Day[]>>(() => {
    try {
      const savedPlans = localStorage.getItem('meal-planner-week-plans')
      return savedPlans ? JSON.parse(savedPlans) : {}
    } catch (error) {
      console.error('Failed to load saved meal plans:', error)
      return {}
    }
  })

  // UI states
  const [selectedDayId, setSelectedDayId] = useState<number | null>(null)
  const [weekOffset, setWeekOffset] = useState(0)
  const [removedMeal, setRemovedMeal] = useState<RemovedMeal | null>(null)
  const [isSnackbarClosing, setIsSnackbarClosing] = useState(false)
  const [mealPlanError, setMealPlanError] = useState<string | null>(null)
  const [showModeSwitchDialog, setShowModeSwitchDialog] = useState(false)

  // Dialog reference
  const dialogRef = useRef<HTMLDialogElement>(null)

  // Persist weekly plans
  useEffect(() => {
    localStorage.setItem(
      'meal-planner-week-plans',
      JSON.stringify(weekPlans)
    )
  }, [weekPlans])

  // Persist planning mode
  useEffect(() => {
    localStorage.setItem('meal-planner-mode', planningMode)
  }, [planningMode])

  // Open and close the native dialog
  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) {
      return
    }

    if (showModeSwitchDialog) {
      if (!dialog.open) {
        dialog.showModal()
      }
    } else {
      if (dialog.open) {
        dialog.close()
      }
    }
  }, [showModeSwitchDialog])

  // Keep React state in sync when Escape is pressed
  function handleDialogCancel(event: React.SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault()
    setShowModeSwitchDialog(false)
  }

  // Dialog Backdrop click exit

  function handleDialogBackdropClick(
    event: React.MouseEvent<HTMLDialogElement>
  ) {
    const dialog = event.currentTarget

    const rect = dialog.getBoundingClientRect()

    const clickedOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom

    if (clickedOutside) {
      setShowModeSwitchDialog(false)
    }
  }

  // Handle snackbar timeout
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

  // Week calculations
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

  // Add or replace a meal
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

  // Remove a meal
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

  // Undo meal removal
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

  // Switch to Simple Mode
  function handleSwitchToSimple() {
    const hasMultipleMeals = Object.values(weekPlans).some(
      week => week.some(
        day => day.meals.length > 1
      )
    )

    if (hasMultipleMeals) {
      setShowModeSwitchDialog(true)
      return
    }

    setPlanningMode('simple')
  }

  return (
    <section className={styles.page} aria-labelledby="weekly-plan-title">
      <header className={styles.header}>
        <h1 id="weekly-plan-title">Your weekly plan</h1>
        <p className={styles.description}>
          A little planning, a lot of deliciousness.
        </p>
      </header>

      {/* Planning mode selector */}
      <div
        className={styles.planningModeSelector}
        role="group"
        aria-label="Planning mode"
      >
        <button
          type="button"
          className={`${styles.planningModeButton} ${planningMode === 'simple' ? styles.planningModeButtonActive : ''
            }`}
          onClick={handleSwitchToSimple}
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

      {/* Week navigation */}
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

      {/* Day plans */}
      {weekPlan.map((day) => (
        <DayPlan
          key={day.id}
          day={day}
          planningMode={planningMode}
          onAddMeal={(dayId) => {
            setMealPlanError(null)
            setSelectedDayId(dayId)
          }}
          onRemoveMeal={removeMeal}
        />
      ))}

      {/* Recipe picker */}
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

      {/* Undo snackbar */}
      {removedMeal !== null && (
        <div
          className={`${styles.snackbar} ${isSnackbarClosing ? styles.snackbarClosing : ''
            }`}
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

      {/* Planning mode confirmation dialog */}
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="mode-dialog-title"
        aria-describedby="mode-dialog-description"
        onCancel={handleDialogCancel}
        onClick={handleDialogBackdropClick}
      >
        <h2 id="mode-dialog-title">
          Switch to Simple Mode?
        </h2>

        <p id="mode-dialog-description">
          Some days have multiple meals planned.
          Your existing meals will be kept.
          You can manage them in Detailed Mode at any time.
        </p>

        <div className={styles.dialogActions}>
          <button
            type="button"
            onClick={() => setShowModeSwitchDialog(false)}
          >
            Stay in Detailed Mode
          </button>

          <button
            type="button"
            onClick={() => {
              setPlanningMode('simple')
              setShowModeSwitchDialog(false)
            }}
          >
            Switch to Simple Mode
          </button>
        </div>
      </dialog>
    </section>
  )
}

export default WeeklyPlan
