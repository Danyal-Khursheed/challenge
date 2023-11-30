import React, { useState } from "react";
import "../../assets/css/CreateProducts.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateProduct = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("price", price);
      productData.append("photo", photo);

      const { data } = await axios.post(
        "http://localhost:8080/create-product",
        productData
      );

      if (data.success) {
        alert("Product created Successfully ");
        navigate("/dashboard");
      } else {
        alert("An error occurred while creating the product ");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="container-fluid" style={{ display: "block" }}>
      <div className="container">
        <div className="cta-form">
          <h2>Create Product</h2>
          <p>Enter the following requriements for creating product.</p>
        </div>
        <form action className="form">
          <input
            type="text"
            placeholder="Name"
            className="form__input"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="name" className="form__label">
            Name
          </label>
          <input
            type="number"
            placeholder="Email"
            name="price"
            className="form__input"
            id="price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor="price" className="form__label">
            Price
          </label>
          <input
            type="file"
            placeholder="Subject"
            className="form__input"
            id="my_file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          <label htmlFor="my_file" className="form__label"></label>
          <div className="img mb-4">
            {photo && (
              <div className="URL">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product-photo"
                  height={"200px"}
                  className="img img-responsive img-rounded rounded"
                />
              </div>
            )}
          </div>
          <div className="button">
            <button
              type="button"
              className="btn btn-primary "
              onClick={handleCreate}
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
