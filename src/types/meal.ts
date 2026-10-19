export type MealType = 'breakfast' | 'lunch' | 'dinner'

export type Meal = {
  id: number
  title: string
  mealType: MealType
  duration: number
}

export type Day = {
  id: number
  day: string
  meals: Meal[]
}