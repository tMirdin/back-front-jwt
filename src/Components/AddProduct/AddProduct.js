import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { productContext } from "../../context/ProductContextProvider";

const AddProduct = () => {
  const [inpTitle, setInpTitle] = useState("Title");
  const [inpDescription, setInpDescription] = useState("Description");
  const [inpPrice, setInpPrice] = useState("Price");
  const [selectedFile, setSelectedFile] = useState({});
  let { addProduct, exactproduct } = useContext(productContext);
  const navigate = useNavigate();

  async function handleClick() {
    const newObj = {
      title: inpTitle,
      description: inpDescription,
      image: selectedFile,
      category: 1,
      price: inpPrice,
    };

    // const newObj = new FormData();
    // newObj.append("title", inpTitle)

    await addProduct(newObj);

    // navigate(`/product/${exactproduct.id}`);
  }

  return (
    <div className="inner">
      <h1>Add Product: </h1>
      <input
        value={inpTitle}
        onChange={(e) => setInpTitle(e.target.value)}
        type="text"
      />
      <br></br>
      <input
        value={inpDescription}
        onChange={(e) => setInpDescription(e.target.value)}
        type="text"
      />
      <br></br>
      <input
        value={inpPrice}
        onChange={(e) => setInpPrice(e.target.value)}
        type="text"
      />
      <br></br>
      <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
      <button onClick={handleClick}>Add</button>
    </div>
  );
};

export default AddProduct;
