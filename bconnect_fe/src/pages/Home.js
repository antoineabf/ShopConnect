import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { validateToken } from '../apis/validate_token_api';
import { NavBar } from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import { fetch_products_api } from '../apis/fetch_products_api';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from '../components/SearchBar';
import './Home.css';
import { useNavigate } from 'react-router-dom';

toast.configure();

function Home() {
  const { token, logout, role } = useContext(AuthContext);
  const [products, setProducts] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [welcome, setWelcome] = useState(<p>Welcome to our platform!</p>);
  let navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    fetch_products_api(searchQuery, setProducts, toast)
      .finally(() => setLoading(false));
  }, [searchQuery]);

  useEffect(() => {
    const tokenValidationTimeout = setTimeout(() => {
      validateToken(token).then((valid) => {
        if (!valid)
          handleLogout();
      });
    }, 100);
    
    return () => clearTimeout(tokenValidationTimeout);
  }, [token]);

  const renderWelcomeText = () => {
    switch(role) {
      case 'buyer':
        return <p>Welcome, Buyer! <br/>Explore our amazing products.</p>;
      case 'seller':
        return <p>Welcome, Seller! <br/>Manage your products here.</p>;
      case 'support':
        return <p>Welcome, Support Team! <br/>Help our customers with their queries.</p>;
      case 'admin':
        return <p>Welcome, Admin! <br/>Manage the platform with ease.</p>;
      default:
        return <p>Welcome to our platform!</p>;
    }
  };

  useEffect(() => {
    setWelcome(renderWelcomeText());
  }, [role]);

  const handleCreateProduct = () => {
    // Implement create product functionality here
    // This function should only be accessible to logged-in sellers
    navigate('/add_product');
  };

  return (
    <>
      <div className="upper-section">
        <div className="upper-section-content">
          <div className="welcome-message">{welcome}</div>
        </div>
      </div>
      <div>
        <NavBar />
        <SearchBar handleSearch={(query) => setSearchQuery(query)} />
        <div className="main-content">
          {loading && <p>Loading...</p>}
          {!loading && products.length === 0 && <p>No results found.</p>}
          {products.length > 0 && <p>{products.length} {products.length === 1 ? 'result' : 'results'} found.</p>}
          <div className="product-container">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {products.length < 4 && Array.from({ length: 4 - products.length }).map((_, index) => (
              <div key={index} className="empty-product"></div>
            ))}
          </div>
        </div>
      </div>
      {role === 'seller' && (
        <button className="create-product-button" onClick={handleCreateProduct}><strong>Add Product</strong></button>
      )}
      <footer>
        <div className="footer-content">
          <p>Contact us at: <a style={{"color":"#ffffff"}} href="mailto:shop.connect.reply@gmail.com"><i>shop.connect.reply@gmail.com</i></a></p>
          <p>Copyright © 2024 ShopConnect. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Home;
