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
    }),
    
    updateStatus: defineAction({
        accept: 'json',
        input: z.object({
            status: z.string(),
            id: z.number()
        }),
        handler: async (input, ctx) => {
           // 1. Validar permisos de administrador desde locals
           if(!ctx.locals.user || ctx.locals.user.role !== 'administrator') {
            throw new ActionError({
                message: 'No tienes permisos para realizar esta acción',
                code: 'UNAUTHORIZED'
            })
           }

           // 2. Obtener token de autenticación
           const token = ctx.cookies.get('FRESHCOFFEE_TOKEN')?.value
           if(!token) {
            throw new ActionError({
                message: 'Token de autenticación no encontrado',
                code: 'UNAUTHORIZED'
            })
           }

           // 3. Enviar actualización a la API REST
           const res = await fetch(`${import.meta.env.PUBLIC_API_URL}/freshcoffee_order/${input.id}`, {
               method: 'PUT', // WordPress REST API acepta POST o PUT para actualizaciones de CPT
               headers: {
                   'Authorization': `Bearer ${token}`,
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                   acf: {
                       status: input.status
                   }
               })
           })

           if(!res.ok) {
               throw new ActionError({
                   message: 'Hubo un error al actualizar la orden en la API',
                   code: 'BAD_REQUEST'
               })
           }

           return {
               message: 'Estado de la orden actualizado correctamente'
           }
        }
    })
}