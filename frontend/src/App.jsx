import React from 'react';
import CreateProduct from './components/Create-Product/CreateProduct';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Create-Product/Dashboard';
import CheckOut from './components/Create-Product/CheckOut';
import AddtoCart from './components/Create-Product/AddtoCart';
import UpdateProduct from './components/Create-Product/UpdateProduct';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/add-to-cart" element={<AddtoCart />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/add-to-cart/:slug" element={<UpdateProduct/>} />

      </Routes>
    </>
  );
}

export default App;
