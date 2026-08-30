// DATA ACCESS LAYER

import { userSchema } from "@/types/types.auth";

export const guestCredentials = {
  username: import.meta.env.GUEST_USER,
  password: import.meta.env.GUEST_PASSWORD,
};

export const verifySession = async (token: string) => {
  if (!token) return { user: null };

  const apiUrl = import.meta.env.PUBLIC_API_URL;

  if (!apiUrl) {
    console.error("PUBLIC_API_URL no está definida en las variables de entorno.");
    return { user: null };
  }

  try {
    const res = await fetch(`${apiUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`, // 👈 Espacio agregado entre Bearer y ${token}
      },
    });

    if (!res.ok) {
      return { user: null };
    }

    const json = await res.json();
    const user = userSchema.safeParse(json);

    if (!user.success) {
      console.error("Error al validar esquema de usuario:", user.error);
      return { user: null };
    }

    return {
      user: user.data,
    };
  } catch (error) {
    console.error("Error en verifySession:", error);
    return { user: null };
  }
};