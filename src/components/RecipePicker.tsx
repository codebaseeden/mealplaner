import { recipes } from '../data/recipes'
import { X } from 'lucide-react'

type RecipePickerProps = {
  dayId: number
  onSelectRecipe: (dayId: number, recipeId: number) => void
  onClose: () => void
}

function RecipePicker({
  dayId,
  onSelectRecipe,
  onClose,
}: RecipePickerProps) {
  return (
    <div>
      <h2>Choose a recipe</h2>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close recipe picker"
      >
        <X size={20} />
      </button>

      {recipes.map((recipe) => (
        <button
          key={recipe.id}
          type="button"
          onClick={() => onSelectRecipe(dayId, recipe.id)}
        >
          {recipe.title}
        </button>
      ))}
    </div>
  )
}

export default RecipePicker