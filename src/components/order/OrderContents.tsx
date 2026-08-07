import { useOrderStore } from "@/stores/order"
import ProductDatails from "./ProductDatails"


export default function OrderContents() {
    const { order } = useOrderStore()
  return (
   <>
   {order.length === 0 ? 
   
   <p className="text-center my-10 text-xl">Sin pedidos en la Orden</p> : 
   
      <>
      <h2 className="text-2xl font-bold text-gray-900">Ajusta tu Pedido</h2>
      {order.map( item => {

        return (
            <ProductDatails
             item={item}
             
            />
        )
      })}
      </>
   }
     
   </>
  )
}

