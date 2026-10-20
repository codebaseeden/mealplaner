import { recipes } from '../data/recipes'
import { X, Plus, Clock3, Search } from 'lucide-react'
import styles from './RecipePicker.module.css'
import { useState } from 'react'
import type { MealType } from '../types/meal'

type RecipePickerProps = {
    dayId: number
    onSelectRecipe: (dayId: number, recipeId: number, mealType: MealType) => void
    onClose: () => void
}

function RecipePicker({
    dayId,
    onSelectRecipe,
    onClose,
}: RecipePickerProps) {

    const [isClosing, setIsClosing] = useState(false)
    const [pendingRecipeId, setPendingRecipeId] = useState<number | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedMealType, setSelectedMealType] = useState<MealType>('dinner')
    const filteredRecipes = recipes.filter((recipe) => {
        const matchesSearch = recipe.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase())

        const matchesMealType =
            !recipe.mealTypes ||
            recipe.mealTypes.length === 0 ||
            recipe.mealTypes.includes(selectedMealType)

        return matchesSearch && matchesMealType
    })

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
                        onSelectRecipe(dayId, pendingRecipeId, selectedMealType)
                    } else {
                        onClose()
                    }
                }}
            >
                <div className={styles.dragHandle} aria-hidden="true" />

                <div className={styles.header}>
                    <h2 id="recipe-picker-title">Choose a recipe</h2>


                    <button
                        className={styles.closeButton}
                        type="button"
                        onClick={handleClose}
                        aria-label="Close recipe picker"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div
                    className={styles.mealTypeSelector}
                    role="group"
                    aria-label="Meal type"
                >
                    {(['breakfast', 'lunch', 'dinner'] as MealType[]).map((mealType) => (
                        <button
                            key={mealType}
                            type="button"
                            className={`${styles.mealTypeButton} ${selectedMealType === mealType ? styles.mealTypeButtonActive : ''
                                }`}
                            onClick={() => setSelectedMealType(mealType)}
                            aria-pressed={selectedMealType === mealType}
                        >
                            {mealType}
                        </button>
                    ))}
                </div>

                <div className={styles.searchField}>
                    <Search size={20} aria-hidden="true" />

                    <input
                        type="search"
                        placeholder="Search recipes..."
                        aria-label="Search recipes"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                    />
                </div>

                <div className={styles.recipeList}>
                    {filteredRecipes.length === 0 ? (
                        <div className={styles.emptyState}>
                            <p>No matching recipes</p>
                            <span>
                                Try a different search or meal type.
                            </span>
                        </div>
                    ) : (
                        filteredRecipes.map((recipe) => (
                            <button
                                key={recipe.id}
                                type="button"
                                className={styles.recipeButton}
                                onClick={() => {
                                    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                                        onSelectRecipe(dayId, recipe.id, selectedMealType)
                                        return
                                    }

                                    setPendingRecipeId(recipe.id)
                                    setIsClosing(true)
                                }}
                            >
                                <span className={styles.recipeInfo}>
                                    <span className={styles.recipeTitle}>{recipe.title}</span>
                                    <span className={styles.recipeDuration}>
                                        <Clock3 size={14} />
                                        {recipe.duration} min
                                    </span>
                                </span>

                                <Plus size={20} aria-hidden="true" />
                            </button>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export default RecipePicker