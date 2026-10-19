import { CalendarDays, ShoppingBasket, FileUp } from 'lucide-react'
import styles from './BottomNavigation.module.css'

type Tab = 'plan' | 'shop' | 'import'

type BottomNavigationProps = {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

function BottomNavigation({
  activeTab,
  onTabChange,
}: BottomNavigationProps) {
  return (
    <nav className={styles.navigation} aria-label="Main navigation">
      <button
        type="button"
        onClick={() => onTabChange('plan')}
        aria-current={activeTab === 'plan' ? 'page' : undefined}
        className={`${styles.tab} ${activeTab === 'plan' ? styles.active : ''}`}
      >
        <CalendarDays size={24} strokeWidth={1.5} />
        <span>Plan</span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange('shop')}
        aria-current={activeTab === 'shop' ? 'page' : undefined}
        className={`${styles.tab} ${activeTab === 'shop' ? styles.active : ''}`}
      >
        <ShoppingBasket size={24} strokeWidth={1.5} />
        <span>Shop</span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange('import')}
        aria-current={activeTab === 'import' ? 'page' : undefined}
        className={`${styles.tab} ${activeTab === 'import' ? styles.active : ''}`}
      >
        <FileUp size={24} strokeWidth={1.5} />
        <span>Import</span>
      </button>
    </nav>
  )
}

export default BottomNavigation
export type { Tab }