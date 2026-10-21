export type Recipe = {
  id: number
  title: string
  duration: number
  servings: number
  ingredients: Ingredient[]
  mealTypes?: MealType[]
}

export type MealType = 'breakfast' | 'lunch' | 'dinner'

export type Meal = {
  id: number
  mealType: MealType
  recipeId: number
}

export type Day = {
  id: number
  day: string
  meals: Meal[]
}

export type PlanningMode = 'simple' | 'detailed'

export type Unit =
  | 'g'
  | 'kg'
  | 'ml'
  | 'l'
  | 'pcs'
  | 'tsp'
  | 'tbsp'
  | 'cup'
  | 'oz'
  | 'lb'
  | 'fl_oz'

export type Ingredient = {
  ingredientId: string
  amount: number
  unit: Unit
}