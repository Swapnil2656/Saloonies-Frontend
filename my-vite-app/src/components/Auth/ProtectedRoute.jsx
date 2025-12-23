import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const [isChecking, setIsChecking] = useState(true);
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    useEffect(() => {
        if (isLoggedIn !== 'true') {
            navigate('/login');
        } else {
            setIsChecking(false);
        }
    }, [isLoggedIn, navigate]);

    if (isChecking && isLoggedIn !== 'true') {
        return <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
            </div>
        </div>;
    }

    return isLoggedIn === 'true' ? children : null;
};

export default ProtectedRoute;
