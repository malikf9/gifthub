import Navbar from "./Navbar";
import styles from "../css/Cart.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Cart() {
  const navigate = useNavigate();
  const [retProducts, setRetProducts] = useState([]);
  const [quantity, setQuantity] = useState([]);

  useEffect(() => {
    const apiCall = async () => {
      const getProducts = await fetch(
        "http://localhost:5000/cart/get-cart-products",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await getProducts.json();
      console.log(data);
      setRetProducts(data.cart);
    };
    apiCall();
  }, []);

  const handleQuantity = (id, q, price) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: q,
    }));
  };

  const handleCheckout = async () => {
    console.log("Quantity", quantity);

    const response = await fetch("http://localhost:5000/orders/checkout", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify(quantity),
    });

    const data = await response.json();

    if (data.message === "unauthenticated") navigate("/");

    alert(data);
  };

  return (
    <>
      <Navbar />
      <div className={styles.cartPage}>
        <div className={styles.items_section}>
          {retProducts &&
            retProducts.map((product) => (
              <div className={styles.item} key={product._id}>
                <img
                  src={`http://localhost:5000/productImages/${product.imageURL}`}
                  alt=""
                />
                <div>
                  <h5>
                    <strong>{product.title}</strong>
                  </h5>
                  <p>
                    <strong>Price (pkr): {product.price}</strong>
                  </p>
                  <p>
                    <strong>
                      Available quantity: {product.productQuantity}
                    </strong>
                  </p>
                  <p>
                    <strong>Description: </strong>
                  </p>
                  <p>{product.description}</p>
                  <strong>Quantity: </strong>
                  <input
                    type="number"
                    placeholder="Enter quantity"
                    min={1}
                    id={`quantityInput${product._id}`}
                    max={product.productQuantity}
                    onChange={(e) => {
                      const value = e.target.value;
                      const num = parseInt(value);

                      if (num >= 1 && num <= product.productQuantity) {
                        handleQuantity(
                          product.title,
                          e.target.value,
                          product.price
                        );
                      } else
                        document.getElementById(
                          `quantityInput${product._id}`
                        ).value = "";
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
        <div>
          {/*<button className={styles.totalBtn}>
            <strong>Total: {total}</strong>
          </button>*/}
          <button className={styles.checkoutBtn} onClick={handleCheckout}>
            <strong>Checkout</strong>
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
