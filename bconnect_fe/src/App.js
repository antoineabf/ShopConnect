import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Home from './pages/Home.js';
import ResetPass from './pages/ResetPass.js';
import AddProduct from './pages/AddProduct';
import MyCart from './pages/MyCart';
import RequestToBecomeSeller from './components/RequestToBecomeSeller.js';
import Admin from './pages/Admin.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Register/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/reset_pass" element={<ResetPass/>} />
        <Route path="/add_product" element={<AddProduct/>} />
        <Route path="/mycart" element={<MyCart/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/request-to-become-seller" element={<RequestToBecomeSeller/>} />
        <Route
            path="*"
            element={<Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;