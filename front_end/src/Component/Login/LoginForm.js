import React, { useEffect, useState, useContext } from 'react';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/context';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginForm.css';
const LoginForm = () => {
    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const { updateUser, updateUserType } = useContext(UserContext);

    const navigate = useNavigate();
    const token = Cookies.get('jwt_token');

    const handleLoginSuccess = (jwtToken) => {
        console.log('received login succ')
        updateUser({ name: username });

        if (!token) {
            Cookies.set('jwt_token', jwtToken, {
                expires: 10,
            })
            navigate('/Home');
        }
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    useEffect(() => {
        if (token !== undefined) {
            navigate('/Home');
        }
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form submitted:');
        console.log('Email:', username);
        console.log('Password:', password);


        const requestData = {
            username,
            password,
        };

        try {
            const url = "http://localhost:5000/login";
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            }
            const response = await fetch(url, options);

            if (response.ok) {
                const data = await response.json();
                console.log(data.type)
                console.log('Login successful:', data.message);
                setError('');
                setUser('');
                setPassword('');
                updateUserType(data.type)
                handleLoginSuccess(data.jwtToken);

            } else {

                const errorData = await response.json();
                setError(errorData.error);
                console.error('Login failed:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className='body'>
            <div className="login-form-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUser(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                    {error !== "" ? <p className='text-danger text-center fs-xs mb-0'>*{error}</p> : null}
                    <button className="mt-2 bg-info" type="button" onClick={handleSignup}>Register</button>
                </form>
            </div>
        </div>
    );




};

export default LoginForm;
