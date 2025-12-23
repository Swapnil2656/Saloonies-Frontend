import React from 'react';
import { useData } from '../context/DataContext';
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
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { display: false } },
            y: { border: { display: false } }
        }
    };

    const lineData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Revenue',
            data: [1200, 1900, 1500, 2200, 2800, 3500, 2000],
            borderColor: '#4F46E5', backgroundColor: 'rgba(79, 70, 229, 0.1)', fill: true, tension: 0.4
        }]
    };

    const pieData = {
        labels: ['Hair', 'Nails', 'All'],
        datasets: [{
            data: [50, 30, 20], backgroundColor: ['#4F46E5', '#EF4444', '#10B981'], borderWidth: 0
        }]
    };

    return (
        <div>
            {/* 4 KPIs */}
            <div className="grid-4">
                <KPICard title="Total Revenue" count={`$${totalRevenue.toLocaleString()}`} icon={DollarSign} trend={12} />
                <KPICard title="Appointments" count={appointments.length} icon={CalendarCheck} trend={8} />
                <KPICard title="Active Staff" count={staff.length} icon={Users} trend={0} />
                <KPICard title="Total Customers" count={customers.length} icon={Users} trend={15} />
            </div>

            {/* Charts Section */}
            <div className="grid-3-1">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Revenue Trends</h3>
                    </div>
                    <div style={{ height: '300px' }}>
                        <Line data={lineData} options={lineOptions} />
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Services</h3>
                    </div>
                    <div style={{ height: '200px', display: 'flex', justifyContent: 'center' }}>
                        <Doughnut data={pieData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>
            </div>

            {/* Tables Section */}
            <div className="grid-2">
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
                                            <td style={{ textAlign: 'right' }}>${service?.price}</td>
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
                            <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <img src={s.image} style={{ width: '40px', height: '40px', borderRadius: '50%' }} alt="" />
                                    <div>
                                        <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{s.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>{s.role}</div>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: 'bold' }}>$1,250</div>
                                    <div style={{ fontSize: '0.75rem', color: '#10B981' }}>+12%</div>
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
