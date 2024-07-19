/* eslint-disable react/prop-types */
import { useId } from "react";

export default function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisabled = false,
  currencyDisabled = false,
}) {
  const amountInputId = useId();


  return (
    <div className="bg-white p-4 rounded-lg text-lg flex flex-col gap-4 shadow-md">
      <div className="w-full">
        <label
          htmlFor={amountInputId}
          className="text-gray-700 font-medium mb-2 inline-block"
        >
          {label}
        </label>
        <input
          type="number"
          className="outline-none w-full py-2 px-3 rounded-md bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500"
          id={amountInputId}
          placeholder="Enter amount"
          disabled={amountDisabled}
          value={amount}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="w-full text-gray-700 font-medium mb-2">Currency Type</p>
        <select
          className="rounded-md px-3 py-2 bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer"
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
