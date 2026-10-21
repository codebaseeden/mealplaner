import type { Day, Ingredient } from '../types/meal'
import { getRecipeById } from '../data/recipes'

export function getDayIngredients(day: Day): Ingredient[] {
  return day.meals.flatMap((meal) => {
    const recipe = getRecipeById(meal.recipeId)

    return recipe.ingredients
  })
}

export function getWeekIngredients(days: Day[]): Ingredient[] {
  return days.flatMap((day) => getDayIngredients(day))
}

export function mergeIngredients(
  ingredients: Ingredient[]
): Ingredient[] {
  const merged = new Map<string, Ingredient>()

  for (const ingredient of ingredients) {
    const key = `${ingredient.ingredientId}:${ingredient.unit}`

    const existing = merged.get(key)

    if (existing) {
      existing.amount += ingredient.amount
    } else {
      merged.set(key, { ...ingredient })
    }
  }

  return Array.from(merged.values())
}

export function generateShoppingList(days: Day[]): Ingredient[] {
  const ingredients = getWeekIngredients(days)

  return mergeIngredients(ingredients)
}