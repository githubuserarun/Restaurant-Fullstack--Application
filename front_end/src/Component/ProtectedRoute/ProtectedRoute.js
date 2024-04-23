import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookie from 'js-cookie';

const ProtectedRoute = ({ element, ...rest }) => {
    const token = Cookie.get('jwt_token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return element;
};

export default ProtectedRoute;
