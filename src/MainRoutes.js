import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProduct from "./Components/AddProduct/AddProduct";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import EditProduct from "./Components/EditProduct/EditProduct";
import Home from "./Components/Home/Home";
import ProductDetails from "./Components/Products/ProductDetails";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/add" element={<AddProduct />} />
      <Route path="/edit" element={<EditProduct />} />
      <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
  );
};

export default MainRoutes;
