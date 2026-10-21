/**
 * Returns the Monday of a week relative to the current week.
 *
 * offset = 0  → current week
 * offset = 1  → next week
 * offset = -1 → previous week
 */
export function getWeekMonday(offset: number): Date {
  const today = new Date()
  const monday = new Date(today)

  // JavaScript counts Sunday as 0, but our weeks start on Monday.
  const dayOfWeek = monday.getDay()
  const daysSinceMonday = (dayOfWeek + 6) % 7

  monday.setDate(
    monday.getDate() - daysSinceMonday + offset * 7
  )

  // Normalize the time to avoid carrying the current time of day.
  monday.setHours(0, 0, 0, 0)

  return monday
}

/**
 * Creates a local date key in YYYY-MM-DD format.
 * We use local date parts to avoid UTC timezone shifts.
 */
export function getWeekKey(monday: Date): string {
  return [
    monday.getFullYear(),
    String(monday.getMonth() + 1).padStart(2, '0'),
    String(monday.getDate()).padStart(2, '0'),
  ].join('-')
}