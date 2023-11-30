import React, { useState, useEffect } from "react";
import "../../assets/css/product.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/cart";

const AddtoCart = () => {
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/show-product");
      // Log the response to see its structure
      console.log(response.data);

      // Ensure that the response.data.showProducts is an array
      if (Array.isArray(response.data.showProducts)) {
        // Update the state with the data
        setProduct(response.data.showProducts);
      } else {
        console.error(
          "Invalid data format. Expected an array under 'showProducts'."
        );
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while getting all products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // Log the product state before the map function
  console.log(product);

  return (
    <>
      <div className="products mt-5">
        <h3>Products List</h3>
        <div className="form d-flex align-content-stretch flex-wrap">
          {product.map((p) => (
            <Link className="product-link" to={`${p.slug}`}>
              <div className="card m-5" style={{ width: "18rem" }} key={p.id}>
                <img
                  src={`http://localhost:8080/product-photo/${p._id}`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default AddtoCart;
