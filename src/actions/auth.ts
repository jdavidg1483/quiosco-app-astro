import { guestCredentials } from "@/auth/dal";
import { nullToEmptyString } from "@/utils";
import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:content";

export const auth = {
  signInAsGuest: defineAction({
    handler: async (_input, ctx) => {
      // Usar PUBLIC_AUTH_URL o la variable exacta configurada en tu .env
      const authUrl = import.meta.env.PUBLIC_AUTH_URL || import.meta.env.AUTH_URL;

      if (!authUrl) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "La URL de autenticación no está configurada en las variables de entorno.",
        });
      }

      const res = await fetch(authUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(guestCredentials),
      });

      const json = await res.json();

      if (!res.ok || !json.token) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: json.message || "Error al autenticar con WordPress.",
        });
      }

      // Seteo de la cookie HttpOnly
      ctx.cookies.set("FRESHCOFFEE_TOKEN", json.token, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 2, // 2 días
      });

      return { success: true };
    },
  }),

  sigIn: defineAction({
   accept: 'form',
    input: z.object({
      username: z.preprocess(
        nullToEmptyString,
        z.string().min(1, {message: 'El usuario no puede ir vacio'})
      ),

      password: z.preprocess(
        nullToEmptyString,
        z.string().min(1, {message: 'El password no puede ir vacio'})
      )
    }),
   handler: async (Input, ctx) =>{
    const res = await fetch(import.meta.env.PUBLIC_AUTH_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(Input)
    })
    const data = await res.json()

    if(data.code === '[jwt_auth] invalid_username') {
      throw new ActionError({
        message: 'El Usuario no existe',
        code: 'UNAUTHORIZED'
      })
    }

       if(data.code === '[jwt_auth] incorrect_password') {
      throw new ActionError({
        message: 'Password Incorrecto',
        code: 'UNAUTHORIZED'
      })
    }
   
   
    


    ctx.cookies.set('FRESHCOFFEE_TOKEN', data.token, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 2, // 2 días
      
    })
   
    return true

   }
  }),

 signOut: defineAction({
    handler: async (_input, ctx) => {
      // Elimina la cookie expirándola de inmediato
      ctx.cookies.delete("FRESHCOFFEE_TOKEN", {
        path: "/",
      });

      return { success: true };
    },
  }),
};