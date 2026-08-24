import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useOrderStore } from '@/stores/order'

export default function ShowOrderButton() {
    const { toggleOrderDrawer, order } = useOrderStore()

    const totalItems = order.reduce((total, item) => total + item.quantity, 0)

    return (
        <button 
            type="button"
            className="relative flex items-center gap-2 cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={toggleOrderDrawer}
            aria-label="Ver orden"
        >
            <ShoppingCartIcon className="w-7 h-7 text-gray-800" />
            
            {totalItems > 0 && (
                <span className="bg-amber-500 text-white font-bold text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center">
                    {totalItems}
                </span>
            )}
        </button>
    )
}