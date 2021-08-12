import BudgetScreen from './screens/BudgetScreen.js'
import BudgetDetailsScreen from './screens/BudgetDetailsScreen.js'
import ItemDetailsScreen from './screens/ItemDetailsScreen.js'

export default [
    { path: "/", name: "Budgets", Component: BudgetScreen },
    { path: "/budgets", name: "Budgets", Component: BudgetScreen },
    { path: "/budgets/:budgetId", name: "Budget Details", Component: BudgetDetailsScreen },
    { path: "/budgets/:budgetId/items/:itemId", name: "Item Details", Component: ItemDetailsScreen },
]