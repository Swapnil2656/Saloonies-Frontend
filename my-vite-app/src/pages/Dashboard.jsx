import React from 'react';
import { useData } from '../context/DataContext';
import { formatCurrency } from '../utils/formatters';
import KPICard from '../components/Dashboard/KPICard';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { Users, DollarSign, CalendarCheck, Scissors, MoreHorizontal } from 'lucide-react';

const Dashboard = () => {
    const { appointments, services, staff, customers } = useData();

    // --- Calculations (Mock Logic) ---
    const totalRevenue = appointments.reduce((acc, a) => {
        const s = services.find(srv => srv.id === a.serviceId);
        return acc + (s ? s.price : 0);
    }, 0);

    // Charts Config
    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { 
            legend: { display: false }
        },
        scales: {
            x: { 
                grid: { 
                    display: false 
                },
                ticks: {
                    color: '#94a3b8'
                }
            },
            y: { 
                border: { 
                    display: false 
                },
                grid: {
                    color: '#1e1e1e'
                },
                ticks: {
                    color: '#94a3b8'
                }
            }
        }
    };

    const lineData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Revenue',
            data: [1200, 1900, 1500, 2200, 2800, 3500, 2000],
            borderColor: '#6366f1', 
            backgroundColor: 'rgba(99, 102, 241, 0.1)', 
            fill: true, 
            tension: 0.4,
            borderWidth: 2,
            pointBackgroundColor: '#6366f1',
            pointBorderColor: '#6366f1',
            pointHoverBackgroundColor: '#06b6d4'
        }]
    };

    const pieData = {
        labels: ['Hair', 'Nails', 'Spa'],
        datasets: [{
            data: [50, 30, 20], 
            backgroundColor: ['#6366f1', '#06b6d4', '#10b981'], 
            borderWidth: 0
        }]
    };

    return (
        <div className="w-full max-w-none">
            {/* 4 KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
                <KPICard title="Total Revenue" count={formatCurrency(totalRevenue)} icon={DollarSign} trend={12} />
                <KPICard title="Appointments" count={appointments.length} icon={CalendarCheck} trend={8} />
                <KPICard title="Active Staff" count={staff.length} icon={Users} trend={0} />
                <KPICard title="Total Customers" count={customers.length} icon={Users} trend={15} />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6 mb-6">
                <div className="xl:col-span-2 card">
                    <div className="card-header">
                        <h3 className="card-title">Revenue Trends</h3>
                    </div>
                    <div style={{ height: '300px' }}>
                        {totalRevenue > 0 && <Line key={JSON.stringify(lineData)} data={lineData} options={lineOptions} />}
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Services</h3>
                    </div>
                    <div style={{ height: '200px', display: 'flex', justifyContent: 'center' }}>
                        <Doughnut key={JSON.stringify(pieData)} data={pieData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>
            </div>

            {/* Tables Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {/* Recent Appointments */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Recent Appointments</h3>
                        <button className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '12px' }}>View All</button>
                    </div>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Service</th>
                                    <th>Status</th>
                                    <th style={{ textAlign: 'right' }}>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.slice(0, 5).map(app => {
                                    const customer = customers.find(c => c.id === app.customerId);
                                    const service = services.find(s => s.id === app.serviceId);
                                    return (
                                        <tr key={app.id}>
                                            <td>{customer?.name}</td>
                                            <td>{service?.name}</td>
                                            <td>
                                                <span className={`status-badge ${app.status.toLowerCase()}`}>
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td style={{ textAlign: 'right' }}>{formatCurrency(service?.price)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Staff Performance */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Top Staff</h3>
                    </div>
                    <div>
                        {staff.slice(0, 4).map(s => (
                            <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <img src={s.image} style={{ width: '40px', height: '40px', borderRadius: '50%' }} alt="" />
                                    <div>
                                        <div style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-main)' }}>{s.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.role}</div>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>{formatCurrency(1250)}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>+12%</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
