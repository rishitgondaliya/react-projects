/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

function useCurrencyInfo(baseCurrency) {
  const [info, setInfo] = useState({});

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/f3b80ab6f76d711694886782/latest/${baseCurrency}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setInfo(data.conversion_rates);
      } catch (error) {
        console.error("Failed to fetch currency data:", error);
      }
    };

    fetchCurrencyData();
  }, [baseCurrency]);

  return info;
}

export default useCurrencyInfo;
