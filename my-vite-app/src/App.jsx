import React from 'react';
import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import Staff from './pages/Staff';
import Appointments from './pages/Appointments';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Attendance from './pages/Attendance';
import Billing from './pages/Billing';
import Reports from './pages/Reports';

import { DataProvider } from './context/DataContext';
import './utils/chartSetup';

function App() {
    return (
        <DataProvider>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="services" element={<Services />} />
                        <Route path="staff" element={<Staff />} />
                        <Route path="attendance" element={<Attendance />} />
                        <Route path="products" element={<Products />} />
                        <Route path="customers" element={<Customers />} />
                        <Route path="appointments" element={<Appointments />} />
                        <Route path="billing" element={<Billing />} />
                        <Route path="reports" element={<Reports />} />
                        <Route path="*" element={<Dashboard />} />
                    </Route>
                </Routes>
            </HashRouter>
        </DataProvider>
    );
}

export default App;
