import React, { useState, useEffect } from "react";
import "normalize.css";
import "./assets/scss/main.scss";
import Header from "./components/layout/Header";
import HomePage from "./pages/HomePage";

function App() {
  const [isCurrenciesLoading, setIsCurrenciesLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [currencies, setCurrencies] = useState();

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(
          "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
        );
        const currencies = await response.json();

        const currenciesToShow = currencies
          .filter((currency) => currency.cc === "USD" || currency.cc === "EUR")
          .map((currency) => ({ cc: currency.cc, rate: currency.rate }));
        setCurrencies(currenciesToShow);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsCurrenciesLoading(false);
      }
    };
    fetchCurrencies();
  }, []);

  return (
    <div className="container">
      <Header
        isCurrenciesLoading={isCurrenciesLoading}
        isError={isError}
        currencies={currencies}
      />
      <HomePage
        isCurrenciesLoading={isCurrenciesLoading}
        isError={isError}
        currencies={currencies}
      />
    </div>
  );
}

export default App;
