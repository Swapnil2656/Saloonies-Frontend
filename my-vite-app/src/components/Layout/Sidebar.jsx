import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard, Scissors, Users, CalendarCheck, Package,
    UserCircle, Calendar, Receipt, BarChart3, X, LogOut
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
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
        <>
            {/* Overlay for Mobile */}
            <div
                className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
                onClick={onClose}
            ></div>

            {/* Sidebar */}
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                {/* Brand */}
                <div className="nav-header" style={{ justifyContent: 'center', padding: '1.5rem 0' }}>
                    <h1 style={{
                        margin: 0,
                        fontSize: '1.5rem',
                        fontWeight: '800',
                        background: 'linear-gradient(45deg, #4F46E5, #9333EA)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.5px'
                    }}>
                        Saloonies
                    </h1>
                    {/* Close button for mobile */}
                    <button
                        className="icon-btn hidden-desktop"
                        onClick={onClose}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="nav-links">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={onClose} // Auto close on mobile nav
                            className={({ isActive }) =>
                                `nav-item ${isActive ? 'active' : ''}`
                            }
                        >
                            <item.icon />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Footer */}
                <div style={{ marginTop: 'auto', padding: '1.5rem' }}>
                    <div style={{ background: '#F3F4F6', padding: '1rem', borderRadius: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <h4 style={{ margin: 0, fontSize: '0.9rem' }}>Admin Access</h4>
                            <button
                                onClick={() => {
                                    if (window.confirm('Are you sure you want to logout?')) {
                                        localStorage.removeItem('isLoggedIn');
                                        window.location.href = '/login';
                                    }
                                }}
                                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#EF4444', padding: 0 }}
                                title="Logout"
                            >
                                <LogOut size={16} />
                            </button>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#6B7280' }}>Logged in as Manager</p>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
