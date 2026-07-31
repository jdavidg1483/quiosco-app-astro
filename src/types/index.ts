import { z } from 'astro:content'
import { coerce } from 'node_modules/astro/dist/preferences';

const ImageSchema = z.object({
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
});

const FeaturedImageSchema = z.object({
  thumbnail: ImageSchema,
  medium: ImageSchema,
  medium_large: ImageSchema,
  large: ImageSchema,
  full: ImageSchema
});

const VariablePairSchema = z.object({
    price: z.coerce.number(),
    size: z.string()
})

export const VariablePriceSchema = z.object({
    variable_price: z.literal(true),
    small: VariablePairSchema,
    medium: VariablePairSchema,
    large: VariablePairSchema,
})

const FixedPriceSchema = z.object({
     variable_price: z.literal(false),
    price: z.coerce.number()
})

export const ProductPriceSchema = z.discriminatedUnion('variable_price',
    [VariablePriceSchema, FixedPriceSchema]
)

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

const ProductSchema = z.object({
    id: z.number(),
    slug: z.string(),
    title: z.object({
        rendered: z.string()
    }),
    featured_media: z.number(),
    featured_images: FeaturedImageSchema,
    acf: ProductPriceSchema
})

export const ProductsSchema = z.array(ProductSchema)
export type Product = z.infer<typeof ProductSchema>

const ProductWithVariableSchema = ProductSchema.extend({
    acf: VariablePriceSchema
})

export type ProductWithVariablePrice = z.infer<typeof ProductWithVariableSchema>