import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    useEffect(() => {
        if (isLoggedIn !== 'true') {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    return isLoggedIn === 'true' ? children : null;
};

export default ProtectedRoute;
