COLUMNS = ['date', 'description', 'amount', 'category', 'label', 'notes', 'transaction_type', 'original_description', 'account', 'budget_category', 'source'];
placeholders = '';
for (i = 0; i < COLUMNS.length; i++) {
  placeholders += "?,";
}
placeholders = placeholders.slice(0, placeholders.length - 1);

const getColumns = () => {
    return COLUMNS
};

const getPlaceholders = () => {
    return placeholders;
}

module.exports = {
    getColumns: getColumns,
    getPlaceholders: getPlaceholders
}