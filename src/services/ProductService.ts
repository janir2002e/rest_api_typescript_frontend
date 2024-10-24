import { safeParse, number, pipe, string, transform, parse } from "valibot";
import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from "../types";
import axios from "axios";
import { toBoolean } from "../utils";

type ProductData = {
    [k: string]: FormDataEntryValue;
}
export async function addProduct(data: ProductData) {
   try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        //console.log(result)

        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products` // ur a la cual le enviamos el request con los datos
            // le decimos la url y el type de cada campo con los valores gracias a valibot que crea un nuevo objeto
            //const {data} = await axios.post(url, { // si quieres ver lo que la respuesta
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
            
            // respuesta que retorna la api en el backend
            //console.log(data)
        } else {
            throw new Error('Datos no válidos')
        }
   } catch (error) {
        console.log(error)
   }
}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const {data} = await axios(url)
        // entra a data y valida que los datos cumplan con el type del schema y mapea
        const result = safeParse(ProductsSchema, data.data)
        if(result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }
        //console.log(result)
    } catch (error) {
        console.log(error)
    }
}


export async function getProductsById(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const {data} = await axios(url)
        const result = safeParse(ProductSchema, data.data)
        //console.log(result)
        if(result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }
        //console.log(result)
    } catch (error) {
        console.log(error)
    }
}

export async function updateProduct(data : ProductData, id: Product['id']){
    try {
        const NumberSchema = pipe(string(), transform(Number), number()); // forma de tranformar datos con valibot

        const result = safeParse(ProductSchema, {
            id, 
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: toBoolean(data.availability.toString()) // se manda la disponiblidad para que se convierta en un type valido
        })
        //console.log(result)
        // mandamos la informacion ya typada al backend para actualizar
        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, result.output)
        }
            
    } catch (error) {
        console.log(error)
    }
}

export async function deleteProduct(id: Product['id']) {

    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)  
    }
    
}

export async function updateProductAvailability(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }
}