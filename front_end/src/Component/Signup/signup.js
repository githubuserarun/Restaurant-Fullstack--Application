import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signup.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameStatus, setUsernameStatus] = useState('');
    const [passwordStatus, setPasswordStatus] = useState('');
    const [gmailStatus, setGmailStatus] = useState('');
    const [err, setErr] = useState('')

    const navigate = useNavigate();

    function isPasswordEligible(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/;
        const hasLowerCase = /[a-z]/;
        const hasNumber = /\d/;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

        if (password.length < minLength) {
            setPasswordStatus('Password should be a minimum of 8 characters.');
            return false;
        }
        if (!hasUpperCase.test(password)) {
            setPasswordStatus('Password should have a minimum of one uppercase letter.');
            return false;
        }
        if (!hasLowerCase.test(password)) {
            setPasswordStatus('Password should have a minimum of one lowercase letter.');
            return false;
        }
        if (!hasNumber.test(password)) {
            setPasswordStatus('Password should have at least one digit.');
            return false;
        }
        if (!hasSpecialChar.test(password)) {
            setPasswordStatus('Password should have a minimum of one special character.');
            return false;
        }

        setPasswordStatus('');
        return true;
    }

    function isGmailEligible(email) {
        const res = email.endsWith('@gmail.com');
        if (res) {
            setGmailStatus('');
        } else {
            setGmailStatus('Please enter a correct Gmail ID.');
        }
        return res;
    }

    function isUsernameEligible(name) {
        const res = name.length > 5;
        if (res) {
            setUsernameStatus('');
        } else {
            setUsernameStatus('Please enter a minimum of 6 characters for the username.');
        }
        return res;
    }

    const handleSignupSuccess = () => {
        navigate('/Home');
    };

    const handleSignin = (event) => {
        event.preventDefault();
        navigate('/login');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isPasswordEligible(password) && isGmailEligible(email) && isUsernameEligible(username)) {
            const requestData = {
                username,
                email,
                password,
            };

            try {
                const response = await fetch('http://localhost:5000/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                });

                const data = await response.json();
                console.log(response)
                if (response.status === 200) {
                    console.log('Registration successful:', data);
                    handleSignupSuccess();
                } else {
                    console.error('Registration failed:', data);
                    setErr(data.message);

                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className='body w-100'>
            <div className="registration-page">
                <h1>User Registration</h1>
                <form className="registration-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        {usernameStatus && <p className='text-danger fs-xs mb-0'>*{usernameStatus}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {gmailStatus && <p className='text-danger fs-xs mb-0'>*{gmailStatus}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {passwordStatus && <p className='text-danger fs-xs mb-0'>*{passwordStatus}</p>}
                    </div>
                    {err !== '' && <p className='text-danger text-center fs-xs mb-0'>*{err}</p>}
                    <button className='bg-info' type="submit">Register</button>
                    <button className='bg-primary mt-2' type="button" onClick={handleSignin}>Signin</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
