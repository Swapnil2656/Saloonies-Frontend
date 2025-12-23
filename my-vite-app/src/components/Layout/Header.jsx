import React from 'react';
import { Bell, Search } from 'lucide-react';

const Header = ({ title }) => {
    return (
        <header className="top-header">
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0 }}>{title}</h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                {/* Search Input */}
                <div style={{ position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                    <input
                        type="text"
                        placeholder="Search..."
                        style={{
                            paddingLeft: '40px',
                            paddingRight: '16px',
                            paddingTop: '8px',
                            paddingBottom: '8px',
                            border: '1px solid #E5E7EB',
                            borderRadius: '20px',
                            width: '250px',
                            fontSize: '0.875rem'
                        }}
                    />
                </div>

                {/* Profile / Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button className="icon-btn">
                        <Bell size={20} />
                    </button>
                    <div style={{ width: '1px', height: '24px', background: '#E5E7EB' }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            width: '32px', height: '32px', borderRadius: '50%',
                            background: '#E0E7FF', color: '#4F46E5',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 'bold', fontSize: '0.8rem'
                        }}>
                            AD
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
