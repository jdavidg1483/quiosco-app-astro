import { ShoppingBagIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useOrderStore } from'@/stores/order'
export default function ShowOrderButton() {
    const {toggleOrderDrawer, order } = useOrderStore()

    const totalItems = order.reduce((total, item) => total + item.quantity ,0)
  return (
   <button 
    type='button'
    className='cursor-pointer p-4'
    onClick={ toggleOrderDrawer}
    
   >

    
    <ShoppingCartIcon className='size-8 text-gray-800 flex items-center gap-3' />
       {totalItems}
   </button>
  )
}


