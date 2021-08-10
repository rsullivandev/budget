export const budgetDateFormatter = (inputDate) => {
    const date = new Date(inputDate)
    return `${("0" + (date.getUTCMonth() + 1)).slice(-2)}/${date.getUTCFullYear()}` 
}

export const currencyFormatter = (inputAmount) => {
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })

    return formatter.format(inputAmount);

}