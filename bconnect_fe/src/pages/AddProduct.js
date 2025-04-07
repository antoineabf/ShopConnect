import React, { useContext, useState } from 'react';
import './AddProduct.css';
import { add_product_api } from '../apis/add_product_api';
import { AuthContext } from '../AuthContext';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
toast.configure();

function AddProduct() {
    let { token, role } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    

    const handleSubmit = (event) => {
        event.preventDefault();
        
        add_product_api(token, name, description, price, stock, image).then((response) => {
            if (!response.ok) toast.error(`Err. ${response.status}: ${response.message}` );
            else{ 
                toast.success("Successfully added product!");
                navigate("/");
            }
        });
    };

    return (
        <>
        {(!!token && role === "seller") ?
        <div className="container">
        <div className="add-product-container">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="name">Product Name:</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            ></textarea>
            </div>
            <div className="form-group">
            <label htmlFor="price">Price ($):</label>
            <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="stock">Number in Stock:</label>
            <input
                type="number"
                id="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="image">Product Image:</label>
            <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
            />
            </div>
            <button type="submit">Add Product</button>
        </form>
        </div>
        </div>
        :
        <><br/><br/><h1>SHOP CONNECT</h1><h2 style={{"textAlign":"center"}}>401. Unauthorized Access.</h2></>
        }
        </>
        
  );
}

export default AddProduct;
