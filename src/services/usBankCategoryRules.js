const applyUSBankCategoryRules = (element) => {
    if(element.Name.includes("VANGUARD BUY")) return "Amortized"

    if(element.Name.includes("VENMO") && element.Amount.includes("-125.00")) return "HouseCleaning"
    if(element.Name.includes("VENMO")) return "ShoppingBudget"
    if(element.Name.includes("IOWA STATE ED AS")) return "UnionDues"
    if(element.Name.includes("CHECK") && element.Amount.includes("-95.00")) return 'Amortized'
    if(element.Name.includes("MONTHLY MAINTENANCE FEE")) return "Miscellaneous"
    if(element.Name.includes("SALES TAX")) return "Miscellaneous"
    if(element.Transaction.includes("CREDIT")) return "Income"
    else return "Miscellaneous"
}
exports.applyUSBankCategoryRules = applyUSBankCategoryRules;