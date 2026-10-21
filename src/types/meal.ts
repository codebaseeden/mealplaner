// Recipes hold reusable details; planned meals reference them by ID.
export type Recipe = {
  id: number
  title: string
  // Preparation time in minutes.
  duration: number
  // Yield for the ingredient amounts listed below.
  servings: number
  ingredients: Ingredient[]
  // Optional meal-type metadata; some recipes do not specify it.
  mealTypes?: MealType[]
}

export type MealType = 'breakfast' | 'lunch' | 'dinner'

// Each scheduled occurrence has its own ID, even when a recipe is planned more than once.
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

// Quantities with different units remain separate when generating the shopping list.
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

// Reference the shared ingredient catalog without duplicating display names.
export type Ingredient = {
  ingredientId: string
  amount: number
  unit: Unit
}