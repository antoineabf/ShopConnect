import { SERVER_URL_PRODUCT } from "../config";

export function fetch_product_img_api(product_id, setProductImage, toast) {
    return fetch(`${SERVER_URL_PRODUCT}/products/image/${product_id}`, {
        method: 'GET'
    }).then((response) => {
        if (!response.ok) return null;
        return response.blob()
    }).then((body) => {
        if (!body) {setProductImage("https://marketplace.control-webpanel.com/assets/corals/images/default_product_image.png");return;}
        const url = URL.createObjectURL(body);
        setProductImage(url);
    });
}