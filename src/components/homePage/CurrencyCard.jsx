import React from "react";
import styles from "./CurrencyCard.module.scss";
import { useAppContext } from "../../context/AppContext";

const CurrencyCard = ({ name, currency, type }) => {
  const {
    currencies,
    handleChangeCurrencyValue,
    handleChangeCurrencyCC,
    isCurrenciesLoading,
  } = useAppContext();

  const valueToShow =
    (currency.value && String(currency.value).substring(0, 8)) || "";

  return (
    <div className={styles.container}>
      <h2>{name}</h2>
      <div className={styles.inputContainer}>
        <input
          type="number"
          min={0}
          max={10000000}
          value={valueToShow}
          onChange={(e) => handleChangeCurrencyValue(e, type)}
          disabled={isCurrenciesLoading}
        />
        <select
          value={currency.cc}
          onChange={(e) => handleChangeCurrencyCC(e, type)}
        >
          {currencies &&
            currencies.map((currencyItem) => (
              <option value={currencyItem.cc} key={currencyItem.cc}>
                {currencyItem.cc}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default CurrencyCard;
