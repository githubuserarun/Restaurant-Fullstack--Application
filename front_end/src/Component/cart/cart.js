import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../Context/context';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/header';
import BillPayment from '../BilPayment/bilPayment'
import './cart.css'

const Cart = () => {

    const navigate = useNavigate();
    const { cart, foodData, updateCart } = useContext(UserContext);
    const [orderFailed, setOrderFailled] = useState(false);
    
    const cartListItems = []

    foodData.forEach(element => {
        const check = cart.includes(element.dish_id)
        console.log(check)
        if (check) {
            const countArray = cart.filter(item => item === element.dish_id);
            for (let i = 0; i < countArray.length; i++) {
                cartListItems.push(element)
            }


        }
    });


    const addItemToCart = () => {
        navigate('/Home')
        console.log('cli')
    }

    const clearCart = () => {
        updateCart('')
    }

    const orderFail = () => {
        setOrderFailled(true)
    }


    return (

        <>
            <Header />
            <div className='bodyData' >
                <h2 className='cart_Head mt-4'>Your Cart Items</h2>
                <BillPayment dishes={cartListItems}/>
                <div className='d-flex gap-4'>
                    <button className='mt-3' onClick={addItemToCart}>Add More Items to Cart</button>
                    <button className='mt-3 bg-danger' onClick={clearCart}>Clear Cart</button>
                </div>
                <div>
                    {cart.length === 0 ?
                        (<button className='mt-3 bg-success ' onClick={orderFail}>Place Order</button>) :
                        (<button className='mt-3 bg-success'><Link to="/orderPlaced">Place Order</Link></button>)
                    }
                </div>
                <div>
                    {orderFailed && <p className='text-danger fs-xs text-center mt-2'>*Please Add Items to Cart</p>}
                </div>
            </div>

        </>
    )
}
export default Cart