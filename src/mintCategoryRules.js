const applyCategoryRules = (element) => {
    
    //Budgets (Food, Shopping and Baby)
    if(element.Category == 'Groceries' || element.Category == 'Fast Food' || element.Category == 'Restaurants') return 'FoodBudget';
    
    else if(element.Category == 'Shopping' || element.Category == 'Home Improvement' 
    || element.Category == 'Furnishings' || element.Category == 'Gift' 
    || element.Category == 'Home Supplies' || element.Category == 'Pet Food & Supplies' 
    || element.Category == 'Clothing' || element.Category == 'Hobbies' || element.Category == "Gas & Fuel") return 'ShoppingBudget';
    
    else if(element.Category == 'Baby Supplies') return "BabySuppliesBudget"

    //Bills
    else if(element.Category == 'Mortgage & Rent') return 'Mortgage';
    else if(element.Category == 'Babysitter & Daycare') return 'ChildCare';
    else if(element.Category == 'Auto Payment') return 'AutoPayment';
    else if(element.Category == 'Television') return 'Television';
    else if(element.Category == 'Energy') return 'Energy';
    else if(element.Category == 'Home Services') return 'HouseCleaning';
    else if(element.Category == 'Union Dues') return 'UnionDues';
    else if(element.Category == 'Mobile Phone') return 'Phone';
    else if(element.Category == 'Auto Insurance' && Math.abs(element.Amount) < 100) return 'AutoInsuranceRob';
    else if(element.Category == 'Internet') return 'Internet';
    else if(element.Category == 'Gym') return 'Gym';
    else if(element.Category == 'Water') return 'Water';
    else if(element.Category == 'Entertainment') return 'Entertainment';

    //Income
    else if(element.TransactionType == 'credit') return 'Income'

    //Periodic / Amortized
    else if(element.Category == 'Utilities' || element.Category == 'Auto Insurance' ||
    element.Category.includes("Registration") || element.Category == 'Hair' ||
    element.Category.includes('Pet') || element.Category == "Veterinarian" || element.Category == "Auto Service" ||
    element.Category == "Amazon Prime" || element.Category == "Ring Insurance"||
    element.Category == "Apple Developer Account" || element.Category == "Xbox" ||
    element.Category == "IRA - Ashley") return 'Amortized';

    else return "Miscellaneous"
}
exports.applyCategoryRules = applyCategoryRules;