import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import AuthContextProvider from "./context/AuthContextProvider";
import ProductContextProvider from "./context/ProductContextProvider";
import MainRoutes from "./MainRoutes";

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <ProductContextProvider>
          <Navbar />
          <MainRoutes />
        </ProductContextProvider>
      </AuthContextProvider>
    </>
  );
};

export default App;
