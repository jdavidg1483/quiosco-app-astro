import type { OrderItem } from "@/types"

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

export function toLowerFirstChar(str: string) {
  if (!str) return str
  return str.charAt(0).toLowerCase() + str.slice(1)
}

export const calculateTotal = (order: OrderItem[]) => 
  order.reduce((total, item) => total + (item.quantity * item.price), 0)

export function formatOrder(order: OrderItem[]): string {
  // Envolvemos los elementos en una lista <ul> funcional para WordPress
  const listItems = order
    .map(item => {
      const sizeText = item.size ? ` (${item.size})` : ''
      return `<li><span class="font-bold">${item.quantity}x</span> ${item.name}${sizeText} - ${formatCurrency(item.price)}</li>`
    })
    .join('')

  return `<ul>${listItems}</ul>`
}

export function nullToEmptyString(arg: unknown) {
  return arg ?? ''
}