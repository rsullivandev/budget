import BudgetScreen from './screens/BudgetScreen.js'
import BudgetDetailsScreen from './screens/BudgetDetailsScreen.js'
import ItemDetailsScreen from './screens/ItemDetailsScreen.js'
import TransactionScreen from './screens/TransactionScreen.js'
import CategoryScreen from './screens/CategoryScreen.js'
import GoalScreen from './screens/GoalScreen.js'
import EscrowScreen from './screens/EscrowScreen.js'

export default [
    // { path: "/", name: "Budgets", Component: BudgetScreen },
    { path: "/budgets", name: "Budgets", Component: BudgetScreen },
    { path: "/budgets/:budgetId", name: "Budget Details", Component: BudgetDetailsScreen },
    { path: "/budgets/:budgetId/items/:itemId", name: "Item Details", Component: ItemDetailsScreen },
    { path: "/transactions", name: "Transactions", Component: TransactionScreen },
    { path: "/categories", name: "Categories", Component: CategoryScreen },
    { path: "/goals", name: "Goals", Component: GoalScreen },
    { path: "/escrow", name: "Escrow Account", Component: EscrowScreen },
]