import React from "react";
import "../../assets/css/Cart.css";
import { useCart } from "../../Context/cart";

const CheckOut = () => {
  const [cart, setCart] = useCart();

  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h3 className=" mt-5">
        {cart?.length > 0
          ? `You have ${cart.length} items in cart`
          : "Your cart is empty"}
      </h3>

      <div className="container ">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th className="p-3">Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cart?.map((product) => (
              <tr className="" key={product.id}>
                <td>
                  <img
                    src={`http://localhost:8080/product-photo/${product._id}`}
                    style={{ width: "200px" }}
                    className="card-img-top m-2"
                    alt="image"
                  />
                </td>
                <td style={{borderLeft: "2px solid black"}}>{product.name}</td>
                <td style={{borderLeft: "2px solid black"}} className="p-3">{product.price}</td>
                <button class="btn btn-primary" onClick={removeCartItem}>Delete</button>
              </tr>
              
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CheckOut;
