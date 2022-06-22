import React from "react";
import loader from "../../assets/images/loader.svg";
import styles from "./Loader.module.scss";

const Loader = ({ className = "" }) => {
  return (
    <img
      src={loader}
      alt="loader"
      className={`${styles.loader} ${className}`}
    />
  );
};

export default Loader;
