import React, { useState } from 'react';
import './dummyPayment.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function DummyPayment() {
  const [paymentData, setPaymentData] = useState({
    amount: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [paymentStatus, setPaymentStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handlePayment = () => {
    if (!paymentData.amount || !paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv) {
      setPaymentStatus('*Please fill in all fields.');
      return;
    }

    setPaymentStatus('Processing payment...');
    setTimeout(() => {
      setPaymentStatus('Payment successful!');
    }, 2000);
  };

  return (
    <div className="payment-container">
      <h2>Dummy Payment</h2>
      <div className="input-group">
        <label>Amount:</label>
        <input type="text" name="amount" value={paymentData.amount} onChange={handleInputChange} />
      </div>
      <div className="input-group">
        <label>Card Number:</label>
        <input type="text" name="cardNumber" value={paymentData.cardNumber} onChange={handleInputChange} />
      </div>
      <div className="input-group">
        <label>Expiry Date:</label>
        <input type="text" name="expiryDate" value={paymentData.expiryDate} onChange={handleInputChange} />
      </div>
      <div className="input-group">
        <label>CVV:</label>
        <input type="text" name="cvv" value={paymentData.cvv} onChange={handleInputChange} />
      </div>
      <button className="payment-button" onClick={handlePayment}>Make Payment</button>
      <div className="payment-status">{paymentStatus}</div>
    </div>
  );
}

export default DummyPayment;
