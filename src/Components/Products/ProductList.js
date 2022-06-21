import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { productContext } from "../../context/ProductContextProvider";
const ProductsList = () => {
  const { products, getProductsData } = useContext(productContext);

  useEffect(() => {
    getProductsData();
  }, []);
  console.log(products);

  return (
    <div style={{ marginTop: "100px" }}>
      {products.map((product) => (
        <div
          className="card"
          key={product.id}
          style={{ border: "1px solid black" }}
        >
          <img
            src={product.image}
            className="card-img-top"
            alt="..."
            style={{ width: "250px", height: "auto" }}
          />
          <div className="card-body">
            <p className="card-title">{product.title}</p>
            <p className="card-text">{product.author}</p>
            <p className="card-text">{product.price}</p>
          </div>
          <Link to={`/product/${product.id}`}>
            <button>details</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
