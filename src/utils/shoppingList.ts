import type { Day, Ingredient } from '../types/meal'
import { getRecipeById } from '../data/recipes'

// Each planned occurrence contributes the full recipe quantities; servings are not rescaled here.
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
    // Merge only matching IDs and units; this does not convert grams to kilograms, for example.
    const key = `${ingredient.ingredientId}:${ingredient.unit}`

    const existing = merged.get(key)

    if (existing) {
      existing.amount += ingredient.amount
    } else {
      // Copy before accumulating so the original recipe ingredients are never mutated.
      merged.set(key, { ...ingredient })
    }
  }

  return Array.from(merged.values())
}

// Consolidate all planned occurrences, including repeated recipes, into shopping quantities.
export function generateShoppingList(days: Day[]): Ingredient[] {
  const ingredients = getWeekIngredients(days)

  return mergeIngredients(ingredients)
}