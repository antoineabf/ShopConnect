import { SERVER_URL_PRODUCT } from "../config";

export function add_product_api (userToken, name, description, price, stock, image) {

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("in_stock", stock);
    formData.append("product_pic", image);
console.log(formData);
    return fetch(`${SERVER_URL_PRODUCT}/products/create`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${userToken}`
        },
        body: formData,
    });
}
