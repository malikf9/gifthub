import Navbar from "./Navbar";
import React from "react";
import styles from "../css/Dashboard.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hubaib from "../images/hubaib.jpg";
import hussain from "../images/hussain.jpeg";

function Dashboard() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [name, setName] = useState(null);
  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);
  const [productImg, setProductImg] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [description, setDescription] = useState(null);
  const [dltTitle, setDltTitle] = useState(null);
  const [cardNumber, setCardNumber] = useState(null);
  const [expiry, setExpiry] = useState(null);
  const [cvc, setCvc] = useState(null);
  const [cardHolderName, setCardHolderName] = useState(null);
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [retProducts, setRetProducts] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImg(file);
    if (file) {
      setLoading(true);
      const previewURL = URL.createObjectURL(file);
      setImage(previewURL);
    }
  };

  useEffect(() => {
    const checkSeller = async () => {
      const response = await fetch("http://localhost:5000/users/check-type", {
        method: "GET",
        credentials: "include",
        headers: { "Content-type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
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
    const userInfo = async () => {
      const response = await fetch(
        "http://localhost:5000/users/profile-details",
        {
          method: "GET",
          headers: { "Content-type": "application/json" },
          credentials: "include",
        }
      );
      const details = await response.json();

      setUsername(details.username);
      setEmail(details.email);
      setName(details.name);
    };
    userInfo();
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("price", price);
    formdata.append("quantity", quantity);
    formdata.append("description", description);
    formdata.append("productImage", productImg);
    formdata.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    const response = await fetch("http://localhost:5000/products/add-product", {
      method: "POST",
      credentials: "include",
      body: formdata,
    });
    const result = await response.json();
    alert(result.message);
  };

  const dltProduct = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/products/dlt-product", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title: dltTitle }),
    });

    const data = await response.text();

    alert(data);
  };

  const addPaymentDetails = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/payments/add-details", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ cardNumber, expiry, cvc, cardHolderName }),
    });
    setRetProducts(await response.json());

    //alert(data.message);
  };

  const validatePassword = (pass) => {
    // Regular expression to check for at least one capital letter and one number
    const hasCapitalLetter = /[A-Z]/.test(pass);
    const hasNumber = /\d/.test(pass);

    if (hasCapitalLetter && hasNumber) {
      return true; // Password is valid
    } else {
      console.log("Password should contain a capital alphabet and a number");
      return false; // Password is invalid
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();

    if (!validatePassword(newPassword)) {
      alert("Password should contain a capital letter and an alphabet");
      return false;
    }

    const response = await fetch(
      "http://localhost:5000/users/change-password",
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      }
    );

    const data = await response.json();

    alert(data.message);
  };

  const getProducts = async () => {
    const response = await fetch(
      "http://localhost:5000/products/get-profile-products",
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    console.log(data.products);
    if (data.products) setRetProducts(data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Navbar />

      <div className={styles.dashboard_sect}>
        {type && (
          <>
            <div className={styles.add_product}>
              <form action="#" encType="multipart/form-data">
                <h3>
                  <strong>Add Product</strong>
                </h3>
                <div className={styles.add_product_form}>
                  <input
                    type="text"
                    placeholder="Enter title (Unique)"
                    maxLength={40}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  <div className={styles.uploader_container}>
                    <label
                      htmlFor="file-upload"
                      className={styles.custom_file_upload}
                    >
                      Upload Image
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className={styles.file_input}
                      required
                    />

                    {loading && (
                      <div className={styles.spinner_container}>
                        <div className={styles.spinner}></div>
                        <p>Loading image...</p>
                      </div>
                    )}

                    {image && (
                      <img
                        src={image}
                        alt="Preview"
                        className={styles.image_preview}
                        onLoad={() => setLoading(false)}
                      />
                    )}
                  </div>
                  <input
                    type="number"
                    placeholder="Enter price"
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Enter quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                  <textarea
                    placeholder="Enter description"
                    className={styles.desc_input}
                    maxLength={200}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button className={styles.btn} onClick={addProduct}>
                  Add
                </button>
              </form>
            </div>

            <div className={styles.dlt_product}>
              <form action="#">
                <h3>
                  <strong>Delete Product</strong>
                </h3>
                <input
                  type="text"
                  placeholder="Enter title"
                  onChange={(e) => setDltTitle(e.target.value)}
                  required
                />
                <button className={styles.btn} onClick={dltProduct}>
                  Delete
                </button>
              </form>
            </div>
          </>
        )}

        <div className={styles.payment_details}>
          <form action="#">
            <h3>
              <strong>Add Payment details</strong>
            </h3>
            <div className={styles.payment_details_form}>
              <input
                type="text"
                placeholder="Card number"
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Expiry date"
                onChange={(e) => setExpiry(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="CVC"
                onChange={(e) => setCvc(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Card holder name"
                onChange={(e) => setCardHolderName(e.target.value)}
                required
              />
            </div>
            <button className={styles.btn} onClick={addPaymentDetails}>
              Add
            </button>
          </form>
        </div>

        <div className={styles.user_info}>
          <h3>
            <strong>Account Information</strong>
          </h3>
          {username !== null && (
            <p>
              <strong>Username: </strong> {username ? username : "Loading"}
            </p>
          )}
          {email !== null && (
            <p>
              <strong>Email: </strong> {email ? email : "Loading"}
            </p>
          )}
          {name !== null && (
            <p>
              <strong>Name: </strong> {name ? name : "Loading"}
            </p>
          )}
          {type !== null && (
            <p>
              <strong>Account Type: </strong> {type ? "Seller" : "Buyer"}
            </p>
          )}
          <form action="#" className={styles.user_info_form}>
            <input
              type="password"
              placeholder="Old Password"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className={styles.btn} onClick={changePassword}>
              Change
            </button>
          </form>
        </div>
      </div>

      {type && (
        <>
          <div className={styles.products}>
            <h1>
              <strong>Products Listed</strong>
            </h1>
            <div className={styles.products_container}>
              {retProducts &&
                retProducts.map((product) => (
                  <div
                    key={product._id}
                    className={`card ${styles.card}`}
                    style={{ width: "18rem" }}
                  >
                    <img
                      src={`http://localhost:5000/productImages/${product.imageURL}`}
                      className={`card-img-top ${styles.product_img}`}
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
                      <a href="#" className="btn btn-primary">
                        Add to cart
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;
