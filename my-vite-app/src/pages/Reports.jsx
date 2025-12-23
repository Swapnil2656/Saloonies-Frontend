import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { formatCurrency } from '../utils/formatters';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { TrendingUp, FileText, PieChart, Download } from 'lucide-react';

const Reports = () => {
    const { invoices, staff } = useData();
    const [filter, setFilter] = useState('All Time');

    // --- Aggregations ---
    const totalRev = invoices.reduce((a, b) => a + b.total, 0);
    const totalCGST = invoices.reduce((a, b) => a + (b.cgst || 0), 0);
    const totalSGST = invoices.reduce((a, b) => a + (b.sgst || 0), 0);
    const totalIGST = invoices.reduce((a, b) => a + (b.igst || 0), 0);
    const totalTax = totalCGST + totalSGST + totalIGST;

    // --- Data Prep for Charts ---

    // 1. Revenue & Tax Timeline (Group by Date)
    const groupedByDate = invoices.reduce((acc, curr) => {
        const d = curr.date; // assuming YYYY-MM-DD
        if (!acc[d]) acc[d] = { revenue: 0, tax: 0 };
        acc[d].revenue += curr.total;
        acc[d].tax += curr.totalGst;
        return acc;
    }, {});

    // Sort dates
    const sortedDates = Object.keys(groupedByDate).sort();

    const lineData = {
        labels: sortedDates,
        datasets: [
            {
                label: 'Total Revenue',
                data: sortedDates.map(d => groupedByDate[d].revenue),
                borderColor: '#4F46E5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                fill: true,
                tension: 0.4
            },
            {
                label: 'GST Collected',
                data: sortedDates.map(d => groupedByDate[d].tax),
                borderColor: '#EA580C',
                backgroundColor: 'transparent',
                borderDash: [5, 5],
                tension: 0.4
            }
        ]
    };

    // 2. GST Breakdown Pie
    const pieData = {
        labels: ['CGST (2.5%)', 'SGST (2.5%)', 'IGST (5%)'],
        datasets: [{
            data: [totalCGST, totalSGST, totalIGST],
            backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'],
            borderWidth: 0
        }]
    };

    // 3. Staff Contribution Bar
    const staffStats = staff.map(s => {
        const amt = invoices.filter(inv => inv.staffId === s.id).reduce((a, b) => a + b.total, 0);
        return { name: s.name, amount: amt };
    });

    const barData = {
        labels: staffStats.map(s => s.name),
        datasets: [{
            label: 'Revenue',
            data: staffStats.map(s => s.amount),
            backgroundColor: '#6366F1',
            borderRadius: 6
        }]
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Analytics Dashboard</h2>
                    <p style={{ color: '#6B7280' }}>Financial performance and GST reports</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <select className="form-input" style={{ width: '150px' }} value={filter} onChange={e => setFilter(e.target.value)}>
                        <option>All Time</option>
                        <option>This Month</option>
                        <option>Today</option>
                    </select>
                    <button className="btn btn-secondary">
                        <Download size={16} /> Export
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid-4">
                <div className="card" style={{ gap: '0.5rem', borderLeft: '4px solid #4F46E5' }}>
                    <div style={{ color: '#6B7280', fontSize: '0.8rem', fontWeight: 600 }}>TOTAL REVENUE</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 700 }}>{formatCurrency(totalRev)}</div>
                </div>
                <div className="card" style={{ gap: '0.5rem', borderLeft: '4px solid #F59E0B' }}>
                    <div style={{ color: '#6B7280', fontSize: '0.8rem', fontWeight: 600 }}>TOTAL GST</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 700 }}>{formatCurrency(totalTax)}</div>
                </div>
                <div className="card" style={{ gap: '0.5rem', borderLeft: '4px solid #10B981' }}>
                    <div style={{ color: '#6B7280', fontSize: '0.8rem', fontWeight: 600 }}>CGST + SGST</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 700 }}>{formatCurrency(totalCGST + totalSGST)}</div>
                </div>
                <div className="card" style={{ gap: '0.5rem', borderLeft: '4px solid #3B82F6' }}>
                    <div style={{ color: '#6B7280', fontSize: '0.8rem', fontWeight: 600 }}>IGST COLLECTED</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 700 }}>{formatCurrency(totalIGST)}</div>
                </div>
            </div>

            <div className="grid-3-1">
                {/* Revenue Line Chart */}
                <div className="card">
                    <div className="card-header"><h3 className="card-title">Revenue & Tax Overview</h3></div>
                    <div style={{ height: '300px' }}>
                        <Line data={lineData} options={{
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { position: 'top' },
                                tooltip: { callbacks: { label: (c) => c.dataset.label + ': ' + formatCurrency(c.parsed.y) } }
                            },
                            scales: { y: { ticks: { callback: (v) => formatCurrency(v) } } }
                        }} />
                    </div>
                </div>

                {/* GST Pie Chart */}
                <div className="card">
                    <div className="card-header"><h3 className="card-title">GST Breakdown</h3></div>
                    <div style={{ height: '250px', display: 'flex', justifyContent: 'center' }}>
                        <Doughnut data={pieData} options={{
                            maintainAspectRatio: false,
                            plugins: { tooltip: { callbacks: { label: (c) => c.label + ': ' + formatCurrency(c.parsed) } } }
                        }} />
                    </div>
                    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#3B82F6' }}>● CGST</span> <span>{formatCurrency(totalCGST)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#10B981' }}>● SGST</span> <span>{formatCurrency(totalSGST)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#F59E0B' }}>● IGST</span> <span>{formatCurrency(totalIGST)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Staff Performance Bar */}
            <div className="card">
                <div className="card-header"><h3 className="card-title">Revenue by Staff Member</h3></div>
                <div style={{ height: '250px' }}>
                    <Bar data={barData} options={{
                        maintainAspectRatio: false,
                        plugins: { tooltip: { callbacks: { label: (c) => c.dataset.label + ': ' + formatCurrency(c.parsed.y) } } },
                        scales: { y: { ticks: { callback: (v) => formatCurrency(v) } } }
                    }} />
                </div>
            </div>
        </div>
    );
};

export default Reports;
