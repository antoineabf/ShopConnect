import React, { useContext, useEffect, useState } from 'react';
import { fetch_product_img_api } from '../apis/fetch_product_img_api';
import { getInfo } from '../apis/get_profile_info_api';
import { handleAddToCart  } from '../apis/add_to_cart_api';
import { handleRemoveFromCart } from '../apis/remove_from_cart_api';
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import './ProductCard.css';
import { AuthContext } from '../AuthContext';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const ProductCard = ({ product, inCart }) => {
    const { token, role } = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const [seller, setSeller] = useState(null);
    const [isRemoved, setIsRemoved] = useState(false);

    useEffect(() => {
        if (!product || !product.seller_id) return;
        fetch_product_img_api(product.id, setImage, toast);
        getInfo(product.seller_id).then((body) => {
            if (!body) toast.error("Unable to fetch sellers");
            else setSeller(body.username);
        });
    }, [product]);

    const handleRemoveItem = () => {
        handleRemoveFromCart(token, product.id); 
        setIsRemoved(true);
        window.location.reload();
    };

    return (
        <div className="product-card-container">
            <div className="product-card">
                <div className="product-img-container">
                    <img src={image} alt="" className="product-img" />
                </div>
                <h3 className="product-name">
                    <u>{product.name}</u><br/>
                    {!!seller && <p style={{fontSize:"15px", textAlign:'right', paddingRight:"10px"}}><i>{seller}</i></p>}
                </h3>
                
                <div style={{flexDirection:"row", display:"flex", justifyContent:"space-between"}}>
                    <div className="product-details"> 
                        <p><strong>Price:</strong> ${product.price}</p>
                    </div>
                    {(!!token && (role === "buyer" || role === "seller")) && (
                        <>
                            {!inCart ? (
                                <div className="add-to-cart-button">
                                    <IconButton color="primary" onClick={() => handleAddToCart(token, product.id)}>
                                        <AddShoppingCartIcon />
                                    </IconButton>
                                </div>
                            ) : (
                                <div className="remove-from-cart-button">
                                    <IconButton color="secondary" onClick={handleRemoveItem}>
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                            )}
                        </>
                    )}
                </div>
                <div className="product-details"> 
                    <p><strong>Description:</strong> {product.description}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
