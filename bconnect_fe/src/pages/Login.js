import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import { TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import ForgotPasswordDialog from '../components/ForgotPasswordDialogue';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function Login() {
  const { token, login } = useContext(AuthContext);
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [forgotPass, setForgotPass] = useState(false);
  let [handlingForgot, setHandlingForgot] = useState(false);
  let navigate = useNavigate();

  const handleLogin = () => {
    console.log(username, password);
    login(username, password, ((bool) => {setForgotPass(bool); toast.error("Wrong username or password!")}))
    .then((resp) => {
      if (!resp) return;
      console.log("LOGIN");
      toast("Logged In!");
      navigate("/home");
    });
  };

  const handleForgot = async () => {
    setHandlingForgot(true);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <div className="form-item">
          <TextField
            fullWidth
            label="Username"
            type="text"
            value={username}
            onChange={({ target: { value } }) => setUsername(value)}
          />
        </div>

        <div className="form-item">
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          />
        </div>
        <div>
            Need an account? <Link to="/signup">Click Here</Link>
        </div>
        <Button
          className="login-button"
          variant="contained"
          onClick={handleLogin}
        >
          Login
        </Button>
      </div>
      { forgotPass &&
      <div>
        <a onClick={handleForgot}> <strong><u>Forgot Password?</u></strong></a>
      </div>}

      <ForgotPasswordDialog 
        open={Boolean(handlingForgot)}
        onClose={() => {setHandlingForgot(false);}}
      />
    </div>
  );
}

export default Login;