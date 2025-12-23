import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { formatCurrency } from '../utils/formatters';
import Modal from '../components/UI/Modal';
import { Plus, Search, Trash2, Edit2, Clock } from 'lucide-react';

const Services = () => {
    const { services, addService, deleteService } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [newService, setNewService] = useState({ name: '', category: '', price: '', duration: '' });

    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        addService({ ...newService, price: Number(newService.price), duration: Number(newService.duration) });
        setNewService({ name: '', category: '', price: '', duration: '' });
        setIsModalOpen(false);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                    <input
                        className="form-input"
                        style={{ width: '300px', paddingLeft: '40px' }}
                        placeholder="Search services..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
                    <Plus size={18} /> Add Service
                </button>
            </div>

            <div className="grid-4">
                {filteredServices.map((service) => (
                    <div key={service.id} className="card" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span className="status-badge confirmed" style={{ fontSize: '0.7rem' }}>{service.category}</span>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button className="icon-btn"><Edit2 size={16} /></button>
                                <button onClick={() => deleteService(service.id)} className="icon-btn" style={{ color: '#EF4444' }}><Trash2 size={16} /></button>
                            </div>
                        </div>

                        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem' }}>{service.name}</h3>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F3F4F6', paddingTop: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#6B7280' }}>
                                <Clock size={16} /> {service.duration}m
                            </div>
                            <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{formatCurrency(service.price)}</div>
                        </div>
                    </div>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Service">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Service Name</label>
                        <input className="form-input" required value={newService.name} onChange={e => setNewService({ ...newService, name: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Category</label>
                        <input className="form-input" required value={newService.category} onChange={e => setNewService({ ...newService, category: e.target.value })} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label className="form-label">Price (₹)</label>
                            <input type="number" className="form-input" required value={newService.price} onChange={e => setNewService({ ...newService, price: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Duration (m)</label>
                            <input type="number" className="form-input" required value={newService.duration} onChange={e => setNewService({ ...newService, duration: e.target.value })} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">Cancel</button>
                        <button type="submit" className="btn btn-primary">Create Service</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
export default Services;
