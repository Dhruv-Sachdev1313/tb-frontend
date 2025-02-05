import React, { useState, useEffect } from "react";
import axios from "axios";
import TickTable from "./components/TickTable";
import OrderForm from "./components/OrderForm";
import "./App.css";

axios.defaults.baseURL = "http://127.0.0.1:5000";

function App() {
  const [ticks, setTicks] = useState([]);
  const [tickersList, setTickersList] = useState([]);
  const [ticker, setTicker] = useState("EHFLNCD.N5"); // Default symbol
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [interval, setInterval] = useState("");

  // Fetch tickers list
  useEffect(() => {
    const fetchTickersList = async () => {
      try {
        const response = await axios.get("/ticks/tickers_list");
        setTickersList(response.data);
      } catch (error) {
        console.error("Error fetching tickers list:", error);
      }
    };
    fetchTickersList();
  }, []);

  // Fetch tick data
  const fetchTicks = async () => {
    try {
      const response = await axios.get("/ticks/ticker_prices", {
        params: { ticker, start_date: startDate, end_date: endDate, interval },
      });
      setTicks(response.data);
    } catch (error) {
      console.error("Error fetching tick data:", error);
    }
  };

  // Fetch data on component mount or when filters change
  useEffect(() => {
    fetchTicks();
  }, [ticker, startDate, endDate, interval]);

  return (
    <div className="App">
      <h1>Asset Management Dashboard</h1>
      <div className="filters">
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
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <select value={interval} onChange={(e) => setInterval(e.target.value)}>
          <option value="">Raw</option>
          <option value="1min">1 Minute</option>
          <option value="5min">5 Minutes</option>
        </select>
        <button onClick={fetchTicks}>Apply Filters</button>
      </div>
      <TickTable ticks={ticks} />
      <OrderForm tickersList={tickersList} />
    </div>
  );
}

export default App;