export type Recipe = {
  id: number
  title: string
  duration: number
}

export type MealType = 'breakfast' | 'lunch' | 'dinner'

export type Meal = {
  id: number
  mealType: MealType
  recipe: Recipe
}

export type Day = {
  id: number
  day: string
  meals: Meal[]
}