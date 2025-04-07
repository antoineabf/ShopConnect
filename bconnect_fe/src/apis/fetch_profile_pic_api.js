import { SERVER_URL_USER } from "../config";

export async function fetchProfilePic(userId, setProfilePic) {
    try {
        const response = await fetch(`${SERVER_URL_USER}/getProfilePic/${userId}`)

        if (!response.ok) {
            console.error("Error fetching profile picture:", response.statusText);
            return; // Handle errors appropriately in the UI, like displaying a message
        }

        const data = await response.blob();
        const url = URL.createObjectURL(data);
        setProfilePic(url); // Update the profile picture URL
    } catch (error) {
        console.error("Error fetching profile picture:", error);
    }
}