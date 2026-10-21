import type { Day } from '../types/meal'

const STORAGE_KEY = 'meal-planner-week-plans'

export function loadWeekPlans(): Record<string, Day[]> {
  try {
    const savedPlans = localStorage.getItem(STORAGE_KEY)

    return savedPlans ? JSON.parse(savedPlans) : {}
  } catch (error) {
    console.error('Failed to load saved meal plans:', error)
    return {}
  }
}