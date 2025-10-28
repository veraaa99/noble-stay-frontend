import { useState } from "react"

const PaymentOptions = () => {
  const [selected, setSelected] = useState('creditCard')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value)
  }

  return (
    <div>
        <div>
            <label htmlFor="creditCard">Credit card</label>
            <input type="radio" name="paymentMethod" id="creditCard" value="creditCard" checked={selected === "creditCard"} onChange={handleChange} />
        </div>
        <div>
            <label htmlFor="payPal">PayPal</label>
            <input type="radio" name="paymentMethod" id="payPal" value="payPal" checked={selected === "payPal"} onChange={handleChange}/>
        </div>
        <div>
            <label htmlFor="swish">Swish</label>
            <input type="radio" name="paymentMethod" id="swish" value="swish" checked={selected === "swish"} onChange={handleChange}/>
        </div>
    </div>
  )
}
export default PaymentOptions