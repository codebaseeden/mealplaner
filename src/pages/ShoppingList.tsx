import { Fragment, useState } from 'react'
import { loadWeekPlans } from '../utils/weekStorage'
import { getWeekMonday, getWeekKey } from '../utils/week'
import { generateShoppingList } from '../utils/shoppingList'
import { getIngredientName } from '../data/ingredients'
import { ShoppingBasket } from 'lucide-react'
import styles from './ShoppingList.module.css'
import Button from '../components/Button'

// Props shared by the parent App component.
type ShoppingListProps = {
    weekOffset: number
    onPlanMeals: () => void
}

function ShoppingList({ weekOffset, onPlanMeals }: ShoppingListProps) {
    // Identify the week selected in the Weekly Plan.
    const monday = getWeekMonday(weekOffset)
    const weekKey = getWeekKey(monday)

    // Load the saved plan and generate its consolidated ingredient list.
    const weekPlans = loadWeekPlans()
    const selectedWeek = weekPlans[weekKey] ?? []
    const ingredients = generateShoppingList(selectedWeek)

    // Track checked ingredients by their ID and unit.
    // Using a Set makes it easy to check whether an item is selected.
    // Store checked ingredients separately for each calendar week.
    const [checkedByWeek, setCheckedByWeek] = useState<Record<string, string[]>>(
        () => {
            try {
                const saved = localStorage.getItem('meal-planner-checked-items')
                return saved ? JSON.parse(saved) : {}
            } catch (error) {
                console.error('Failed to load checked ingredients:', error)
                return {}
            }
        }
    )

    // Get the checked ingredients for the currently selected week.
    // Include the unit in each key so quantities in different units stay independent.
    const checkedIngredients = new Set(checkedByWeek[weekKey] ?? [])
    // Keep unchecked ingredients first while preserving their original order.
    const sortedIngredients = [...ingredients].sort((a, b) => {
        const aKey = `${a.ingredientId}:${a.unit}`
        const bKey = `${b.ingredientId}:${b.unit}`

        const aChecked = checkedIngredients.has(aKey)
        const bChecked = checkedIngredients.has(bKey)

        return Number(aChecked) - Number(bChecked)
    })

    // Count completed items in the currently generated shopping list.
    const completedCount = ingredients.filter((ingredient) => {
        const key = `${ingredient.ingredientId}:${ingredient.unit}`
        return checkedIngredients.has(key)
    }).length

    // Update only the selected week's checked ingredients.
    function toggleIngredient(key: string) {
        setCheckedByWeek((current) => {
            const updated = new Set(current[weekKey] ?? [])

            if (updated.has(key)) {
                updated.delete(key)
            } else {
                updated.add(key)
            }

            const next = {
                ...current,
                [weekKey]: Array.from(updated)
            }

            // Persist the updated selection across reloads and tab changes.
            localStorage.setItem(
                'meal-planner-checked-items',
                JSON.stringify(next)
            )

            return next
        })
    }

    return (
        <section aria-labelledby="shopping-list-title">
            <h1 id="shopping-list-title">Shopping List</h1>
            {ingredients.length > 0 && (
                <p className={styles.shoppingProgress}>
                    {completedCount} of {ingredients.length} items completed
                </p>
            )}

            {/* Preview ingredients generated from the selected week's recipes. */}
            <h2>Ingredients from your meal plan</h2>

            {ingredients.length === 0 ? (
                // Show a helpful message when no meals are planned for this week.
                <div className={styles.emptyState} role="status">
                    <ShoppingBasket
                        size={40}
                        strokeWidth={1.5}
                        className={styles.emptyStateIcon}
                        aria-hidden="true"
                    />

                    <h3 className={styles.emptyStateTitle}>
                        Your shopping list is empty
                    </h3>

                    <p className={styles.emptyStateDescription}>
                        Plan some meals for this week and your ingredients
                        will appear here automatically.
                    </p>
                    <Button
                        label="Plan meals"
                        onClick={onPlanMeals}
                    />
                </div>
            ) : (
                // Display the generated ingredients when meals are available.
                <ul className={styles.ingredientList}>
                    {sortedIngredients.map((ingredient) => {
                        const key = `${ingredient.ingredientId}:${ingredient.unit}`
                        const isChecked = checkedIngredients.has(key)

                        return (
                            <Fragment key={key}>
                                {/* Insert the completed heading only before the first checked item. */}
                                {isChecked &&
                                    completedCount > 0 &&
                                    sortedIngredients.findIndex((item) =>
                                        checkedIngredients.has(`${item.ingredientId}:${item.unit}`)
                                    ) === sortedIngredients.indexOf(ingredient) && (
                                        <li className={styles.completedHeading}>
                                            Completed ({completedCount})
                                        </li>
                                    )}

                                <li
                                    className={`${styles.ingredientItem} ${isChecked ? styles.ingredientChecked : ''
                                        }`}
                                >
                                    <label className={styles.ingredientLabel}>
                                        <input
                                            className={styles.ingredientCheckbox}
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => toggleIngredient(key)}
                                        />

                                        <span className={styles.ingredientName}>
                                            {getIngredientName(ingredient.ingredientId)}
                                        </span>

                                        <span className={styles.ingredientAmount}>
                                            {ingredient.amount} {ingredient.unit}
                                        </span>
                                    </label>
                                </li>
                            </Fragment>
                        )
                    })}
                </ul>
            )}
        </section>
    )
}

export default ShoppingList