import type { Recipe } from '../types/meal'

export const recipes: Recipe[] = [
  {
    id: 1,
    title: 'Creamy Tomato Orzo',
    duration: 25,
    servings: 2,
    mealTypes: ['lunch', 'dinner'],
    ingredients: [
      {
        ingredientId: 'orzo',
        amount: 200,
        unit: 'g'
      },
      {
        ingredientId: 'cherry-tomatoes',
        amount: 300,
        unit: 'g'
      },
      {
        ingredientId: 'oat-cream',
        amount: 150,
        unit: 'ml'
      },
      {
        ingredientId: 'parmesan',
        amount: 40,
        unit: 'g'
      }
    ]
  },
  {
    id: 2,
    title: 'Overnight Oats',
    duration: 10,
    servings: 1,
    mealTypes: ['breakfast'],
    ingredients: [
      {
        ingredientId: 'oats',
        amount: 60,
        unit: 'g'
      },
      {
        ingredientId: 'oat-milk',
        amount: 150,
        unit: 'ml'
      },
      {
        ingredientId: 'chia-seeds',
        amount: 10,
        unit: 'g'
      },
      {
        ingredientId: 'banana',
        amount: 1,
        unit: 'pcs'
      }
    ]
  },
  {
    id: 3,
    title: 'Crispy Tofu Bowl',
    duration: 30,
    servings: 2,
    ingredients: [
      {
        ingredientId: 'tofu',
        amount: 300,
        unit: 'g'
      },
      {
        ingredientId: 'rice',
        amount: 150,
        unit: 'g'
      },
      {
        ingredientId: 'broccoli',
        amount: 200,
        unit: 'g'
      },
      {
        ingredientId: 'soy-sauce',
        amount: 30,
        unit: 'ml'
      }
    ]
  }
]

export function getRecipeById(id: number): Recipe {
  const recipe = recipes.find((recipe) => recipe.id === id)

  if (!recipe) {
    throw new Error(`Recipe with ID ${id} not found`)
  }

  return recipe
}