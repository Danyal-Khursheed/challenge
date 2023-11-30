import React, { useState, useEffect } from "react";
import "../../assets/css/CreateProducts.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  // Single product
  const singleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/single-product/${params.slug}`
      );
      setName(data.showProduct.name);
      setPrice(data.showProduct.price);
      setId(data.showProduct._id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    singleProduct();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      console.log(params);
      const productData = new FormData();
      productData.append("name", name);
      productData.append("price", price);
      photo && productData.append("photo", photo);

      const { data } = await axios.put(
        `http://localhost:8080/update-product/${id}`,
        productData
      );

      if (data.success) {
        alert("Product updated Successfully ");
        navigate("/add-to-cart");
      } else {
        alert("An error occurred while updating the product ");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.delete(
        `http://localhost:8080/product-delete/${id}`
      );

      if (data.success) {
        alert("Product deleted Successfully ");
        navigate("/add-to-cart");
      } else {
        alert("An error occurred while Deleting the product ");
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
          <h2>Update Product</h2>
          <p>Enter the following requirements for creating a product.</p>
        </div>
        <form className="">
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
            placeholder="Price"
            className="form__input"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor="price" className="form__label">
            Price
          </label>
          <input
            type="file"
            placeholder="Photo"
            className="form__input"
            id="my_file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          <label htmlFor="my_file" className="form__label">
            Photo
          </label>
          {photo ? (
            <div className="URL">
              <img
                src={URL.createObjectURL(photo)}
                alt="product-photo"
                height={"200px"}
                className="img img-responsive img-rounded rounded"
              />
            </div>
          ) : (
            <div className="URL">
              <img
                src={`http://localhost:8080/product-photo/${id}`}
                alt="product-photo"
                height={"200px"}
                className="img img-responsive img-rounded rounded"
              />
            </div>
          )}
          <div className="button">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpdate}
            >
              Update Product
            </button>

            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
