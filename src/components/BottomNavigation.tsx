import { CalendarDays, ShoppingBasket, FileUp } from 'lucide-react'

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
    <nav aria-label="Main navigation">
      <button
        type="button"
        onClick={() => onTabChange('plan')}
        aria-current={activeTab === 'plan' ? 'page' : undefined}
      >
        <CalendarDays size={24} strokeWidth={1.5} />
        <span>Plan</span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange('shop')}
        aria-current={activeTab === 'shop' ? 'page' : undefined}
      >
        <ShoppingBasket size={24} strokeWidth={1.5} />
        <span>Shop</span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange('import')}
        aria-current={activeTab === 'import' ? 'page' : undefined}
      >
        <FileUp size={24} strokeWidth={1.5} />
        <span>Import</span>
      </button>
    </nav>
  )
}

export default BottomNavigation
export type { Tab }