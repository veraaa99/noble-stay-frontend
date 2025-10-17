const PaymentOptions = () => {
  return (
    <div>
        <div>
            <label htmlFor="creditCard">Credit card</label>
            <input type="radio" name="paymentMethod" id="creditCard" />
        </div>
        <div>
            <label htmlFor="payPal">PayPal</label>
            <input type="radio" name="paymentMethod" id="payPal" />
        </div>
        <div>
            <label htmlFor="swish">Swish</label>
            <input type="radio" name="paymentMethod" id="swish" />
        </div>
    </div>
  )
}
export default PaymentOptions