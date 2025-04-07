import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import './ForgotPasswordDialogue.css';
import { forgot_pass_api } from '../apis/forgot_pass_api';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function ForgotPasswordDialog({ open, onClose }) {
  const [email, setEmail] = useState('');

  const handleSendEmail = () => {
    forgot_pass_api(email)
    .then((response) => {
        if (!response.ok) {
            toast.error(`Err. ${response.status}: Failed to send reset link`);
            return null;
        }
        toast.success(`Success!`);
        return response.json();
    }).then((body) => {
        setEmail('');
        onClose();
    });
    
    
  };
  
  return (
    <Dialog open={open} onClose={onClose} className="dialog-container">
      <DialogTitle className="dialog-title">Forgot Password</DialogTitle>
      <DialogContent className="dialog-content">
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="email-input"
        />
      </DialogContent>
      <DialogActions className="dialog-actions">
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSendEmail} color="primary">
          Send Email
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ForgotPasswordDialog;
