import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { UploadImageSchema } from "@/types"; // Asumiendo que tu schema está en src/types

export const upload = {
  uploadImage: defineAction({
    accept: 'form',
    // 1. Validamos que el formulario contenga un campo 'file' tipo File
    input: z.object({
      file: z.instanceof(File, { message: "Debes seleccionar una imagen válida" }),
    }),
    handler: async (input, ctx) => {
      const token = ctx.cookies.get('FRESHCOFFEE_TOKEN')?.value;

      if (!token) {
        throw new ActionError({
          message: 'Sesión no válida o expirada',
          code: 'UNAUTHORIZED',
        });
      }

      // 2. Preparamos el FormData explícito que requiere WordPress
      const formData = new FormData();
      formData.append('file', input.file);

      const url = `${import.meta.env.PUBLIC_API_URL}/media`;

      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => null);
          console.error("Error respuesta WordPress:", errorData);

          throw new ActionError({
            message: errorData?.message || 'Hubo un error al subir la imagen a WordPress',
            code: 'BAD_REQUEST',
          });
        }

        const json = await res.json();
        
        // 3. Validamos la respuesta recibida con Zod
        return UploadImageSchema.parse(json);

      } catch (error) {
        if (error instanceof ActionError) throw error;

        throw new ActionError({
          message: 'Error de conexión con el servidor',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
    },
  }),
};