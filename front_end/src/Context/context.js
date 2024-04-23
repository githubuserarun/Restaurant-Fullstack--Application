import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

function UserProvider({ children }) {
    const userNameKey = 'userName';
    const userCartKey = 'userCart';
    const foodDataKey = 'foodData';
    const userTypeKey = 'userType';
    const initialUserName = localStorage.getItem(userNameKey) || '';
    const initialUserType = localStorage.getItem(userTypeKey) || '';
    const initialCart = localStorage.getItem(userCartKey) || [];
    const [user, setUser] = useState(initialUserName);
    const [cart, setCart] = useState(initialCart);
    const [foodData, setFoodData] = useState([]);
    const [userType, setUserType] = useState(initialUserType)

    useEffect(() => {
        localStorage.setItem(userNameKey, user);
        localStorage.setItem(userCartKey, cart)
        localStorage.setItem(foodDataKey, foodData);
        localStorage.setItem(userTypeKey, userType)

    }, [user, cart, foodData, userType]);



    const updateUser = (newUser) => {
        if (newUser === '') {
            setUser('')
        } else {
            const cap_user = (newUser.name)
            setUser(cap_user.charAt(0).toUpperCase() + cap_user.slice(1));
        }
    };

    const updateCart = (itemId) => {
        if (itemId === '') {
            localStorage.setItem(userCartKey, null)
            setCart([])
        } else {
            setCart([...cart, itemId])

        }
    }

    const storeData = (data) => {
        if (data === '') {
            setFoodData([])
        } else {
            setFoodData(data);
        }

    }

    const updateUserType = (type) => {
        setUserType(type)
    }


    return (
        <UserContext.Provider value={{ user, updateUser, cart, updateCart, foodData, storeData, userType, updateUserType }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };
