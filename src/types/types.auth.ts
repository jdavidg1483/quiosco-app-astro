import { z } from 'astro:content'

export const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    role: z.string()
})