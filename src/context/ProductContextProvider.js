import axios from "axios";
import React, { createContext, useReducer } from "react";

export const productContext = createContext();

let URL = "https://backend-for-fs-makers.herokuapp.com/api/v1";

const INIT_STATE = {
  products: [],
  exactproduct: {},
  productToEdit: {},
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_PRODUCTS_DATA":
      return { ...state, products: action.payload };
    case "GET_EXACT_PRODUCT_DATA":
      return { ...state, exactproduct: action.payload };
    case "EDIT_PRODUCT":
      return { ...state, productToEdit: action.payload };
    default:
      return state;
  }
};

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getProductsData = async () => {
    let { data } = await axios.get(`${URL}/products/?page=4`);
    dispatch({
      type: "GET_PRODUCTS_DATA",
      payload: data.results,
    });
    console.log(data);
  };

  const getExactProductData = async (id) => {
    let access = localStorage.getItem("access");
    let config = {};
    if (access) {
      config = {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      };
    }
    let { data } = await axios(`${URL}/products/${id}`, config);
    dispatch({
      type: "GET_EXACT_PRODUCT_DATA",
      payload: data,
    });
  };

  const editProduct = async (id) => {
    let { data } = await axios(`${URL}/products/${id}`);
    dispatch({
      type: "EDIT_PRODUCT",
      payload: data,
    });
  };

  const addProduct = async (newProduct) => {
    let access = localStorage.getItem("access");
    let config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    let res = await axios.post(`${URL}/products/`, newProduct, config);
    // await getExactProductData(res.data.id);
  };

  const deleteProduct = async (id) => {
    let access = localStorage.getItem("access");
    let config = {};
    if (access) {
      config = {
        headers: { Authorization: `Bearer ${access}` },
      };
    }
    await axios.delete(`${URL}/products/${id}/`, config);
    getProductsData();
  };

  const saveProduct = async (newProduct) => {
    let access = localStorage.getItem("access");
    let config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    await axios.patch(
      `${URL}/products/${newProduct["id"]}/`,
      newProduct,
      config
    );
    getExactProductData(newProduct.id);
  };
  return (
    <productContext.Provider
      value={{
        products: state.products,
        exactproduct: state.exactproduct,
        productToEdit: state.productToEdit,
        user: state.user,
        getProductsData,
        getExactProductData,
        addProduct,
        deleteProduct,
        editProduct,
        saveProduct,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export default ProductContextProvider;
