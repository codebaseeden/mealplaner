import { useState } from 'react'
import type { Tab } from './components/BottomNavigation'
import AppLayout from './components/AppLayout'
import Button from './components/Button'


function App() {

  const [items, setItems] = useState([
    { id: 1, name: "Hafermilch", checked: false },
    { id: 2, name: "Tofu", checked: false },
    { id: 3, name: "Brokoli", checked: false  },
  ]) 

  const [activeTab, setActiveTab] = useState<Tab>('shop')

  function toggleItem(id: number) {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, checked: !item.checked }
          : item
      )
    )
  }

  return (
    <AppLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >

      {activeTab === 'plan' && (
        <section>
          <h1>Weekly Plan</h1>
          <p>Your delicious week starts here. 🌱</p>
        </section>
      )}

      {activeTab === 'shop' && (
        <>
        <h2>Einkaufsliste</h2>

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
        </>
      )}

      {activeTab === 'import' && (
        <section>
          <h1>Import</h1>
          <p>Import your meal plan here 📩</p>
        </section>
      )}

      <Button
        label = 'Add Item'
        onClick = {() => alert('Primary')}
        />
        <Button
        label = 'Cancel'
        variant = 'secondary'
        onClick = {() => alert('Secondary')}
        />
    </AppLayout>
  )
}

export default App
