import { useContext, useEffect, useState } from "react";
import { updateBio } from "../apis/update_bio_api";
import { getInfo } from "../apis/get_profile_info_api";
import { AuthContext } from "../AuthContext";
import ProfileViewerDialog from "./ProfileViewerDialog";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export function ProfileView({viewing, setViewing, profile_pic, setPic}) {
    let { user_id } = useContext(AuthContext);
    let [username, setUsername] = useState("");
    let [bio_desc, setBio] = useState("");
    
    const fetchInfo = () => {
        console.log(user_id);
        getInfo(user_id)
        .then(data => {
            if (!data) return;
            setUsername(data["username"] !== null ? data["username"] : "");
            setBio(data["bio"] !== null ? data["bio"] : "");
        });
    }

    const updateProfile = (desc, token) => {updateBio(desc, token)
        .then(()=>{
            setBio(desc);
            fetchInfo();
            toast.success("Profile Updated Successfully!");
        });
    }

    useEffect(() => {
        fetchInfo();
    }, [user_id]);

    return (
        <>
        <ProfileViewerDialog
            open={Boolean(viewing)}
            title="Profile"
            onClose={() => {setViewing(false);}}
            onSubmit={updateProfile}
            initialUsername={username}
            initialBioDesc={bio_desc}
            initialProfilePic={profile_pic}
            onUpdateProfilePic={setPic}
        />
        </>
    );
}