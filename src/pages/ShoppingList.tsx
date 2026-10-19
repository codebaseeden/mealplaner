import { useState } from 'react'
import Button from '../components/Button'

function ShoppingList() {
    const [items, setItems] = useState([
        { id: 1, name: 'Hafermilch', checked: false },
        { id: 2, name: 'Tofu', checked: false },
        { id: 3, name: 'Brokkoli', checked: false },
    ])

    function toggleItem(id: number) {
        setItems((currentItems) =>
        currentItems.map((item) =>
            item.id === id
            ? { ...item, checked: !item.checked }
            : item
        ))
    }

  return (
    <section aria-labelledby="shopping-list-title">
        <h1 id="shopping-list-title">Shopping List</h1>

        <ul>
            {items.map((item) => (
                <li key={item.id}>
                <label>
                    <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleItem(item.id)}
                    />
                    <span
                    style={{
                        textDecoration: item.checked ? "line-through" : "none", }}
                    >
                        {item.name}
                    </span>
                </label>
                </li>
            ))}
        </ul>

        <Button
            label = 'Add Item'
            onClick = {() => alert('Primary')}
        />

        <Button
            label = 'Cancel'
            variant = 'secondary'
            onClick = {() => alert('Secondary')}
        />       
    </section>
  )
}

export default ShoppingList