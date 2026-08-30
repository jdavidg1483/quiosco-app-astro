import { useOrderStore } from "@/stores/order"
import ProductDatails from "./ProductDatails"
import { calculateTotal, formatCurrency } from "@/utils"
import SubmitOrderForm from "./SubmitOrderForm"


export default function OrderContents() {
    const { order } = useOrderStore()

    const total = calculateTotal(order)
  return (
   <>
   {order.length === 0 ? 
   
   <p className="text-center my-10 text-xl">Sin pedidos en la Orden</p> : 
   
      <>
      <h2 className="text-2xl font-bold text-gray-900">Ajusta tu Pedido</h2>
      {order.map( item => {
         const key = item.size ? `${item.size}-${item.id}` : item.id
         return (
            <ProductDatails
              key={key}
              item={item}
             
            />
        )
      })}

      <h2 className="mt-5 text-2xl font-bold text-right">
            Total a pagar: {formatCurrency(total)}
      </h2>

      <SubmitOrderForm />
      </>
   }
     
   </>
  )
}

