import React from 'react';

const KPICard = ({ title, count, icon: Icon, trend }) => {
    return (
        <div className="card kpi-card gradient-overlay">
            <div className="kpi-label">{title}</div>
            <div className="kpi-value">{count}</div>

            {trend !== undefined && (
                <div className={`trend-badge ${trend > 0 ? 'trend-up' : trend < 0 ? 'trend-down' : ''}`}>
                    {trend > 0 ? '+' : ''}{trend}%
                </div>
            )}

            <div className="kpi-icon-bx" style={{ 
                background: 'linear-gradient(135deg, var(--primary), var(--accent))', 
                color: 'white',
                boxShadow: 'var(--shadow-glow)'
            }}>
                <Icon size={22} />
            </div>
        </div>
    );
};

export default KPICard;
