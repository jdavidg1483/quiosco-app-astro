export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-Us', {
        style: 'currency',
        currency: 'USD'
    }).format(amount)
}

export function toLowerFirstChar(str: string) {
    return str.charAt(0).toLowerCase()
}