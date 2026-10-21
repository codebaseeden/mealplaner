// Stable ingredient IDs link recipe quantities to their display names.
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
  // Keep unknown ingredients readable even when the catalog has no matching name.
  return ingredients[id] ?? id
}