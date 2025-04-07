import { SERVER_URL_PRODUCT } from "../config";

export const fetchMyCart = (userToken) => {
    return fetch(`${SERVER_URL_PRODUCT}/cart`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${userToken}`
      }});
}