import { z } from 'astro:content'

 const CategorySchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
   acf: z.object({
    icon: z.preprocess(
        value => value === false ? "" : value,
        z.string()
    )
})
})

export const CategoriesSchema = z.array(CategorySchema)
export type Category = z.infer<typeof CategorySchema>