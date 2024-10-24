import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import ErrorMesssage from "../components/ErrorMesssage";
import { getProductsById, updateProduct } from "../services/ProductService";
import { Product } from "../types";
import ProductForm from "../components/ProductForm";

export async function Loader({ params }: LoaderFunctionArgs) {
  // primero consultamos el id al backen por medio de la funcion que obtene el producto expecifico
  if (params.id !== undefined) {
    // pasamos el id como un numero a la funcion
    const product = await getProductsById(+params.id);
    //console.log(product)
    if (!product) {
      return redirect("/");
    }
    // si exite retorna el objeto del producto que trajo la funtion
    return product;
  }
}

export async function Action({ request, params }: ActionFunctionArgs) {
  // obtener los datos que envimos en el formulario con formData()
  // para ello con fromEntries para obtener los datos como un objeto
  const data = Object.fromEntries(await request.formData());

  // console.log(data)
  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }

  if (error.length) {
    return error;
  }

  if (params.id !== undefined) {
    await updateProduct(data, +params.id);

    return redirect("/");
  }
}

const availabilityOptions = [
  { name: "Disponible", value: true },
  { name: "No Disponible", value: false },
];

export default function EditProduct() {
  const product = useLoaderData() as Product;
  const error = useActionData() as string; // hace disponible el error que esta por fuera de la funcion
  //const {state} = useLocation() // useLocation importar si se usa de esta forma al actualizar
  //console.log(state)

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>
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
        <ProductForm 
            product={product}
        />

        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Disponibilidad:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Guardar Cambios"
        />
      </Form>
    </>
  );
}
