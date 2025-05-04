import Navbar from "./Navbar";
import styles from "../css/Cart.module.css";
import hubaib from "../images/hubaib.jpg";
import hussain from "../images/hussain.jpeg";
import oStyles from "../css/Orders.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Orders() {
  const navigate = useNavigate();
  const [retProducts, setRetProducts] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);
  const [type, setType] = useState(false);

  useEffect(() => {
    const checkSeller = async () => {
      const response = await fetch("http://localhost:5000/users/check-type", {
        method: "GET",
        credentials: "include",
        headers: { "Content-type": "application/json" },
      });
      const data = await response.json();
      if (data.message === "unauthorized") navigate("/");
      if (data.message) {
        setType(true);
      } else {
        setType(false);
      }
    };
    checkSeller();
  }, []);

  useEffect(() => {
    const apiCall = async () => {
      const getProducts = await fetch(
        "http://localhost:5000/orders/get-order-products",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await getProducts.json();

      if (data.message === "unauthenticate") navigate("/");

      console.log(data);
      setRetProducts(data.cart);
    };
    apiCall();
  }, []);

  const handleOrder = async (title, id, user, qnty) => {
    const response = await fetch(
      "http://localhost:5000/orders/complete-order",
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, user, qnty }),
      }
    );
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
            <div className={styles.item} key={product._id}>
              <img
                src={`http://localhost:5000/productImages/${product.imageURL}`}
                alt=""
              />
              <div>
                <p>
                  <strong>Price (pkr): {product.price}</strong>
                </p>
                <p>
                  <strong>Quantity: {product.quantity}</strong>
                </p>
                {type && (
                  <p>
                    <strong>Username: {product.username}</strong>
                  </p>
                )}

                {!type && (
                  <>
                    <p>
                      <strong>Description: </strong>
                    </p>
                    <p>{product.description}</p>
                  </>
                )}

                {type && (
                  <button
                    className={oStyles.orderBtn}
                    onClick={() =>
                      handleOrder(
                        product.title,
                        product._id,
                        product.username,
                        product.quantity
                      )
                    }
                    disabled={addedProducts.includes(product._id)}
                  >
                    {addedProducts.includes(product._id)
                      ? "Completed"
                      : "Mark as complete"}
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Orders;
