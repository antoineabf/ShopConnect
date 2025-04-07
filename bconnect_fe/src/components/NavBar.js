import { AppBar, Button, Toolbar, Typography, IconButton } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProfileDropdown from "./ProfileDropdown";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export function NavBar() {
    let { token, role, logout } = useContext(AuthContext);
    let navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    const handleCart = () => {
        navigate("/myCart");
    };

    const navHome = () => {
        navigate("/");
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={navHome} style={{cursor:"pointer"}}>
                    SHOPCONNECT
                </Typography>
                {token && (
                    <>
                        {(role === "buyer" || role === "seller") && <IconButton color="inherit" onClick={handleCart} style={{marginRight:"20px"}}>
                            <ShoppingCartIcon />
                        </IconButton>}
                        <ProfileDropdown onLogout={()=>{logout();navHome();}} />
                    </>
                )}
                {!token && (
                    <Button variant="contained" onClick={handleLogin}>Login</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}
