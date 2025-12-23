import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import Modal from '../components/UI/Modal';
import { UserPlus, Mail, Phone } from 'lucide-react';

const Staff = () => {
    const { staff, addStaff } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newStaff, setNewStaff] = useState({ name: '', role: '', phone: '', email: '', salary: '', joiningDate: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        addStaff(newStaff);
        setIsModalOpen(false);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                <button onClick={() => setIsModalOpen(true)} className="btn btn-primary"><UserPlus size={18} /> Add Staff</button>
            </div>

            <div className="grid-3-1" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {staff.map(member => (
                    <div key={member.id} className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <img src={member.image} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} alt="" />
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{member.name}</h3>
                                <span style={{ fontSize: '0.85rem', color: '#4F46E5', background: '#E0E7FF', padding: '2px 8px', borderRadius: '12px' }}>{member.role}</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: '#6B7280' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={16} /> {member.phone}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={16} /> {member.email}</div>
                        </div>
                    </div>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Staff">
                <form onSubmit={handleSubmit}>
                    <div className="form-group"><label className="form-label">Name</label><input className="form-input" required value={newStaff.name} onChange={e => setNewStaff({ ...newStaff, name: e.target.value })} /></div>
                    <div className="form-group"><label className="form-label">Role</label><input className="form-input" required value={newStaff.role} onChange={e => setNewStaff({ ...newStaff, role: e.target.value })} /></div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', gap: '1rem' }}>
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">Cancel</button>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
export default Staff;
