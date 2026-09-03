import { defineMiddleware } from "astro:middleware";
import { verifySession } from "./auth/dal";

export const onRequest = defineMiddleware( async (cxt, next) => {
    const { pathname } = cxt.url
    const isAdminRoute = pathname.startsWith('/admin')
    const isOrderRoute = pathname.startsWith('/admin')
  
    const isProtected = isAdminRoute || isOrderRoute

    if(!isProtected) return next();

   const token = cxt.cookies.get('FRESHCOFFEE_TOKEN')?.value ?? ''
   const { user } = await verifySession(token)
   if(!user) {
    return Response.redirect(new URL('/', cxt.url), 302)
   }


   const { role } = user

   if(role === 'freshcoffee_customer') {



    if(isAdminRoute) {

        cxt.cookies.delete('FRESHCOFFEE_TOKEN', {
            path: '/'
        })
      return Response.redirect(new URL('/', cxt.url), 302)   

    }
    return next()
   }

   
  return new Response('Rol no Vailido', {status: 403})  

})