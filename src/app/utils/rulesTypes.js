export const connectorRulesTypes = [
    { value: "currency", label: "Currency" },
    { value: "amount", label: "Amount" },
    { value: "country", label: "Country" },
    { value: "card_type", label: "Card Type" },
];

export const currencyTypeConditions = [
    { value: "==", label: "=" },
    { value: "in", label: "In" },
    { value: "not in", label: "Not In" },
];

export const cardTypeConditions = [
    { value: 1, label: "AMEX" },
    { value: 2, label: "VISA" },
    { value: 3, label: "Master Card" },
    { value: 4, label: "Discover" },
    { value: 5, label: "JCB" },
    { value: 6, label: "Maestro" },
    { value: 7, label: "Switch" },
    { value: 8, label: "Solo" },
    { value: 9, label: "Union Pay" },
];

export const amountTypeConditions = [
    { value: "==", label: "=" },
    { value: "<=", label: "<=" },
    { value: ">=", label: ">=" },
    { value: "<", label: "<" },
    { value: ">", label: ">" },
];
