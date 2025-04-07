
import { SERVER_URL_PRODUCT } from "../config";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export function handleRemoveFromCart(token, prod_id) {
    return fetch(`${SERVER_URL_PRODUCT}/cart/${prod_id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
    .then(response => {
        if (response.ok) {
            toast.success("Product removed successfully");
            
        } else if (response.status === 404){
            toast.error("Doesn't Exist!");
        } else {
            toast.error("Failed to remove from cart");
        }
    })
    .catch(error => {
        console.error('Error adding product to cart:', error);
        toast.error("An error occurred while adding product to cart");
    });
}