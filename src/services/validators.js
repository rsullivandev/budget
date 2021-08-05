const { readdir } = require('fs/promises');


//TODO centralize error message in validators

const validateCategoryId = (categoryId) => {
    if (/^[0-9]+$/.test(categoryId)) return true
    else return false
}

const validateBalanceType = (balanceType) => {
    if (balanceType === "cash" || balanceType === "accrual" || balanceType === "goal") return true
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
    if (/^[0-9]{4}-[0-1][0-9]-[0-3][0-9]$/.test(date) || /^[0-9]{4}-[0-1][0-9]-[0-3][0-9]T[0-9]{2}:[0-9]{2}:[0-9]{3}Z$/) return true
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

const validateInputFile = async (files) => {
    const mintList = await readdir(`${__dirname}/../input/mint`);
    const usBankList = await readdir(`${__dirname}/../input/usbank`);

    let error = false;
    let fileDates = [];
    let date;

    files.forEach(file => {
        if (error) return false
        if (file.source === "usBank") {
            if (!usBankList.includes(file.file)) {
                error = true;
            } else {
                fileDates.push(file.file.slice(-8, -4))
            }
        } else if (file.source === "mint") {
            if (!mintList.includes(file.file)) {
                error = true;
            } else {
                fileDates.push(file.file.slice(-8, -4))
            }
        }





    })

    if (error) {
        return false
    }

    for (let i = 0; i < fileDates.length - 1; i++) {
        if (fileDates[i] !== fileDates[i + 1]) error = true;
    }

    if (error) {
        return false
    } else {
        return true
    }


}


module.exports = {
    validateCategoryId: validateCategoryId,
    validateBalanceType: validateBalanceType,
    validateBudgetHeaderId: validateBudgetHeaderId,
    validateBudgetItemId: validateBudgetItemId,
    validateAmount: validateAmount,
    validateDate: validateDate,
    validateCategoryName: validateCategoryName,
    validateDescription: validateDescription,
    validateType: validateType,
    validateSource: validateSource,
    validateInputFile: validateInputFile
}