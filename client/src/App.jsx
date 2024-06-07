import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [product, setProduct] = useState([]);

  const getProduct = async () => {
    const result = await axios.get("http://localhost:4001/products");
    setProduct(result.data.data);
    console.log(result.data.data);
  };

  const deleteProduct = async (id, index) => {
    const newProduct = [...product];
    await axios.delete(`http://localhost:4001/products/${id}`);
    newProduct.splice(index, 1);
    setProduct(newProduct);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      {product.map((item, index) => {
        return (
          <div className="product-list" key={index}>
            <div className="product">
              <div className="product-preview">
                <img
                  src={item.image}
                  alt={item.name}
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {item.name}</h1>
                <h2>Product price: {item.price} Baht</h2>
                <p>Product description: {item.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => {
                  deleteProduct(item.id, index);
                }}
              >
                x
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
