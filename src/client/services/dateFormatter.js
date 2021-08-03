export const budgetDateFormatter = (inputDate) => {
    const date = new Date(inputDate)
    return `${("0" + (date.getUTCMonth() + 1)).slice(-2)}/${date.getUTCFullYear()}` 
}