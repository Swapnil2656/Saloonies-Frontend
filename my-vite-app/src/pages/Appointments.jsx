import React, { useState } from 'react';
import { formatCurrency } from '../utils/formatters';
import { useData } from '../context/DataContext';
import Modal from '../components/UI/Modal';
import { Plus, X, Calendar, Clock, MoreVertical, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const Appointments = () => {
    const { appointments, staff, services, customers, addAppointment, updateAppointmentStatus, deleteAppointment } = useData();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [booking, setBooking] = useState({ customerId: '', staffId: '', serviceId: '', date: new Date().toISOString().split('T')[0], time: '10:00' });

    const handleSubmit = (e) => {
        e.preventDefault();
        addAppointment({ ...booking, customerId: Number(booking.customerId), staffId: Number(booking.staffId), serviceId: Number(booking.serviceId) });
        setIsModalOpen(false);
    };

    const handleStatusChange = (id, newStatus) => {
        if (window.confirm(`Mark appointment as ${newStatus}?`)) {
            updateAppointmentStatus(id, newStatus);
        }
    };

    const handleCreateBill = (app) => {
        // Navigate with pre-filled data
        navigate('/billing', {
            state: {
                appointmentId: app.id,
                customerId: app.customerId,
                staffId: app.staffId,
                serviceId: app.serviceId
            }
        });
    };

    const statusColors = {
        'Scheduled': { bg: '#F3F4F6', text: '#4B5563' }, // Gray
        'Pending': { bg: '#FFEDD5', text: '#C2410C' },   // Orange
        'Confirmed': { bg: '#DBEAFE', text: '#1E40AF' }, // Blue
        'Completed': { bg: '#D1FAE5', text: '#065F46' }, // Green
        'Cancelled': { bg: '#FEE2E2', text: '#991B1B' }  // Red
    };

    // Sort by date/time
    const sortedAppointments = [...appointments].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Appointments</h2>
                    <p style={{ color: '#6B7280' }}>Manage bookings and status</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
                    <Plus size={18} /> New Appointment
                </button>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th style={{ paddingLeft: '24px' }}>Date & Time</th>
                                <th>Customer</th>
                                <th>Service</th>
                                <th>Staff</th>
                                <th>Status</th>
                                <th style={{ textAlign: 'right', paddingRight: '24px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedAppointments.map(app => (
                                <tr key={app.id} style={{ opacity: app.status === 'Cancelled' ? 0.6 : 1 }}>
                                    <td style={{ paddingLeft: '24px' }}>
                                        <div style={{ fontWeight: 600 }}>{format(parseISO(app.date), 'MMM dd, yyyy')}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Clock size={12} /> {app.time}
                                        </div>
                                    </td>
                                    <td>{customers.find(c => c.id === app.customerId)?.name}</td>
                                    <td>
                                        <span className="status-badge" style={{ background: '#F8FAFC', color: '#475569', border: '1px solid #E2E8F0' }}>
                                            {services.find(s => s.id === app.serviceId)?.name}
                                        </span>
                                    </td>
                                    <td style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '18px' }}>
                                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#E0E7FF', color: '#4338CA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>
                                            {staff.find(s => s.id === app.staffId)?.name.charAt(0)}
                                        </div>
                                        {staff.find(s => s.id === app.staffId)?.name}
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span
                                                className="status-badge"
                                                style={{
                                                    background: statusColors[app.status]?.bg,
                                                    color: statusColors[app.status]?.text
                                                }}
                                            >
                                                {app.status}
                                            </span>
                                            {app.isBilled && <span className="status-badge" style={{ background: '#F0FDFA', color: '#0D9488', border: '1px solid #CCFBF1' }}>BILLED</span>}
                                        </div>
                                    </td>
                                    <td style={{ textAlign: 'right', paddingRight: '24px' }}>
                                        {app.status !== 'Completed' && app.status !== 'Cancelled' && (
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                                {app.status === 'Scheduled' && (
                                                    <button onClick={() => handleStatusChange(app.id, 'Confirmed')} className="icon-btn" title="Confirm" style={{ color: '#059669' }}><CheckCircle size={18} /></button>
                                                )}
                                                {app.status === 'Confirmed' && (
                                                    <button onClick={() => handleCreateBill(app)} className="btn btn-primary" style={{ padding: '4px 12px', height: 'auto', fontSize: '0.75rem' }}>
                                                        Create Bill
                                                    </button>
                                                )}
                                                <button onClick={() => handleStatusChange(app.id, 'Cancelled')} className="icon-btn" title="Cancel" style={{ color: '#EF4444' }}><X size={18} /></button>
                                            </div>
                                        )}
                                        {app.status === 'Completed' && <span style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600 }}>Done</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Appointment">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Customer</label>
                        <select className="form-input" required value={booking.customerId} onChange={e => setBooking({ ...booking, customerId: e.target.value })}>
                            <option value="">Select Customer</option>
                            {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label className="form-label">Service</label>
                            <select className="form-input" required value={booking.serviceId} onChange={e => setBooking({ ...booking, serviceId: e.target.value })}>
                                <option value="">Select Service</option>
                                {services.map(s => <option key={s.id} value={s.id}>{s.name} - {formatCurrency(s.price)}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Staff</label>
                            <select className="form-input" required value={booking.staffId} onChange={e => setBooking({ ...booking, staffId: e.target.value })}>
                                <option value="">Select Staff</option>
                                {staff.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label className="form-label">Date</label>
                            <input className="form-input" type="date" required value={booking.date} onChange={e => setBooking({ ...booking, date: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Time</label>
                            <input className="form-input" type="time" required value={booking.time} onChange={e => setBooking({ ...booking, time: e.target.value })} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">Cancel</button>
                        <button type="submit" className="btn btn-primary">Confirm Booking</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Appointments;
