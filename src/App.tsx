import { useState } from 'react'
import type { Tab } from './components/BottomNavigation'

import AppLayout from './components/AppLayout'

import WeeklyPlan from './pages/WeeklyPlan'
import Import from './pages/Import'
import ShoppingList from './pages/ShoppingList'


function App() {

  const [activeTab, setActiveTab] = useState<Tab>('shop')

  return (
    <AppLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >

      {activeTab === 'plan' && <WeeklyPlan /> }
      {activeTab === 'shop' && <ShoppingList /> }
      {activeTab === 'import' && <Import />}

    </AppLayout>
  )
}

export default App
