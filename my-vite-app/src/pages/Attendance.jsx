import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Check, X, Calendar, UserCheck, UserX, Users } from 'lucide-react';
import { format } from 'date-fns';

const Attendance = () => {
    const { staff, attendance, markAttendance } = useData();
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const getStatus = (staffId) => {
        const record = attendance.find(a => a.date === selectedDate && a.staffId === staffId);
        return record ? record.status : 'Absent'; // Default to Absent if no record
    };

    const handleToggle = (staffId, currentStatus) => {
        const newStatus = currentStatus === 'Present' ? 'Absent' : 'Present';
        markAttendance(selectedDate, staffId, newStatus);
    };

    // Stats for the selected date
    const dailyAttendance = attendance.filter(a => a.date === selectedDate);
    // If a staff member has no record, they are absent by default logic above, but better to count explicitly if we want stats
    // Let's rely on the record existence or a unified list
    const presentCount = staff.filter(s => getStatus(s.id) === 'Present').length;
    const absentCount = staff.length - presentCount;

    return (
        <div>
            {/* Header / Date Picker */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '10px', background: '#E0E7FF', borderRadius: '12px', color: '#4F46E5' }}>
                        <Calendar size={24} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Attendance</h2>
                        <span style={{ color: '#6B7280', fontSize: '0.9rem' }}>{format(new Date(selectedDate), 'EEEE, MMMM do, yyyy')}</span>
                    </div>
                </div>
                <input
                    type="date"
                    className="form-input"
                    style={{ width: 'auto' }}
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                />
            </div>

            {/* Summary Cards */}
            <div className="grid-3-1" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '2rem' }}>
                <div className="card" style={{ flexDirection: 'row', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ padding: '12px', borderRadius: '50%', background: '#F3F4F6', color: '#4B5563' }}><Users size={24} /></div>
                    <div>
                        <div style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: 600 }}>TOTAL STAFF</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{staff.length}</div>
                    </div>
                </div>
                <div className="card" style={{ flexDirection: 'row', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ padding: '12px', borderRadius: '50%', background: '#D1FAE5', color: '#059669' }}><UserCheck size={24} /></div>
                    <div>
                        <div style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: 600 }}>PRESENT</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#059669' }}>{presentCount}</div>
                    </div>
                </div>
                <div className="card" style={{ flexDirection: 'row', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ padding: '12px', borderRadius: '50%', background: '#FEE2E2', color: '#DC2626' }}><UserX size={24} /></div>
                    <div>
                        <div style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: 600 }}>ABSENT</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#DC2626' }}>{absentCount}</div>
                    </div>
                </div>
            </div>

            {/* Attendance Table */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th style={{ paddingLeft: '24px' }}>Staff Member</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th style={{ textAlign: 'right', paddingRight: '24px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staff.map(member => {
                                const status = getStatus(member.id);
                                const isPresent = status === 'Present';
                                return (
                                    <tr key={member.id}>
                                        <td style={{ paddingLeft: '24px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <img src={member.image} style={{ width: '36px', height: '36px', borderRadius: '50%' }} alt="" />
                                                <span style={{ fontWeight: 600 }}>{member.name}</span>
                                            </div>
                                        </td>
                                        <td>{member.role}</td>
                                        <td>
                                            <span className={`status-badge ${isPresent ? 'completed' : 'scheduled'}`} style={{
                                                background: isPresent ? '#D1FAE5' : '#FEE2E2',
                                                color: isPresent ? '#065F46' : '#991B1B'
                                            }}>
                                                {status}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'right', paddingRight: '24px' }}>
                                            <button
                                                onClick={() => handleToggle(member.id, status)}
                                                className={`btn ${isPresent ? 'btn-secondary' : 'btn-primary'}`}
                                                style={{ padding: '6px 16px', fontSize: '0.8rem' }}
                                            >
                                                {isPresent ? 'Mark Absent' : 'Mark Present'}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
