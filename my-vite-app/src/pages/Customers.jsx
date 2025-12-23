import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import Modal from '../components/UI/Modal';
import { Plus, Search, Mail, Phone } from 'lucide-react';

const Customers = () => {
    const { customers, addCustomer } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', email: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        addCustomer(newCustomer);
        setIsModalOpen(false);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                    <input className="form-input" style={{ width: '300px', paddingLeft: '40px' }} placeholder="Search customers..." />
                </div>
                <button onClick={() => setIsModalOpen(true)} className="btn btn-primary"><Plus size={18} /> Add Customer</button>
            </div>

            <div className="grid-3-1" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {customers.map(c => (
                    <div key={c.id} className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{c.name.charAt(0)}</div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1rem' }}>{c.name}</h3>
                                <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>Customer #{c.id}</span>
                            </div>
                        </div>
                        <div style={{ fontSize: '0.9rem', color: '#6B7280' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}><Phone size={14} /> {c.phone}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={14} /> {c.email}</div>
                        </div>
                    </div>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Customer">
                <form onSubmit={handleSubmit}>
                    <div className="form-group"><label className="form-label">Name</label><input className="form-input" required value={newCustomer.name} onChange={e => setNewCustomer({ ...newCustomer, name: e.target.value })} /></div>
                    <div className="form-group"><label className="form-label">Phone</label><input className="form-input" required value={newCustomer.phone} onChange={e => setNewCustomer({ ...newCustomer, phone: e.target.value })} /></div>
                    <div className="form-group"><label className="form-label">Email</label><input className="form-input" required value={newCustomer.email} onChange={e => setNewCustomer({ ...newCustomer, email: e.target.value })} /></div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', gap: '1rem' }}>
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">Cancel</button>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
export default Customers;
