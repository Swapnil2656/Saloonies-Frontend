import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
    const location = useLocation();

    // Simple helper for titles
    const getPageTitle = (pathname) => {
        const path = pathname.replace('/', '');
        return path ? path.charAt(0).toUpperCase() + path.slice(1) : 'Dashboard';
    }

    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-content-wrapper">
                <Header title={getPageTitle(location.pathname)} />
                <main className="page-content">
                    <div className="container fade-in">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
