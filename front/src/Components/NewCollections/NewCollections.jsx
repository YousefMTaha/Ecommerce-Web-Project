import React, { useState, useEffect } from "react";
import "./NewCollections.css";
import Item from "../Items/item";

const NewCollections = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3000/product');
        const data = await res.json();
        setProducts(data.Product); // Access the correct key "Product" instead of "products"
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="newCollections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {products.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.images[0].secure_url} // Access the first image, or revise according to your requirement
            newPrice={item.price} // Verify if newPrice should be price
            stock={item.stock} // Verify if oldPrice should be stock
          />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;