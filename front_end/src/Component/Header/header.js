import React, { useContext } from 'react';
import Cookies from 'js-cookie'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './header.css';

const Header = () => {
    const navigate = useNavigate();
    const { user, updateUser, updateCart, storeData, cart, userType } = useContext(UserContext);
    console.log(cart)
    console.log('userType:' + userType)

    const cartCount = cart.length

    const handleLogout = () => {

        const logoutConfirmed = window.confirm("Are you sure you want to log out?");
        if (logoutConfirmed) {
            updateUser('');
            updateCart('');
            storeData('');
            Cookies.remove('jwt_token')
            navigate('/login');
            console.log("Logout confirmed");
        }


    };

    const adminPanel = () => {
        navigate('/admin-panel');
    }

    const goToCart = () => {
        navigate('/cart')
    }

    return (
        <header className="header">
            <div className='userName d-flex flex-column '>
                <div>
                    <p ><FontAwesomeIcon icon={faUser} size="1x" />{user}</p>
                </div>
                <div>{userType === 'admin' &&
                    <button onClick={adminPanel} className='admin_btn'>Admin Panel</button>}</div>
            </div>


            <div className="restaurant-name">
                <h1 className='fw-bold'>AK Restaurant</h1>
            </div>
            <div className='d-flex gap-3' >
                <button onClick={goToCart} className='cart '><FontAwesomeIcon icon={faShoppingCart} size="2x" /><span className='border-0'>{cartCount}</span></button>
                <button className='logOut' type='button' onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} size="2x" /></button>
            </div>


        </header>
    );
};

export default Header;
