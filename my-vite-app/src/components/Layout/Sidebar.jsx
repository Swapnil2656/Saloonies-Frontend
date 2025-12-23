import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard, Scissors, Users, CalendarCheck, Package,
    UserCircle, Calendar, Receipt, BarChart3
} from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Scissors, label: 'Services', path: '/services' },
        { icon: Users, label: 'Staff', path: '/staff' },
        { icon: CalendarCheck, label: 'Attendance', path: '/attendance' },
        { icon: Package, label: 'Products', path: '/products' },
        { icon: UserCircle, label: 'Customers', path: '/customers' },
        { icon: Calendar, label: 'Appointments', path: '/appointments' },
        { icon: Receipt, label: 'Billing', path: '/billing' },
        { icon: BarChart3, label: 'Reports', path: '/reports' },
    ];

    return (
        <aside className="sidebar">
            {/* Brand */}
            <div className="nav-header">
                <div className="logo-box">S</div>
                <span className="brand-name">Saloonie</span>
            </div>

            {/* Navigation */}
            <nav className="nav-links">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `nav-item ${isActive ? 'active' : ''}`
                        }
                    >
                        <item.icon />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Footer / Pro Plan */}
            <div style={{ marginTop: 'auto', padding: '1.5rem' }}>
                <div style={{ background: '#F3F4F6', padding: '1rem', borderRadius: '12px' }}>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}>Admin Access</h4>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#6B7280' }}>Logged in as Manager</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
