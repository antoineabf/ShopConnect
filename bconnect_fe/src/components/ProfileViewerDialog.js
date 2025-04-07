import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom"; // Import useHistory hook for navigation
import "./ProfileViewerDialog.css";
import { sendProfilePicData } from "../apis/send_profile_pic_api";
import { AuthContext } from "../AuthContext";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export default function ProfileViewerDialog({
  open,
  onSubmit,
  onClose,
  title,
  initialUsername,
  initialBioDesc,
  initialProfilePic,
  onUpdateProfilePic,
  hasSentRequestToBecomeSeller,
}) {
  const { token, user_id, role } = useContext(AuthContext);
  const [modifiedBio, setBio2] = useState("");
  const [editing, setEditing] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState(initialProfilePic);
  const navigate = useNavigate(); // Initialize useHistory

  useEffect(() => {
    setProfilePicUrl(initialProfilePic);
  }, [initialProfilePic]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setNewProfilePic(file);
    setProfilePicUrl(URL.createObjectURL(file));
    onUpdateProfilePic(URL.createObjectURL(file));
    sendProfilePicData(file, user_id, token).then((response) => {
      if (!response.ok) toast.error(`Err. ${response.status}: Unsuccessful`);
      else toast.success("Success!");
    });
  };

  const handleRequestToBecomeSeller = () => {
    // Navigate to the request to become seller page
    navigate("/request-to-become-seller");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <div className="dialog-container">
        <DialogTitle>{title}</DialogTitle>
        <div className="form-item">
          <Tooltip title="Upload/Edit picture" placement="top">
            <Avatar
              alt={initialUsername}
              src={profilePicUrl}
              onClick={() => document.getElementById("profilePicInput").click()}
              style={{ width: 75, height: 75, margin: "0 auto" }}
            />
          </Tooltip>
          <input
            type="file"
            id="profilePicInput"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
        </div>
        <div className="form-item">
          <Typography>Username: {initialUsername}</Typography>
        </div>

        <div
          className="form-item"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {editing ? (
            <>
              <TextField
                fullWidth
                type="text"
                onChange={({ target: { value } }) => setBio2(value)}
              />
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  onSubmit(modifiedBio, token);
                  setEditing(false);
                }}
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <Typography>Description: {initialBioDesc}</Typography>
              <Button onClick={() => setEditing(true)}>
                <EditIcon />
              </Button>
            </>
          )}
        </div>

        {/* Conditional rendering of the button for requesting to become a seller */}
        {role === "buyer" && !hasSentRequestToBecomeSeller && (
          <div className="form-item">
            <Button
              color="primary"
              variant="contained"
              onClick={handleRequestToBecomeSeller}
            >
              Request to become a seller
            </Button>
          </div>
        )}
      </div>
    </Dialog>
  );
}
