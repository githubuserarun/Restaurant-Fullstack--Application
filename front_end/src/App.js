import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { UserProvider } from './Context/context'
import Home from './Component/Home/home';
import Login from './Component/Login/LoginForm';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import Signup from './Component/Signup/signup';
import Cart from './Component/cart/cart';
import AdminPanel from './Component/AdminPanel/adminpanel';
import OrderSuccessPage from './Component/SuccessfullyPlaced/successfullyPlaced';

function NotFoundRedirect() {
    const navigate = useNavigate();
    React.useEffect(() => {
        navigate('/login');
    }, [navigate]);

}

function App() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/home"
                        element={
                            <ProtectedRoute element={<Home />} />
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <ProtectedRoute element={<Cart />} />
                        }
                    />
                    <Route
                        path="/admin-panel"
                        element={
                            <ProtectedRoute element={<AdminPanel />} />
                        }
                    />
                    
                    <Route path="*" element={<NotFoundRedirect />} />
                    <Route path="/orderPlaced" element={<OrderSuccessPage />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
