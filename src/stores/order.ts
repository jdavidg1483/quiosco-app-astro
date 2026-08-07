import type { OrderItem, SelectedProduct } from '@/types'
import { create } from 'zustand'

type Store = {
    isOrderDrawerOpen: boolean
    toggleOrderDrawer: () => void
    order: OrderItem[]
    addItem: (produt : SelectedProduct) => void
}

export const useOrderStore = create<Store>()((set, get)=> ({
    isOrderDrawerOpen: false,
    toggleOrderDrawer: () => {
      set((state) => ({ isOrderDrawerOpen: !state.isOrderDrawerOpen}))  
    },
    order: [],
    addItem: (product) => {
        const currentOrder = get().order
        const newItem = {
            ...product,
            quantity: 1,
            subtotal: product.price
        }
        const order = [...currentOrder, newItem]
        set({order})
        console.log(get().order)
    }
}))