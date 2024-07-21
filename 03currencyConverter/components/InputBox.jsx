/* eslint-disable react/prop-types */
import { useId } from "react";

export default function InputBox({
  label = "Amount",
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisabled = false,
  currencyDisabled = false,
}) {
  const amountInputId = useId();
  const currencySelectId = useId();

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <div className="mb-4">
        <label
          htmlFor={amountInputId}
          className="block text-gray-700 font-semibold mb-2"
        >
          {label}
        </label>
        <input
          type="number"
          id={amountInputId}
          className="outline-none w-full py-2 px-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter amount"
          disabled={amountDisabled}
          value={amount}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor={currencySelectId}
          className="block text-gray-700 font-semibold mb-2"
        >
          Currency Type
        </label>
        <select
          id={currencySelectId}
          className="w-full py-2 px-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer bg-white"
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisabled}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
