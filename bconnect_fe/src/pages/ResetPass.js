import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import './ResetPass.css'; 

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { reset_pass_api } from '../apis/reset_pass_api';
import { validateToken } from '../apis/validate_token_api';
toast.configure();

function ResetPass() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [token, setToken] = useState("");
  const [tokenVerified, setTokenVerified] = useState(false);
  const [done, setDone] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let navigate = useNavigate();

  const handleSubmit = () => {
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!")
      return;
    }

    reset_pass_api(token, password)
    .then((response) => {
        if (!response.ok) {
            toast.error(`Err. ${response.status}: Unable to reset password`);
            return null;
        }
        toast(`Password reset successful!`);
        navigate("/home");
        return response.json();
    });
  };

  useEffect(() => {
    setToken(searchParams.get("reset_token"));
    setTimeout(()=>{setDone(true);}, 500);
  }, [searchParams]);

  useEffect(() => {
    if (token == "" || !!done) return;
    validateToken(token, true).then((response) => {
        if (response != false) setTokenVerified(true);
        setDone(true);
    })
  }, [token]);
  
  return ( <>
    {
        (done && !tokenVerified) && <><br/><br/><h1>SHOP CONNECT</h1><h2 style={{"textAlign":"center"}}>Invalid Link!</h2></>
    }
    { tokenVerified &&
    <div className="reset-pass-container">
        <h1>SHOP CONNECT</h1>
      <div className="reset-pass-form">
        <h2>Reset Password</h2>
        <div className="form-item">
          <TextField
            fullWidth
            label="New Password"
            type="password"
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          />
        </div>
        <div className="form-item">
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={({ target: { value } }) => setConfirmPassword(value)}
          />
        </div>
        <Button
          className="reset-pass-button"
          variant="contained"
          onClick={handleSubmit}
        >
          Reset Password
        </Button>
      </div>
    </div>
    }</>
);
}

export default ResetPass;
