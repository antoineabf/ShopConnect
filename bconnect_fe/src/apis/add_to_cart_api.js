import { SERVER_URL_PRODUCT } from "../config";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function handleAddToCart (token, prod_id) {
    return fetch(`${SERVER_URL_PRODUCT}/cart/${prod_id}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
    .then(response => {
        if (response.ok) {
            toast.success("Product added to cart successfully");
        } else if (response.status === 409){
            toast.warning("Already Added!");
        } else {
            toast.error("Failed to add product to cart");
        }
    })
    .catch(error => {
        console.error('Error adding product to cart:', error);
        toast.error("An error occurred while adding product to cart");
    });
};

export {handleAddToCart};