import { SERVER_URL_USER } from "../config";

export function updateBio(initialBioDesc, userToken){
    return fetch(`${SERVER_URL_USER}/editBio`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify({
          bio: initialBioDesc,
          }),
      });
}