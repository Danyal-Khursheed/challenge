import React from "react";
import "../assets/css/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../Context/cart";
import { Badge } from "antd";

const Navbar = () => {
  const [cart] = useCart();
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-sm fixed-top">
          <div className="container-fluid">
            <Link
              className="navbar-brand"
              to="/"
              style={{ fontSize: "1.4rem", fontWeight: "600" }}
            >
              <FontAwesomeIcon
                style={{ fontSize: "1.35rem", fontWeight: "600" }}
                icon={faShoppingCart}
              />{" "}
              Apptex task
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse navbar-nav ml-auto"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item navItems active text">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item navItems text">
                  <Link className="nav-link" to="/add-to-cart">
                    Update Products
                  </Link>
                </li>
                <li className="nav-item navItems text">
                  <Link className="nav-link" to="/create-product">
                    Create Products
                  </Link>
                </li>
                <li className="nav-item navItems text">
                  <Badge
                    style={{ transform: "translateX(-5px)" }}
                    count={cart?.length}
                  >
                    <Link className="nav-link" to="/checkout">
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </Link>
                  </Badge>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
