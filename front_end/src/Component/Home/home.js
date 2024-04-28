import React, { useState, useEffect, useContext } from 'react';
import { Audio } from 'react-loader-spinner'
import { UserContext } from '../../Context/context';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/header';
import DishCard from '../DishCard/dishCard';
import './home.css';

const Home = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiUrl = "http://localhost:5000/Home";

    const fetchData = async () => {
        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const jsonData = await response.json();
            setLoading(false);
            const foodItemsArray = jsonData[0].foodItems;

            setData(foodItemsArray);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (data !== null) {
            passFoodData(data);

        }
    }, [data]);

    const { updateCart, storeData } = useContext(UserContext);

    

    function addToCart(item) {
        updateCart(item)
        

    }

    function passFoodData(data) {
        storeData(data);

    }

    return (

        <div>

            {loading ? (
                <div className='loader '>
                    <Audio
                        height="80"
                        width="80"
                        radius="9"
                        color="green"
                        ariaLabel="loading"
                        wrapperStyle
                        wrapperClass
                    />
                </div>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <div>
                    <div>
                        <Header />
                        <ul >
                            {data.map(item => (
                                <DishCard key={item.dish_id} dish={item}  itemsAddToCart={addToCart}/>
                                
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>

    );
};

export default Home;
