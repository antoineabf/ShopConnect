import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { AuthContext } from "../AuthContext";
import { fetchTermsAndPolicies, uploadIdentification, agreeSellerTerms, requestMakeSeller } from "../apis/make_seller_apis";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./RequestToBecomeSeller.css"; // Import CSS file

toast.configure();

function RequestToBecomeSeller() {
    const { token, role } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [termsAndPolicies, setTermsAndPolicies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch terms and policies from backend API
        fetchTermsAndPolicies(setTermsAndPolicies);
    }, []);

    const handleFileSelect = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleSubmit = async () => {
        // Handle form submission here, e.g., send data to backend
        let response = await uploadIdentification(file, token);
        console.log(response);
        if (!response.ok) return toast.error("Unable to upload identification image!");
        let response2 = await agreeSellerTerms(token)
        if (!response2.ok) return toast.error("Requested Not Confirmed!");
        let response3 = await requestMakeSeller(token)
        if (!response3.ok) return toast.error("Unable to send request!");
        console.log("SENT!");
        toast.success("Request Sent Successfully!");
        
        navigate("/");
    };

    const handleAgree = () => {
        setOpenDialog(false);
        handleSubmit();
    };

    return (
        <div className="container">
        <div className="root">
            {(!!token && role === "buyer") ?
            <>
                <h1>Request to Become a Seller</h1>
                <form onSubmit={(e) => { e.preventDefault(); setOpenDialog(true); }} className="form">
                    <TextField
                        className="fileInput"
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        label="Upload Identification Image"
                        InputLabelProps={{ shrink: true }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!file}
                    >
                        Submit Request
                    </Button>
                </form>
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>Terms and Policies</DialogTitle>
                    <DialogContent>
                        {termsAndPolicies.map((data, index) => 
                            <p key={index}>{data}</p>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={handleAgree} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
            :
            <p>Please log in as a buyer to access this feature.</p>
            }
        </div>
        </div>
    );
}

export default RequestToBecomeSeller;
