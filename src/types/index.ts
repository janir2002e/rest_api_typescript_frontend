import { array, boolean, InferOutput, number, object, string} from "valibot";

export const DraftProductSchema = object({
    name: string(),
    price: number()
})

export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean()
})
// como experamos un arreglo de objetos hacemos lo siguiente
export const ProductsSchema = array(ProductSchema)

// creamos un nuevo type de acuerdo al schema 
export type Product = InferOutput<typeof  ProductSchema>