export const budgetDateFormatter = (inputDate) => {
    const date = new Date(inputDate)
    return `${("0" + (date.getUTCMonth() + 1)).slice(-2)}/${date.getUTCFullYear()}` 
}

export const currencyFormatter = (inputAmount) => {
    //TODO - add comma separator for 1,000s
    return (Math.round(inputAmount * 100) / 100).toFixed(2);
}