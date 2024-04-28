import React,{useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const DishCard = props => {

    const [showPopup, setShowPopup] = useState(false);

    const {dish,itemsAddToCart} = props;
    const{
        dish_id,
        dish_name,
        dish_price,
        dish_currency,
        dish_calories,
        dish_description,
        dish_image,
    } = dish

    function addToCart(id){
        itemsAddToCart(id);
        setShowPopup(true);

        setTimeout(() => {
            setShowPopup(false);
        }, 1500);
    }

    function PopupMessage({ message, onClose }) {
        return (
            <div className="popup-message">
                <div className="popup-content">
                    <p>{message}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <li key={dish_id} >
                <div className='itemCard'>
                    <div className='w-100 cardDetails '>
                        <div>
                            <h2 className='food-name'>{dish_name}</h2>
                            <p><b>Price:</b> {dish_price} {dish_currency}</p>
                            <p><b>Calories:</b> {dish_calories}</p>
                            <p><b>Description:</b> {dish_description}</p>
                        </div>
                        <div>
                            <img className='foodImage' src={dish_image} alt={dish_name} />
                        </div>

                    </div>
                    <div className='mt-2 addBtn d-flex flex-column justify-content-center '>
                        <div className='text-center text-success '>
                            {showPopup && (
                                <PopupMessage
                                    message="Item added to cart!"
                                    onClose={() => setShowPopup(false)}
                                />
                            )}

                        </div>

                        <button className='bg-success addBtn' onClick={() => addToCart(dish_id)}> Add To Cart</button>
                    </div>

                </div>
            </li>
        </>
    )



}
export default DishCard