import React, { useState, useEffect, useContext } from "react";

const Context = React.createContext();

const AppContext = ({ children }) => {
  const [isCurrenciesLoading, setIsCurrenciesLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [currencies, setCurrencies] = useState([{ cc: "UAH", rate: 1 }]);
  const [firstCurrencyToConvert, setFirstCurrencyToConvert] = useState({
    cc: "USD",
    rate: 1,
    value: null,
  });
  const [secondCurrencyToConvert, setSecondCurrencyToConvert] = useState({
    cc: "UAH",
    rate: 1,
    value: null,
  });

  // fetch currencies
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(
          "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
        );
        const data = await response.json();

        // filter data to get USD and EUR currencies
        const currenciesToShow = data
          .filter((currency) => currency.cc === "USD" || currency.cc === "EUR")
          .map((currency) => ({ cc: currency.cc, rate: currency.rate }));
        setCurrencies([...currencies, ...currenciesToShow]);

        // set initial rates
        const firstRate =
          currenciesToShow.find(
            (currency) => currency.cc === firstCurrencyToConvert.cc
          )?.rate || 1;
        const secondRate =
          currenciesToShow.find(
            (currency) => currency.cc === secondCurrencyToConvert.cc
          )?.rate || 1;
        setFirstCurrencyToConvert({
          ...firstCurrencyToConvert,
          rate: firstRate,
        });
        setSecondCurrencyToConvert({
          ...secondCurrencyToConvert,
          rate: secondRate,
        });
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsCurrenciesLoading(false);
      }
    };
    fetchCurrencies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // convert second currency on first cc change
  useEffect(() => {
    handleChangeCurrencyValue(
      {
        target: { value: firstCurrencyToConvert.value },
      },
      "first"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstCurrencyToConvert.rate]);

  // convert first currency on second cc change
  useEffect(() => {
    handleChangeCurrencyValue(
      {
        target: { value: secondCurrencyToConvert.value },
      },
      "second"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondCurrencyToConvert.rate]);

  const handleChangeCurrencyValue = (e, type) => {
    let coefficient;
    const value = e.target.value;

    if (value < 0) {
      return;
    }

    if (type === "first") {
      coefficient = firstCurrencyToConvert.rate / secondCurrencyToConvert.rate;
      setFirstCurrencyToConvert({
        ...firstCurrencyToConvert,
        value,
      });
      setSecondCurrencyToConvert({
        ...secondCurrencyToConvert,
        value: coefficient * value,
      });
    } else {
      coefficient = secondCurrencyToConvert.rate / firstCurrencyToConvert.rate;
      setSecondCurrencyToConvert({
        ...secondCurrencyToConvert,
        value,
      });
      setFirstCurrencyToConvert({
        ...firstCurrencyToConvert,
        value: coefficient * value,
      });
    }
  };

  const handleChangeCurrencyCC = (e, type) => {
    const cc = e.target.value;
    const rate = currencies.find((currency) => currency.cc === cc).rate;

    type === "first"
      ? setFirstCurrencyToConvert({
          ...firstCurrencyToConvert,
          cc,
          rate,
        })
      : setSecondCurrencyToConvert({
          ...secondCurrencyToConvert,
          cc,
          rate,
        });
  };

  return (
    <Context.Provider
      value={{
        isCurrenciesLoading,
        isError,
        currencies,
        firstCurrencyToConvert,
        secondCurrencyToConvert,
        handleChangeCurrencyValue,
        handleChangeCurrencyCC,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => {
  return useContext(Context);
};

export default AppContext;
