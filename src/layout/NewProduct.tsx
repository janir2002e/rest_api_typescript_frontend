import { ActionFunctionArgs, Form, Link, redirect, useActionData } from "react-router-dom";
import ErrorMesssage from "../components/ErrorMesssage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

export async function Action({request} : ActionFunctionArgs) {
  // obtener los datos que envimos en el formulario con formData()
  // para ello con fromEntries para obtener los datos como un objeto
  const data = Object.fromEntries(await request.formData())

  // console.log(data)
  let error = ''
  if(Object.values(data).includes('')){
    error = 'Todos los campos son obligatorios'
  }

  if(error.length){
    return error
  }

  await addProduct(data)
  
  return redirect('/')
}

export default function NewProduct() {

  const error = useActionData() as string// hace disponible el error que esta por fuera de la funcion

  //console.log(error)

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">
          Registrar Producto
        </h2>
        <Link
          to="/"
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Volver a Productos
        </Link>
      </div>

      {error && <ErrorMesssage>{error}</ErrorMesssage>}

      <Form // al revisir un submit se ejecuta la accion o funcion que esta en el router
        className="mt-10"
        method="POST"
      >
        <ProductForm />
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
}
