import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import Modal from '../components/UI/Modal';
import { Plus, X, Calendar, Clock } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const Appointments = () => {
    const { appointments, staff, services, customers, addAppointment } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [booking, setBooking] = useState({ customerId: '', staffId: '', serviceId: '', date: new Date().toISOString().split('T')[0], time: '10:00' });

    const handleSubmit = (e) => {
        e.preventDefault();
        addAppointment({ ...booking, customerId: Number(booking.customerId), staffId: Number(booking.staffId), serviceId: Number(booking.serviceId), status: 'Scheduled' });
        setIsModalOpen(false);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
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
                                <th style={{ width: '50px' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map(app => (
                                <tr key={app.id}>
                                    <td style={{ paddingLeft: '24px' }}>
                                        <div style={{ fontWeight: 600 }}>{format(parseISO(app.date), 'MMM dd, yyyy')}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Clock size={12} /> {app.time}
                                        </div>
                                    </td>
                                    <td>{customers.find(c => c.id === app.customerId)?.name}</td>
                                    <td>{services.find(s => s.id === app.serviceId)?.name}</td>
                                    <td style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '18px' }}>
                                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#E5E7EB' }}></div>
                                        {staff.find(s => s.id === app.staffId)?.name}
                                    </td>
                                    <td>
                                        <span className={`status-badge ${app.status.toLowerCase()}`}>{app.status}</span>
                                    </td>
                                    <td>
                                        <button className="icon-btn"><X size={16} /></button>
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
                                {services.map(s => <option key={s.id} value={s.id}>{s.name} - ${s.price}</option>)}
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
                        <button type="submit" className="btn btn-primary">Confirm</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
export default Appointments;
