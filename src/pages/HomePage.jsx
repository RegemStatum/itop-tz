import React from "react";
import CurrenciesConverter from "../components/homePage/CurrenciesConverter";
import { useAppContext } from "../context/AppContext";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  const { isError } = useAppContext();

  if (isError) {
    return (
      <div className={styles.error}>
        Error occurred. Please, try to refresh the page
      </div>
    );
  }

  return <CurrenciesConverter />;
};

export default HomePage;
