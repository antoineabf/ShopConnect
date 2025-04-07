import { SERVER_URL_USER } from "../config";

export const sendProfilePicData = (file, user_id, token) => {
    // Prepare the data to send (e.g., user ID, image data as base64)
    const formData = new FormData();
    formData.append("profile_pic", file);
    formData.append("user_id", user_id); // Replace with your way to get user ID
  
    return fetch(`${SERVER_URL_USER}/uploadProfilePic`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  };