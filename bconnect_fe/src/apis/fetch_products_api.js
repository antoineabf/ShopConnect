import { SERVER_URL_PRODUCT } from "../config";

export function fetch_products_api(searchQuery, setProducts, toast) {
    return fetch(`${SERVER_URL_PRODUCT}/products?search=${searchQuery}`, {
        method: 'GET'
    }).then((response) => {
        console.log(response);
        if (!response.ok) return null;
        return response.json()
    }).then((body) => {
        if (!body) toast.error("Could Not fetch products");
        setProducts(body.products);
    });
}