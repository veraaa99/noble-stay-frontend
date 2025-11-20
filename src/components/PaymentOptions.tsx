import { useState } from "react";

const PaymentOptions = () => {
  const [selected, setSelected] = useState<string>("creditCard");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="w-70 flex justify-between bg-white bg-[url(assets/Credit_card.svg)] bg-no-repeat bg-position-[10px] py-3 pl-10 border-1 border-(--sidebar-border)  rounded-md sm:w-40 lg:w-55">
        <label className="sm:text-xs" htmlFor="creditCard">
          Credit card
        </label>

        <label className="container w-fit">
          <input
            type="radio"
            value="creditCard"
            checked={selected === "creditCard"}
            name="paymentMethod"
            onChange={handleChange}
          />
          <span className="checkmark"></span>
        </label>
      </div>
      <div className="w-70 flex justify-between bg-white py-3 pl-10 border-1 border-(--sidebar-border)  rounded-md sm:w-40 lg:w-55">
        <label className="sm:text-xs" htmlFor="payPal">
          PayPal
        </label>

        <label className="container w-fit">
          <input
            type="radio"
            value="payPal"
            checked={selected === "payPal"}
            name="paymentMethod"
            onChange={handleChange}
          />
          <span className="checkmark"></span>
        </label>
      </div>
      <div className="w-70 flex justify-between bg-white py-3 pl-10 border-1 border-(--sidebar-border) rounded-md sm:w-40 lg:w-55">
        <label className="sm:text-xs" htmlFor="swish">
          Swish
        </label>

        <label className="container w-fit">
          <input
            type="radio"
            value="swish"
            checked={selected === "swish"}
            name="swish"
            onChange={handleChange}
          />
          <span className="checkmark"></span>
        </label>
      </div>
    </div>
  );
};
export default PaymentOptions;
