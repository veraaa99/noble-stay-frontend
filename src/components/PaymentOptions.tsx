import { useState } from "react";

const PaymentOptions = () => {
  const [selected, setSelected] = useState("creditCard");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="w-70 flex justify-between bg-white bg-[url(assets/Credit_card.svg)] bg-no-repeat bg-position-[10px] py-3 pl-10 border-1 border-(--sidebar-border)  rounded-md">
        <label htmlFor="creditCard">Credit card</label>

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

        {/* <input
          type="radio"
          name="paymentMethod"
          id="creditCard"
          value="creditCard"
          checked={selected === "creditCard"}
          onChange={handleChange}
        /> */}
      </div>
      <div className="w-70 flex justify-between bg-white py-3 pl-10 border-1 border-(--sidebar-border)  rounded-md">
        <label htmlFor="payPal">PayPal</label>

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

        {/* <input
          type="radio"
          name="paymentMethod"
          id="payPal"
          value="payPal"
          checked={selected === "payPal"}
          onChange={handleChange}
        /> */}
      </div>
      <div className="w-70 flex justify-between bg-white py-3 pl-10 border-1 border-(--sidebar-border) rounded-md">
        <label htmlFor="swish">Swish</label>

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

        {/* <input
          type="radio"
          name="paymentMethod"
          id="swish"
          value="swish"
          checked={selected === "swish"}
          onChange={handleChange}
        /> */}
      </div>
    </div>
  );
};
export default PaymentOptions;
