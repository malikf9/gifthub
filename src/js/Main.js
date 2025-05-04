import styles from "../css/Main.module.css";
import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  const [retProducts, setRetProducts] = useState([]);
  const [type, setType] = useState(true);
  const [addedProducts, setAddedProducts] = useState([]);

  useEffect(() => {
    const apiCall = async () => {
      const getProducts = await fetch(
        "http://localhost:5000/products/get-home-products",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await getProducts.json();

      if (data) setRetProducts(data.products);
      console.log(retProducts);
    };
    apiCall();
  }, []);

  useEffect(() => {
    const checkType = async () => {
      const response = await fetch("http://localhost:5000/users/check-type", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data.message);
      if (data.message === "unauthorized") navigate("/");
      if (data.message === true) {
        setType(true);
      } else {
        setType(false);
      }
    };
    checkType();
  }, []);

  const handleCart = async (title, id) => {
    const response = await fetch("http://localhost:5000/cart/add-to-cart", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const data = await response.json();

    if (data.message === "unauthenticate") navigate("/");

    setAddedProducts((prev) => [...prev, id]);

    alert(data.message);
  };

  return (
    <>
      <Navbar />
      <div className={styles.items_section}>
        {retProducts &&
          retProducts.map((product) => (
            <div
              key={product._id}
              className={`card ${styles.card}`}
              style={{ width: "18rem" }}
            >
              <img
                src={`http://localhost:5000/productImages/${product.imageURL}`}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">Price (Rs): {product.price}</p>
                <p className="card-text">Quantity: {product.quantity}</p>
                <p className="card-text">
                  Rating: 4 <small>/5</small>
                </p>
                <p className="card-text">{product.description}</p>
                {!type && (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleCart(product.title, product._id)}
                    disabled={addedProducts.includes(product._id)}
                  >
                    {addedProducts.includes(product._id)
                      ? "Added"
                      : "Add to cart"}
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Main;
