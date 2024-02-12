export function formatCurrency(value: number, currency = 'BRL') {
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
    });
    return formatter.format(value);
}
