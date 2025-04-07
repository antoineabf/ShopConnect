import { SERVER_URL_AUTH } from "../config";

export function login_api(username, password) {
    return fetch(`${SERVER_URL_AUTH}/login`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        username: username,
        password: password,
        }),
    })
}