import React from "react";
import { useAppContext } from "../../context/AppContext";
import Loader from "../ui/Loader";
import styles from "./Header.module.scss";

const Header = () => {
  const { isCurrenciesLoading, isError, currencies } = useAppContext();

  if (isCurrenciesLoading) {
    return (
      <header className={styles.header}>
        <Loader className={styles.loader} />
      </header>
    );
  }

  if (isError) {
    return (
      <header className={styles.header}>
        <p>Error</p>
      </header>
    );
  }

  const USDRate = currencies
    .find((currency) => currency.cc === "USD")
    .rate.toFixed(3);
  const EURRate = currencies
    .find((currency) => currency.cc === "EUR")
    .rate.toFixed(3);

  return (
    <header className={styles.header}>
      <p className={styles.rates}>
        USD <span>{USDRate}</span> / EUR <span>{EURRate}</span>
      </p>
    </header>
  );
};

export default Header;
