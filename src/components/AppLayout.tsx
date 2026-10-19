import type { ReactNode } from 'react'
import styles from './AppLayout.module.css'
import BottomNavigation from './BottomNavigation'
import type { Tab } from './BottomNavigation'

type AppLayoutProps = {
  children: ReactNode
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

function AppLayout({
  children,
  activeTab,
  onTabChange,
}: AppLayoutProps) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <span>🌿 Meal Planner</span>
      </header>

      <main className={styles.main}>
        {children}
      </main>

      <div className={styles.navigation}>
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
      </div>
    </div>
  )
}

export default AppLayout