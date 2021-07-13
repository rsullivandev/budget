const validateCategoryId = (categoryId) => {
    if (/^[0-9]+$/.test(categoryId)) return true
    else return false
}

const validateBudgetHeaderId = (budgetHeaderId) => {
    if (/^[0-9]+$/.test(budgetHeaderId)) return true
    else return false
}

const validateBudgetItemId = (budgetItemId) => {
    if (/^[0-9]+$/.test(budgetItemId)) return true
    else return false
}

const validateAmount = (amount) => {
    if (/^[0-9]+$/.test(amount) || /^[0-9]+\.[0-9]+$/.test(amount)) return true
    else return false
}

const validateDate = (date) => {
    if (/^[0-9]{4}-[0-1][0-9]-[0-3][0-9]$/.test(date)) return true
    else return false
}

const validateCategoryName = (categoryName) => {
    if (/^[A-Za-z0-9]+$/.test(categoryName)) return true
    else return false
}

const validateDescription = (description) => {
    if (/^.*$/.test(description)) return true
    else return false
}

const validateType = (type) => {
    if (type === 'credit' || type === 'debit') return true
    else return false
}

const validateSource = (source) => {
    if (source === 'USBank' || source === 'Mint') return true
    else return false
}


module.exports = {
    validateCategoryId: validateCategoryId,
    validateBudgetHeaderId: validateBudgetHeaderId,
    validateBudgetItemId: validateBudgetItemId,
    validateAmount: validateAmount,
    validateDate: validateDate,
    validateCategoryName: validateCategoryName,
    validateDescription: validateDescription,
    validateType: validateType,
    validateSource: validateSource
}