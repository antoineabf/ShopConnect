import { SERVER_URL_AUTH } from "../config";

export function validateToken(userToken, isReset=false){
    
    return fetch(`${SERVER_URL_AUTH}/validate_token${isReset ? "?checkReset=true" : ""}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${userToken}`
    }})
    .then((response)=>{
        if (response.status !== 200) {
            return null;
        }
        return response.json();
    })
    .then((body) => {
        if (!body) return false;
        return body;
    });
}
