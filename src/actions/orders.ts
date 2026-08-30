
import { verifySession } from "@/auth/dal";
import { OrderItemSchema } from "@/types";
import { calculateTotal, formatOrder } from "@/utils";
import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

export const orders = {
    createOrder: defineAction({
        accept: 'json',
        input: z.object({
           name: z.string().min(1, { message: 'El nombre es obligatorio'}),
           order: z.array(OrderItemSchema)
        }),
        handler: async (input, ctx) => {
           const token = ctx.cookies.get('FRESHCOFFEE_TOKEN')?.value
            if(!token) {
            throw new ActionError({
                message: 'Hubo un error al realizar la orden',
                code: 'BAD_REQUEST'
            })
           }
           const { user } = await verifySession(token)
           if(!user) {
            throw new ActionError({
                message: 'Hubo un error al realizar la orden',
                code: 'BAD_REQUEST'
            })
           }
         
         const content = formatOrder(input.order) 
         const total = calculateTotal(input.order)
         
         const res = await fetch(`${import.meta.env.PUBLIC_API_URL}/freshcoffee_order`, {
            method: 'POST',
           headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
           },
           body: JSON.stringify({
            title: `Orden de: ${input.name}`,
            content,
            status: 'publish',
            acf: {
               total,
               status: 'pending',
               name: input.name 
            }
           }) 
         })

         const { id } : { id:number } =  await res.json()
         return {  
            message: `Orden Creada Correctamente ID: ${id}` 
         }
         
        }
    })
}