import { useState } from 'react'
import type { Tab } from './components/BottomNavigation'

import AppLayout from './components/AppLayout'

import WeeklyPlan from './pages/WeeklyPlan'
import Import from './pages/Import'
import ShoppingList from './pages/ShoppingList'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('shop')
  // Keep the selected week above both pages so tab changes preserve their shared context.
  const [weekOffset, setWeekOffset] = useState(0)

  return (
    <AppLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {/* Only the active page is mounted; persistent data survives through browser storage. */}
      {activeTab === 'plan' && (
        <WeeklyPlan
          weekOffset={weekOffset}
          setWeekOffset={setWeekOffset}
        />
      )}

      {activeTab === 'shop' && (
        <ShoppingList
          weekOffset={weekOffset}
          onPlanMeals={() => setActiveTab('plan')}
        />
      )}

      {activeTab === 'import' && <Import />}
    </AppLayout>
  )
}

export default App