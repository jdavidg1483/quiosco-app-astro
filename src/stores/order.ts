import type { OrderItem, Product, ProductWithVariablePrice, SelectedProduct } from '@/types'
import { toLowerFirstChar } from '@/utils'
import { create } from 'zustand'

type Store = {
    isOrderDrawerOpen: boolean
    toggleOrderDrawer: () => void
    order: OrderItem[]
    addItem: (produt: SelectedProduct) => void
    deleteItem: (product: OrderItem) => void
    increaseQuantity: (Product: OrderItem) => void
    decreaseQuantity: (Product: OrderItem) => void
    updateItemSize: (product: OrderItem, newSize: string) => Promise<void>
}

export const useOrderStore = create<Store>()((set, get) => ({
    isOrderDrawerOpen: false,
    toggleOrderDrawer: () => {
        set((state) => ({ isOrderDrawerOpen: !state.isOrderDrawerOpen }))
    },
    order: [],
    addItem: (product) => {
        const currentOrder = get().order
        const hasSize = Boolean(product.size)
        const key = hasSize ? `${product.id}-${toLowerFirstChar(product.size!)}` : undefined

        const isMatch = (item: OrderItem) => hasSize ? item.key === key : item.id === product.id
        const existingItem = currentOrder.find(isMatch)

        let order: OrderItem[]

        if (existingItem) {
            order = currentOrder.map(item =>
                isMatch(item)
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                        subtotal: item.price * (item.quantity + 1)
                    }
                    : item
            )
        } else {
            const newItem = {
                ...product,
                quantity: 1,
                subtotal: product.price,
                key
            }
            order = [...currentOrder, newItem]
        }

        set({ order })
    },

    deleteItem: (product) => {
        const order = get().order.filter(item =>
            product.key ? item.key !== product.key : item.id !== product.id
        )
        set({ order })
    },

    increaseQuantity: (product) => {
        const isMatch = (item: OrderItem) => product.key ? item.key === product.key : item.id === product.id

        const order = get().order.map(item =>
            isMatch(item)
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                    subtotal: item.price * (item.quantity + 1)
                }
                : item
        )
        set({ order })
    },

    decreaseQuantity: (product) => {
        const isMatch = (item: OrderItem) => product.key ? item.key === product.key : item.id === product.id

        const order = get().order.map(item => {
            if (isMatch(item)) {
                const newQuantity = item.quantity - 1
                if (newQuantity <= 0) return null 
                return {
                    ...item,
                    quantity: newQuantity,
                    subtotal: item.price * newQuantity
                }
            }
            return item
        }).filter(Boolean) as OrderItem[]

        set({ order })
    },

    updateItemSize: async (product, newSize) => {
        // 1. Validaciones iniciales
        if (!product.key || !newSize || product.size === newSize) return

        try {
            const res = await fetch(`/api/products/${product.id}`)
            const data = await res.json() as ProductWithVariablePrice

            const updateData = Object.values(data.acf)
                .filter((value): value is { size: string; price: number } =>
                    typeof value === 'object' &&
                    value !== null &&
                    'size' in value &&
                    'price' in value
                ).find(value => value.size === newSize)

            if (!updateData) return

            const currentOrder = get().order
            const newKey = `${product.id}-${toLowerFirstChar(newSize)}`

            // 2. Verificar si YA existe un elemento en el carrito con el NUEVO tamaño
            const existingTargetItem = currentOrder.find(item => item.key === newKey)

            let updatedOrder: OrderItem[]

            if (existingTargetItem) {
                // FUSIÓN: Sumamos cantidades y recalculamos con newQuantity
                updatedOrder = currentOrder
                    .filter(item => item.key !== product.key) // Eliminamos el origen
                    .map(item => {
                        if (item.key === newKey) {
                            const newQuantity = item.quantity + product.quantity
                            return {
                                ...item,
                                quantity: newQuantity,
                                price: updateData.price,
                                subtotal: newQuantity * updateData.price // ✅ CORREGIDO
                            }
                        }
                        return item
                    })
            } else {
                // ACTUALIZACIÓN SIMPLE
                updatedOrder = currentOrder.map(item => {
                    if (item.key === product.key) {
                        return {
                            ...item,
                            size: newSize,
                            key: newKey,
                            price: updateData.price,
                            subtotal: product.quantity * updateData.price // ✅ CORREGIDO
                        }
                    }
                    return item
                })
            }

            set({ order: updatedOrder })
        } catch (error) {
            console.error('Error actualizando el tamaño del producto:', error)
        }
    }
}))