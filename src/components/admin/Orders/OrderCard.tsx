import type { OrderContent } from "@/types";
import { formatCurrency } from "@/utils"; // ✅ Actualizado aquí
import { orderStatusOptions } from '@/utils/constants'
import { actions } from "astro:actions";
type Props = {
    order: OrderContent
}

export default function OrderCard({order}: Props) {

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value
       const { id } = order 
        await actions.orders.updateStatus({status, id})
    }
    
  return (
    <div className="p-5 shadow-lg space-y-5 border border-gray-200 ">
      <div className='text-sm grid grid-cols-2 justify-between text-gray-600'>
        <h2>ID Orden: <span className='font-black'>{order.id}</span></h2>
        <p className='text-right'>Cliente: {order.name} </p>
      </div>
      <div>
        Contenido: 
        <div dangerouslySetInnerHTML={{__html: order.contents}}></div>
      </div>

      <select onChange={handleChange} value={order.value} className='border border-gray-300 w-full p-2 text-center'>
          {orderStatusOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
      </select>

      <p className='text-right text-lg'>Total orden: 
        <span className='text-amber-400 font-black'>
            {formatCurrency(order.total)}
        </span>
      </p>
    </div>
  )
}
