import { SERVER_URL_AUTH } from "../config";

export function register_api(username, email, password) {
    return fetch(`${SERVER_URL_AUTH}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
        }),
    });
}