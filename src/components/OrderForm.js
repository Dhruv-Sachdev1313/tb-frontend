import React, { useState } from "react";
import axios from "axios";

const OrderForm = ({ tickersList }) => {
  const [ticker, setTicker] = useState("EHFLNCD.N5"); // Default ticker
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");

  const placeOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/orders/place-order", {
        ticker,
        price: parseFloat(price),
        quantity: parseInt(quantity),
      });
      setMessage(`Order placed successfully! Order ID: ${response.data.order_id}`);
    } catch (error) {
      setMessage("Failed to place order. Please try again.");
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="order-form">
      <h2>Place Order</h2>
      <form onSubmit={placeOrder}>
        <select
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        >
          {tickersList.map((ticker) => (
            <option key={ticker} value={ticker}>
              {ticker}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <button type="submit">Place Order</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default OrderForm;