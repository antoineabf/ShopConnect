import { SERVER_URL_AUTH } from "../config";

export function reset_pass_api(userToken, password) {
    return fetch(`${SERVER_URL_AUTH}/reset_pass`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${userToken}`
    },
    body: JSON.stringify({
        password: password,
        }),
    });
}