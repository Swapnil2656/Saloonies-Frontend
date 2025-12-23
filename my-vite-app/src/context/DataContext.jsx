import { createContext, useContext, useState, useEffect } from 'react';
import { mockServices, mockStaff, mockProducts, mockCustomers, mockAppointments } from '../data/mockData';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [services, setServices] = useState(mockServices);
    const [staff, setStaff] = useState(mockStaff);
    const [products, setProducts] = useState(mockProducts);
    const [customers, setCustomers] = useState(mockCustomers);
    const [appointments, setAppointments] = useState(mockAppointments);
    const [attendance, setAttendance] = useState([]);
    const [invoices, setInvoices] = useState([]);

    // Simple Toast State
    const [toast, setToast] = useState(null); // { message, type }

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const addService = (service) => setServices([...services, { ...service, id: Date.now() }]);
    const deleteService = (id) => setServices(services.filter(s => s.id !== id));
    const addStaff = (newStaff) => setStaff([...staff, { ...newStaff, id: Date.now(), image: `https://i.pravatar.cc/150?u=${Date.now()}` }]);
    const addProduct = (product) => setProducts([...products, { ...product, id: Date.now() }]);
    const deleteProduct = (id) => setProducts(products.filter(p => p.id !== id));
    const addCustomer = (customer) => setCustomers([...customers, { ...customer, id: Date.now(), visits: 0 }]);
    const addAppointment = (appointment) => setAppointments([...appointments, { ...appointment, id: Date.now(), status: 'Scheduled' }]);

    const updateAppointmentStatus = (id, status) => {
        setAppointments(prev => prev.map(app => app.id === id ? { ...app, status } : app));
        showToast(`Appointment marked as ${status}`);
    };

    const addInvoice = (invoice) => {
        setInvoices([...invoices, { ...invoice, id: Date.now() }]);

        // If invoice is linked to an appointment, mark it completed
        if (invoice.appointmentId) {
            setAppointments(prev => prev.map(app =>
                app.id === invoice.appointmentId ? { ...app, status: 'Completed', isBilled: true } : app
            ));
        }
        showToast('Invoice generated successfully');
    };

    const markAttendance = (date, staffId, status) => {
        const filtered = attendance.filter(a => !(a.date === date && a.staffId === staffId));
        setAttendance([...filtered, { date, staffId, status }]);
    };

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setAttendance(staff.map(s => ({ date: today, staffId: s.id, status: Math.random() > 0.1 ? 'Present' : 'Absent' })));

        // Mock Invoices
        setInvoices([
            { id: 1001, customerId: 1, staffId: 1, date: '2025-12-20', services: [mockServices[0]], products: [], salonState: 'Delhi', customerState: 'Delhi', subtotal: 50, cgst: 1.25, sgst: 1.25, igst: 0, totalGst: 2.5, total: 52.5 },
        ]);

        // Ensure mock appointments have IDs compatible if needed (mock data usually has IDs)
    }, []);

    return (
        <DataContext.Provider value={{
            services, addService, deleteService,
            staff, addStaff,
            products, addProduct, deleteProduct,
            customers, addCustomer,
            appointments, addAppointment, updateAppointmentStatus,
            attendance, markAttendance,
            invoices, addInvoice,
            toast, showToast
        }}>
            {children}
            {/* Global Toast Render */}
            {toast && (
                <div style={{
                    position: 'fixed', bottom: '24px', right: '24px',
                    background: toast.type === 'error' ? '#EF4444' : '#10B981',
                    color: 'white', padding: '12px 24px', borderRadius: '8px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', zIndex: 9999,
                    animation: 'fadeIn 0.3s ease-out'
                }}>
                    {toast.message}
                </div>
            )}
        </DataContext.Provider>
    );
};
