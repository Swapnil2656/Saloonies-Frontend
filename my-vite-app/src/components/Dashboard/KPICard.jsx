import React from 'react';

const KPICard = ({ title, count, icon: Icon, trend }) => {
    return (
        <div className="card kpi-card">
            <div className="kpi-label">{title}</div>
            <div className="kpi-value">{count}</div>

            {trend && (
                <div className={`trend-badge ${trend > 0 ? 'trend-up' : 'trend-down'}`}>
                    {trend > 0 ? '+' : ''}{trend}%
                </div>
            )}

            <div className="kpi-icon-bx" style={{ background: '#F3F4F6', color: '#4B5563' }}>
                <Icon size={22} />
            </div>
        </div>
    );
};

export default KPICard;
