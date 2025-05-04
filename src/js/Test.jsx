import React, { useState } from "react";
import "../css/test.css"; // External CSS file for styling

function Test() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Preview the image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="image-upload-container">
      <input
        type="file"
        id="fileInput"
        onChange={handleImageChange}
        className="file-input"
      />
      <label htmlFor="fileInput" className="custom-file-input">
        Choose an image
      </label>
      <button onClick={handleSubmit}>Upload Image</button>
      {image && <img src={image} alt="Preview" />}
    </div>
  );
}

export default Test;
