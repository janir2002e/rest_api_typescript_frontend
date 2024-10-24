export function formatCurrency(amount: number){
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount)
}

export function toBoolean(str: string) {
    return str.toLowerCase() === "true" // convierte el string a un boolean si es true o false 
    // tambien convierte el texto a minuscula
}