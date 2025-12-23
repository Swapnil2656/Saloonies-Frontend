import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import Modal from '../components/UI/Modal';
import { Plus, Printer, Eye, MapPin } from 'lucide-react';
import { format } from 'date-fns';

const INDIAN_STATES = ['Delhi', 'Maharashtra', 'Karnataka', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Rajasthan'];

const Billing = () => {
    const { invoices, customers, services, products, staff, addInvoice } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Invoice Form State
    const [invData, setInvData] = useState({
        customerId: '',
        staffId: '',
        salonState: 'Delhi',
        customerState: 'Delhi',
        selectedServices: [],
        selectedProducts: []
    });

    const calculateTotals = () => {
        let subtotal = 0;

        invData.selectedServices.forEach(id => {
            const s = services.find(x => x.id === parseInt(id));
            if (s) subtotal += s.price;
        });

        invData.selectedProducts.forEach(id => {
            const p = products.find(x => x.id === parseInt(id));
            if (p) subtotal += p.price;
        });

        const isInterstate = invData.salonState !== invData.customerState;
        const gstRate = 0.05; // 5%

        let cgst = 0, sgst = 0, igst = 0;

        if (isInterstate) {
            igst = subtotal * gstRate;
        } else {
            cgst = subtotal * (gstRate / 2);
            sgst = subtotal * (gstRate / 2);
        }

        const totalGst = cgst + sgst + igst;
        const total = subtotal + totalGst;

        return { subtotal, cgst, sgst, igst, totalGst, total };
    };

    const handleCreate = (e) => {
        e.preventDefault();
        const totals = calculateTotals();

        const newInvoice = {
            customerId: parseInt(invData.customerId),
            staffId: parseInt(invData.staffId),
            date: new Date().toISOString().split('T')[0],
            services: invData.selectedServices.map(id => services.find(s => s.id === parseInt(id))),
            products: invData.selectedProducts.map(id => products.find(p => p.id === parseInt(id))),
            salonState: invData.salonState,
            customerState: invData.customerState,
            ...totals
        };

        addInvoice(newInvoice);
        setIsModalOpen(false);
        setInvData({
            customerId: '', staffId: '',
            salonState: 'Delhi', customerState: 'Delhi',
            selectedServices: [], selectedProducts: []
        });
    };

    const handleMultiSelect = (e, field) => {
        const options = e.target.options;
        const value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setInvData({ ...invData, [field]: value });
    };

    const totals = calculateTotals();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>GST Invoicing</h2>
                    <p style={{ color: '#6B7280', marginTop: '4px' }}>Manage billing with auto-calculated CGST/SGST/IGST</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
                    <Plus size={18} /> Creates Invoice
                </button>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th style={{ paddingLeft: '24px' }}>Invoice ID</th>
                                <th>Client / Location</th>
                                <th>Subtotal</th>
                                <th>Tax Type</th>
                                <th>Total</th>
                                <th style={{ textAlign: 'right', paddingRight: '24px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map(inv => {
                                const customer = customers.find(c => c.id === inv.customerId);
                                const isIGST = inv.igst > 0;
                                return (
                                    <tr key={inv.id}>
                                        <td style={{ paddingLeft: '24px' }}>
                                            <div style={{ fontWeight: 600 }}>#{inv.id}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>{format(new Date(inv.date), 'dd MMM yyyy')}</div>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: 500 }}>{customer?.name || 'Unknown'}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <MapPin size={12} /> {inv.customerState}
                                            </div>
                                        </td>
                                        <td>${inv.subtotal.toFixed(2)}</td>
                                        <td>
                                            {isIGST ? (
                                                <span className="status-badge" style={{ background: '#E0E7FF', color: '#4338CA' }}>IGST (5%)</span>
                                            ) : (
                                                <span className="status-badge" style={{ background: '#F1F5F9', color: '#475569' }}>CGST+SGST</span>
                                            )}
                                            <div style={{ fontSize: '0.75rem', marginTop: '4px', fontWeight: 600 }}>${inv.totalGst.toFixed(2)}</div>
                                        </td>
                                        <td style={{ fontWeight: 700, color: '#10B981', fontSize: '1rem' }}>${inv.total.toFixed(2)}</td>
                                        <td style={{ textAlign: 'right', paddingRight: '24px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                                <button className="icon-btn" title="View"><Eye size={18} /></button>
                                                <button className="icon-btn" title="Print Invoice"><Printer size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Generate GST Invoice">
                <form onSubmit={handleCreate}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label className="form-label">Customer</label>
                            <select className="form-input" required value={invData.customerId} onChange={e => setInvData({ ...invData, customerId: e.target.value })}>
                                <option value="">Select Customer</option>
                                {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Staff</label>
                            <select className="form-input" required value={invData.staffId} onChange={e => setInvData({ ...invData, staffId: e.target.value })}>
                                <option value="">Select Staff</option>
                                {staff.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: '#F8FAFC', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #E2E8F0' }}>
                        <div className="form-group">
                            <label className="form-label">Salon State (From)</label>
                            <select className="form-input" value={invData.salonState} onChange={e => setInvData({ ...invData, salonState: e.target.value })}>
                                {INDIAN_STATES.map(st => <option key={st} value={st}>{st}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Customer State (To)</label>
                            <select className="form-input" value={invData.customerState} onChange={e => setInvData({ ...invData, customerState: e.target.value })}>
                                {INDIAN_STATES.map(st => <option key={st} value={st}>{st}</option>)}
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label className="form-label">Services (Hold Ctrl)</label>
                            <select multiple className="form-input" style={{ height: '100px' }} value={invData.selectedServices} onChange={e => handleMultiSelect(e, 'selectedServices')}>
                                {services.map(s => <option key={s.id} value={s.id}>{s.name} (${s.price})</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Products (Hold Ctrl)</label>
                            <select multiple className="form-input" style={{ height: '100px' }} value={invData.selectedProducts} onChange={e => handleMultiSelect(e, 'selectedProducts')}>
                                {products.map(p => <option key={p.id} value={p.id}>{p.name} (${p.price})</option>)}
                            </select>
                        </div>
                    </div>

                    <div style={{ background: '#F0F9FF', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px dashed #BAE6FD' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ color: '#475569' }}>Subtotal</span>
                            <span style={{ fontWeight: 600 }}>${totals.subtotal.toFixed(2)}</span>
                        </div>

                        {totals.igst > 0 ? (
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: '#EA580C' }}>
                                <span>IGST (5%)</span>
                                <span>+${totals.igst.toFixed(2)}</span>
                            </div>
                        ) : (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: '#475569' }}>
                                    <span>CGST (2.5%)</span>
                                    <span>+${totals.cgst.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: '#475569' }}>
                                    <span>SGST (2.5%)</span>
                                    <span>+${totals.sgst.toFixed(2)}</span>
                                </div>
                            </>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #BAE6FD', paddingTop: '8px', marginTop: '4px' }}>
                            <span style={{ fontWeight: 700, color: '#0F172A' }}>Grand Total</span>
                            <span style={{ fontWeight: 700, color: '#4F46E5', fontSize: '1.2rem' }}>${totals.total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">Cancel</button>
                        <button type="submit" className="btn btn-primary">Create Invoice</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Billing;
