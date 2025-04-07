import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import { NavBar } from '../components/NavBar';
import { Container, Typography, Button, Grid } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { fetchMyCart } from '../apis/fetch_my_cart_api';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();


function MyCart() {
    const { token, role } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);

    
    useEffect(() => {
        fetchMyCart(token).then((resp) => {
            if (!resp.ok) {toast.error("Unable to fetch cart!"); return null;}
            return resp.json();
        }).then((body) => {
            if (!body) return;
            setCartItems(body);
        });
        
    }, []);

    return (
        <>{!!token && (role === "buyer" || role === "seller") &&
            <>
            <NavBar />
            <Container sx={{ marginTop: 4 }}>
                <Typography variant="h4" gutterBottom>
                    My Cart
                </Typography>
                {cartItems.length === 0 ? (
                    <Typography variant="body1">
                        Your cart is empty.
                    </Typography>
                ) : (
                    <Grid container spacing={2}>
                        {cartItems.map((item) => (
                            <ProductCard product={item} inCart={true}/>
                        ))}
                    </Grid>
                )}
            </Container>
            <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"center", marginTop: "6vw"}}>
                <Button
                color="primary"
                variant="contained"
              >Proceed to CheckOut</Button>
            </div>
            
            </>
        }
        </>
    );
}

export default MyCart;
