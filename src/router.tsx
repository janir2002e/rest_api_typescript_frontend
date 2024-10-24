import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Products, {Loader as productsLoader, Action as updateAvailabilityAction } from "./views/Products";
import NewProduct, {Action as newProductAction} from "./layout/NewProduct";
import EditProduct, {Loader as editProductLoader, Action as editProductAction } from "./views/EditProduct";
import { Action as deleteProductAction } from "./components/ProductDetails";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: productsLoader,
                action: updateAvailabilityAction
            },
            {
                path: 'productos/nuevo',
                element: <NewProduct />,
                action: newProductAction
            },
            {
                path: 'productos/:id/editar', // ROA Pattern - Resource-Oriented design
                element: <EditProduct/>,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path: 'productos/:id/eliminar',
                action: deleteProductAction
            }
        ]
    }
])