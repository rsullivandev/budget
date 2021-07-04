const validateCategoryId = (categoryId) => {
    if (/^[0-9]+$/.test(categoryId)) return true
    else return false
}

const validateBudgetHeaderId = (budgetHeaderId) => {
    if (/^[0-9]+$/.test(budgetHeaderId)) return true
    else return false
}

const validatePlannedAmount = (plannedAmount) => {
    if (/^[0-9]+$/.test(plannedAmount) || /^[0-9]+\.[0-9]+$/.test(plannedAmount))  return true
    else return false
}

const validateDate = (date) => {
    if (/^[0-9]{4}-[0-1][0-9]-[0-3][0-9]$/.test(date)) return true
    else return false
}

module.exports = {
    validateCategoryId: validateCategoryId,
    validateBudgetHeaderId: validateBudgetHeaderId,
    validatePlannedAmount: validatePlannedAmount,
    validateDate: validateDate
}