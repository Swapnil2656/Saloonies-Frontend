import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import Modal from '../components/UI/Modal';
import { Plus, Printer, Eye, MapPin, Download, X } from 'lucide-react';
import { format } from 'date-fns';
import { useLocation } from 'react-router-dom';

const INDIAN_STATES = ['Delhi', 'Maharashtra', 'Karnataka', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Rajasthan'];

const Billing = () => {
    const { invoices, customers, services, products, staff, addInvoice } = useData();
    const location = useLocation();

    // UI State
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [previewInvoice, setPreviewInvoice] = useState(null); // For View/Print modal

    // Invoice Form State
    const [invData, setInvData] = useState({
        appointmentId: null,
        customerId: '',
        staffId: '',
        salonState: 'Delhi',
        customerState: 'Delhi',
        selectedServices: [],
        selectedProducts: []
    });

    // Handle Pre-fill from Appointments
    useEffect(() => {
        if (location.state) {
            const { appointmentId, customerId, staffId, serviceId } = location.state;
            setInvData(prev => ({
                ...prev,
                appointmentId,
                customerId: customerId || '',
                staffId: staffId || '',
                selectedServices: serviceId ? [serviceId.toString()] : [],
            }));
            setIsFormOpen(true);
            // Clear location state to prevent re-opening on refresh - ideally navigate replace, but minor.
        }
    }, [location.state]);

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
            appointmentId: invData.appointmentId,
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
        setIsFormOpen(false);
        setInvData({
            appointmentId: null, customerId: '', staffId: '',
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

    const handlePrint = () => {
        window.print();
    };

    const totals = calculateTotals();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }} className="no-print">
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>GST Invoicing</h2>
                    <p style={{ color: '#6B7280', marginTop: '4px' }}>Manage billing with auto-calculated CGST/SGST/IGST</p>
                </div>
                <button onClick={() => setIsFormOpen(true)} className="btn btn-primary">
                    <Plus size={18} /> New Invoice
                </button>
            </div>

            <div className="card no-print" style={{ padding: 0, overflow: 'hidden' }}>
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
                                        </td>
                                        <td style={{ fontWeight: 700, color: '#10B981', fontSize: '1rem' }}>${inv.total.toFixed(2)}</td>
                                        <td style={{ textAlign: 'right', paddingRight: '24px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                                <button onClick={() => setPreviewInvoice(inv)} className="icon-btn" title="View/Print"><Printer size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* CREATE INVOICE FORM MODAL */}
            <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title="Generate GST Invoice">
                <form onSubmit={handleCreate}>
                    {/* ... Form Inputs Same as Before ... */}
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
                    {/* ... State Inputs ... */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: '#F8FAFC', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #E2E8F0' }}>
                        <div className="form-group"><label className="form-label">Salon State</label><select className="form-input" value={invData.salonState} onChange={e => setInvData({ ...invData, salonState: e.target.value })}>{INDIAN_STATES.map(st => <option key={st} value={st}>{st}</option>)}</select></div>
                        <div className="form-group"><label className="form-label">Customer State</label><select className="form-input" value={invData.customerState} onChange={e => setInvData({ ...invData, customerState: e.target.value })}>{INDIAN_STATES.map(st => <option key={st} value={st}>{st}</option>)}</select></div>
                    </div>
                    {/* ... Multi Selects ... */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group"><label className="form-label">Services (Ctrl+Click)</label><select multiple className="form-input" style={{ height: '100px' }} value={invData.selectedServices} onChange={e => handleMultiSelect(e, 'selectedServices')}>{services.map(s => <option key={s.id} value={s.id}>{s.name} (${s.price})</option>)}</select></div>
                        <div className="form-group"><label className="form-label">Products (Ctrl+Click)</label><select multiple className="form-input" style={{ height: '100px' }} value={invData.selectedProducts} onChange={e => handleMultiSelect(e, 'selectedProducts')}>{products.map(p => <option key={p.id} value={p.id}>{p.name} (${p.price})</option>)}</select></div>
                    </div>

                    {/* Totals Summary */}
                    <div style={{ background: '#F0F9FF', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px dashed #BAE6FD' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span style={{ color: '#475569' }}>Subtotal</span><span style={{ fontWeight: 600 }}>${totals.subtotal.toFixed(2)}</span></div>
                        {totals.igst > 0 ? (
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: '#EA580C' }}><span>IGST (5%)</span><span>+${totals.igst.toFixed(2)}</span></div>
                        ) : (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: '#475569' }}><span>CGST (2.5%)</span><span>+${totals.cgst.toFixed(2)}</span></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: '#475569' }}><span>SGST (2.5%)</span><span>+${totals.sgst.toFixed(2)}</span></div>
                            </>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #BAE6FD', paddingTop: '8px', marginTop: '4px' }}><span style={{ fontWeight: 700, color: '#0F172A' }}>Grand Total</span><span style={{ fontWeight: 700, color: '#4F46E5', fontSize: '1.2rem' }}>${totals.total.toFixed(2)}</span></div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <button type="button" onClick={() => setIsFormOpen(false)} className="btn btn-secondary">Cancel</button>
                        <button type="submit" className="btn btn-primary">Create Invoice</button>
                    </div>
                </form>
            </Modal>

            {/* INVOICE PREVIEW MODAL */}
            {previewInvoice && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.5)' }}>
                    <div style={{ background: 'white', width: '210mm', minHeight: '297mm', padding: '40px', overflowY: 'auto', maxHeight: '90vh', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }} className="print-container">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                            <div>
                                <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', margin: 0 }}>INVOICE</h1>
                                <div style={{ color: '#6B7280', fontSize: '0.9rem', marginTop: '4px' }}>#{previewInvoice.id}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Saloonie Premium</h2>
                                <div style={{ fontSize: '0.9rem', color: '#6B7280' }}>123, Fashion Street, Delhi</div>
                                <div style={{ fontSize: '0.9rem', color: '#6B7280' }}>GSTIN: 07AABCU9603R1Z2</div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>
                            <div>
                                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px' }}>Bill To</div>
                                <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{customers.find(c => c.id === previewInvoice.customerId)?.name}</div>
                                <div style={{ color: '#6B7280' }}>{previewInvoice.customerState}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px' }}>Date</div>
                                <div style={{ fontWeight: 600 }}>{format(new Date(previewInvoice.date), 'dd MMMM yyyy')}</div>
                            </div>
                        </div>

                        <table style={{ width: '100%', marginBottom: '40px', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #E5E7EB' }}>
                                    <th style={{ textAlign: 'left', padding: '12px 0' }}>Item</th>
                                    <th style={{ textAlign: 'left', padding: '12px 0' }}>Type</th>
                                    <th style={{ textAlign: 'right', padding: '12px 0' }}>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {previewInvoice.services?.map((s, i) => (
                                    <tr key={`s-${i}`} style={{ borderBottom: '1px solid #E5E7EB' }}>
                                        <td style={{ padding: '12px 0' }}>{s.name}</td>
                                        <td style={{ padding: '12px 0', color: '#6B7280' }}>Service</td>
                                        <td style={{ textAlign: 'right', padding: '12px 0' }}>${s.price.toFixed(2)}</td>
                                    </tr>
                                ))}
                                {previewInvoice.products?.map((p, i) => (
                                    <tr key={`p-${i}`} style={{ borderBottom: '1px solid #E5E7EB' }}>
                                        <td style={{ padding: '12px 0' }}>{p.name}</td>
                                        <td style={{ padding: '12px 0', color: '#6B7280' }}>Product</td>
                                        <td style={{ textAlign: 'right', padding: '12px 0' }}>${p.price.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
                            <div style={{ width: '300px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ color: '#6B7280' }}>Subtotal</span>
                                    <span style={{ fontWeight: 600 }}>${previewInvoice.subtotal.toFixed(2)}</span>
                                </div>
                                {previewInvoice.igst > 0 ? (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ color: '#6B7280' }}>IGST (5%)</span>
                                        <span>${previewInvoice.igst.toFixed(2)}</span>
                                    </div>
                                ) : (
                                    <>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ color: '#6B7280' }}>CGST (2.5%)</span>
                                            <span>${previewInvoice.cgst.toFixed(2)}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ color: '#6B7280' }}>SGST (2.5%)</span>
                                            <span>${previewInvoice.sgst.toFixed(2)}</span>
                                        </div>
                                    </>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #E5E7EB', paddingTop: '12px', fontSize: '1.2rem', fontWeight: 800 }}>
                                    <span>Total</span>
                                    <span>${previewInvoice.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: 'auto', paddingTop: '40px', borderTop: '1px solid #E5E7EB', textAlign: 'center', color: '#9CA3AF', fontSize: '0.8rem' }}>
                            Thank you for your business! | support@saloonie.com
                        </div>

                        {/* ACTION BUTTONS (Hidden in Print) */}
                        <div className="no-print" style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '1rem', background: 'white', padding: '10px', borderRadius: '50px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
                            <button onClick={() => window.print()} className="btn btn-primary" style={{ borderRadius: '50px' }}><Printer size={18} /> Print</button>
                            <button onClick={() => setPreviewInvoice(null)} className="btn btn-secondary" style={{ borderRadius: '50px' }}><X size={18} /> Close</button>
                        </div>
                        <style>{`@media print { .no-print { display: none !important; } .app-container { visibility: hidden; } .print-container { visibility: visible; position: absolute; top: 0; left: 0; width: 100%; height: 100%; margin: 0; padding: 20px; box-shadow: none !important; } }`}</style>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Billing;
