import type { Day } from '../types/meal'

const STORAGE_KEY = 'meal-planner-week-plans'

// Plans are indexed by the local Monday date key produced by getWeekKey.
export function loadWeekPlans(): Record<string, Day[]> {
  try {
    const savedPlans = localStorage.getItem(STORAGE_KEY)

    // Parsing restores stored data as-is; this loader does not validate its structure.
    return savedPlans ? JSON.parse(savedPlans) : {}
  // Start with no plans if browser storage is inaccessible or the saved JSON cannot be parsed.
  } catch (error) {
    console.error('Failed to load saved meal plans:', error)
    return {}
  }
}