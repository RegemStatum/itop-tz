import React from "react";
import CurrencyCard from "./CurrencyCard";
import styles from "./CurrenciesConverter.module.scss";
import { useAppContext } from "../../context/AppContext";

const CurrenciesConverter = () => {
  const { firstCurrencyToConvert, secondCurrencyToConvert } = useAppContext();

  return (
    <div className={styles.container}>
      <CurrencyCard
        name="First Currency"
        currency={firstCurrencyToConvert}
        type="first"
      />
      <CurrencyCard
        name="Second Currency"
        currency={secondCurrencyToConvert}
        type="second"
      />
    </div>
  );
};

export default CurrenciesConverter;
