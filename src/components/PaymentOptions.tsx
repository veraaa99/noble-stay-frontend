const PaymentOptions = () => {
  return (
    <div>
        <div>
            <label htmlFor="creditCard">Credit card</label>
            <input type="radio" name="paymentMethod" id="creditCard" value="creditCard"/>
        </div>
        <div>
            <label htmlFor="payPal">PayPal</label>
            <input type="radio" name="paymentMethod" id="payPal" value="payPal"/>
        </div>
        <div>
            <label htmlFor="swish">Swish</label>
            <input type="radio" name="paymentMethod" id="swish" value="swish"/>
        </div>
    </div>
  )
}
export default PaymentOptions