import React from 'react';

const BillPayment = ({ dishes }) => {
  // Calculate the total cost for each dish
  const dishTotals = dishes.reduce((totals, dish) => {
    const existingDish = totals.find(item => item.dish_id === dish.dish_id);
    if (existingDish) {
      existingDish.quantity += 1;
    } else {
      totals.push({ ...dish, quantity: 1 });
    }
    return totals;
  }, []);

  // Calculate the total bill
  const totalBill = dishTotals.reduce((total, dish) => {
    return total + (dish.dish_price * dish.quantity);
  }, 0);

  return (
    <div>
      <h2>Bill Payment</h2>
      <table>
        <thead>
          <tr>
            <th>Dish Name</th>
            <th>Quantity</th>
            <th>Price (SAR)</th>
            <th>Total (SAR)</th>
          </tr>
        </thead>
        <tbody>
          {dishTotals.map((dish, index) => (
            <tr key={index}>
              <td>{dish.dish_name}</td>
              <td>{dish.quantity}</td>
              <td>{dish.dish_price}</td>
              <td>{dish.dish_price * dish.quantity}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="3">Total Bill:</td>
            <td>{totalBill}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BillPayment;
