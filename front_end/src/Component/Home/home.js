import React, { useState, useEffect, useContext } from 'react';
import { Audio } from 'react-loader-spinner'
import { UserContext } from '../../Context/context';
import Header from '../Header/header';
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
                                <li key={item.dish_id} >
                                    <div className='itemCard'>
                                        <div className='w-100 cardDetails '>
                                            <div>
                                                <h2 className='food-name'>{item.dish_name}</h2>
                                                <p><b>Price:</b> {item.dish_price} {item.dish_currency}</p>
                                                <p><b>Calories:</b> {item.dish_calories}</p>
                                                <p><b>Description:</b> {item.dish_description}</p>
                                            </div>
                                            <div>
                                                <img className='foodImage' src={item.dish_image} alt={item.dish_name} />
                                            </div>

                                        </div>
                                        <div className='mt-2 addBtn'>
                                            <button onClick={() => addToCart(item.dish_id)}> Add To Cart</button>
                                        </div>

                                    </div>


                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>

    );
};

export default Home;
