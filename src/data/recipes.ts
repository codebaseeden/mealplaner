import type { Recipe } from '../types/meal'

export const recipes: Recipe[] = [
  {
    id: 1,
    title: 'Creamy Tomato Orzo',
    duration: 25,
    mealTypes: ['lunch', 'dinner']
  },
  {
    id: 2,
    title: 'Overnight Oats',
    duration: 10,
    mealTypes: ['breakfast']
  },
  {
    id: 3,
    title: 'Crispy Tofu Bowl',
    duration: 30,
  },
]

export function getRecipeById(id: number): Recipe {
  const recipe = recipes.find((recipe) => recipe.id === id)

  if (!recipe) {
    throw new Error(`Recipe with ID ${id} not found`)
  }

  return recipe
}