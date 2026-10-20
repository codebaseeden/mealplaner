import { recipes } from '../data/recipes'
import { X } from 'lucide-react'
import styles from './RecipePicker.module.css'
import { useState } from 'react'

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

    const [isClosing, setIsClosing] = useState(false)
    const [pendingRecipeId, setPendingRecipeId] = useState<number | null >(null)

    function handleClose() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            onClose()
            return
        }
        
        setIsClosing(true)
    }

    return (
        <>
            <button
                type="button"
                className={styles.backdrop}
                onClick={handleClose}
                aria-label="Close recipe picker" 
                />

            <div 
                className={`${styles.sheet} ${isClosing ? styles.closing : ''}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="recipe-picker-title"
                onAnimationEnd={(event) => {
                    if (event.target !== event.currentTarget || !isClosing) {
                        return
                    }

                    if (pendingRecipeId !== null) {
                        onSelectRecipe(dayId, pendingRecipeId)
                    } else {
                        onClose()
                    }
                }}
            >
            <h2 id="recipe-picker-title">Choose a recipe</h2>
            <button
                type="button"
                onClick={handleClose}
                aria-label="Close recipe picker"
            >
                <X size={20} />
            </button>

            {recipes.map((recipe) => (
                <button
                key={recipe.id}
                type="button"
                onClick={() => {
                    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                        onSelectRecipe(dayId, recipe.id)
                        return
                    }
                    
                    setPendingRecipeId(recipe.id)
                    setIsClosing(true)
                }}
                >
                {recipe.title}
                </button>
            ))}
            </div>
        </>
    )
}

export default RecipePicker