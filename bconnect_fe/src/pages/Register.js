import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { register_api } from '../apis/register_api';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function Register() {
    const { login } = useContext(AuthContext);
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [email, setEmail] = useState("");

    let navigate = useNavigate();

    const handleRegister = () => {
        register_api(username, email, password)
        .then(async (response) => {
            var resp_json = await response.json();
            if (!response.ok) {
                toast.error(`Err. ${response.status}: ${resp_json.message}`);
                return null;
            }   
            toast("Registered Successfully!");
            login(username, password, (bool)=>{});
            navigate("/home");
            return resp_json
        });
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Register</h2>
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
                    label="Email"
                    type="email"
                    value={email}
                    onChange={({ target: { value } }) => setEmail(value)}
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

            <Button
                color="primary"
                variant="contained"
                onClick={() => handleRegister(username, password, email)}
            >
                Register
            </Button>
        </div>
        </div>
    );
}

export default Register;
