import React, { useContext } from 'react';
import { UserContext } from '../../Context/context';
import { Link } from 'react-router-dom';
import './successfullyPlaced.css';

const OrderSuccessPage = () => {
  const { updateCart } = useContext(UserContext);

  const clearCart = () => {
    updateCart('')
  }

  return (
    <div className="order-success-container">
      <div className="order-success-message">
        <h1>Order Successfully Placed!</h1>
        <Link to="/Home" onClick={clearCart} className="btn btn-primary">Back to Home</Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
