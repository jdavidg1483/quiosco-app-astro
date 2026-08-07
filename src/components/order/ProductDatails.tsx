import { XCircleIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
import type { OrderItem } from "@/types"
import { formatCurrency } from '@/utils'


type Props = {
    item: OrderItem
}

export default function ProductDetails({item} : Props) {
  return (
    <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 mt-5 ">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <p className="text-xl font-bold">{item.name}</p>
          <button
            className='cursor-pointer'
            type="button"
            onClick={() => {}}
          >
            <XCircleIcon className="text-red-600 h-8 w-8" />
          </button>
        </div>
        <p className="text-2xl text-amber-500 font-black">
          {formatCurrency(item.price)}
        </p>

        <div className="flex justify-center gap-5 px-10 py-2 border border-gray-600 rounded-lg">
          <button
            type="button"
            onClick={() => {}}
            className='disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer'
          >
            <MinusIcon className="h-6 w-6" />
          </button>

          <p className="text-lg font-black ">
            {item.quantity}
          </p>

          <button
            type='button'
            onClick={() => {}}
            className="disabled:opacity-10 disabled:cursor-not-allowed cursor-pointer"
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>

        <p className='text-gray-800 font-bold text-right'>Subtotal: {''}
          <span className='font-normal'>{formatCurrency(item.subtotal)}</span>
        </p>
      </div>
    </div>
  )
}