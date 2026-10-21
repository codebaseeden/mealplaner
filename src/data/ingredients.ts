export const ingredients: Record<string, string> = {
  'orzo': 'Orzo',
  'cherry-tomatoes': 'Cherry Tomatoes',
  'oat-cream': 'Oat Cream',
  'parmesan': 'Parmesan',
  'oats': 'Oats',
  'oat-milk': 'Oat Milk',
  'chia-seeds': 'Chia Seeds',
  'banana': 'Banana',
  'tofu': 'Tofu',
  'rice': 'Rice',
  'broccoli': 'Broccoli',
  'soy-sauce': 'Soy Sauce'
}

export function getIngredientName(id: string): string {
  return ingredients[id] ?? id
}