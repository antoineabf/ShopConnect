import { SERVER_URL_AUTH } from "../config";

export function forgot_pass_api(email) {
    return fetch(`${SERVER_URL_AUTH}/forgot_pass/${email}`, 
    {method: "POST"})
}