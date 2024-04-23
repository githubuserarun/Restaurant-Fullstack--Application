import 'bootstrap/dist/css/bootstrap.min.css';
import './adminpanel.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const AdminPanel = () => {

    const [userData, setUserData] = useState([]);
    const [foodData, setFoodData] = useState([]);
    const [userView, setUserView] = useState(false);
    const [foodView, setFoodView] = useState(false);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/admin-panel');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const jsonData = await response.json();
            setUserData(jsonData.userData);
            setFoodData(jsonData.foodData[0].foodItems);
        } catch (err) {
            console.log(err.message);
        }
    };

    const makeAdmin = async (username) => {
        const makeAdminConfirmed = window.confirm("Are you sure you want to Make as Admin?");
        if (makeAdminConfirmed) {

            const requestData = {
                username,
            }
            try {
                const response = await fetch('http://localhost:5000/admin-panel/make-admin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                });

                const data = await response.json();
                console.log('resdata', data)
            }
            catch (err) {
                console.log('admin err:', err);
            }


        }

    }

    const makeUser = async (username) => {
        const makeUserConfirmed = window.confirm("Are you sure you want to Make as Admin?");

        if (makeUserConfirmed) {
            const requestData = {
                username,
            }
            try {
                const response = await fetch('http://localhost:5000/admin-panel/make-user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                });

                const data = await response.json();
                console.log('resdata', data)
            }
            catch (err) {
                console.log('admin err:', err);
            }


        }

    }

    useEffect(() => {
        fetchData();
    }, [userView,foodView,userData,foodData])


    return (
        <>
            <div className='admin_header'>
                <h2 className=' p-2 fs-1 text-bold'>Admin Panel</h2>
            </div>
            <div className='d-flex gap-4 m-4'>
                <button className='bg-success' onClick={() => (setUserView(!userView),setFoodView(false))}>User Data</button>
                <button className='bg-success' onClick={() => (setFoodView(!foodView),setUserView(false))}>Food Data</button>
            </div>
            {userView &&
                <div>
                    <h2 className='cart_Head mt-4'>User Details</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>User Id</th>
                                <th>User Name</th>
                                <th>User G-mail</th>
                                <th>Modify</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map(each => (
                                <tr>
                                    <td>{each._id}</td>
                                    <td>{each.username}</td>
                                    <td>{each.email}</td>
                                    <td>{each.type !== 'admin' ? (
                                        <button className='bg-danger' onClick={() => makeAdmin(each.username)}>Make as Admin</button>
                                    ) :
                                        <button onClick={() => makeUser(each.username)} className='bg-success'>Make as User</button>}</td>
                                </tr>
                            ))}


                        </tbody>
                    </table>

                </div>
            }
            {foodView &&
                <div>
                    <h2 className='cart_Head mt-4'>Food Users</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Food Id</th>
                                <th>Dish Name</th>
                                <th>Dish Image</th>
                                <th>Dish Price</th>
                                <th>Dish Calories</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foodData.map(each => (
                                <tr>
                                    <td>{each.dish_id}</td>
                                    <td>{each.dish_name}</td>
                                    <td><img className='cartimg text-center' src={each.dish_image}/></td>
                                    <td>{each.dish_price}</td>
                                    <td>{each.dish_calories}</td>
                                    
                                </tr>
                            ))}


                        </tbody>
                    </table>

                </div>
            }
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <Link to="/Home" className="btn btn-secondary mt-5">Back to Home</Link>
            </div>

        </>
    )
}
export default AdminPanel;