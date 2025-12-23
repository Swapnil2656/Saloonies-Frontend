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

    const addService = (service) => setServices([...services, { ...service, id: Date.now() }]);
    const deleteService = (id) => setServices(services.filter(s => s.id !== id));
    const addStaff = (newStaff) => setStaff([...staff, { ...newStaff, id: Date.now(), image: `https://i.pravatar.cc/150?u=${Date.now()}` }]);
    const addProduct = (product) => setProducts([...products, { ...product, id: Date.now() }]);
    const deleteProduct = (id) => setProducts(products.filter(p => p.id !== id));
    const addCustomer = (customer) => setCustomers([...customers, { ...customer, id: Date.now(), visits: 0 }]);
    const addAppointment = (appointment) => setAppointments([...appointments, { ...appointment, id: Date.now(), status: 'Scheduled' }]);
    const addInvoice = (invoice) => setInvoices([...invoices, { ...invoice, id: Date.now() }]);

    const markAttendance = (date, staffId, status) => {
        const filtered = attendance.filter(a => !(a.date === date && a.staffId === staffId));
        setAttendance([...filtered, { date, staffId, status }]);
    };

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setAttendance(staff.map(s => ({ date: today, staffId: s.id, status: Math.random() > 0.1 ? 'Present' : 'Absent' })));

        // Mock Invoices with GST Data
        // Scenario 1: Same State (Delhi -> Delhi) = CGST + SGST
        // Scenario 2: Diff State (Delhi -> Mumbai) = IGST
        setInvoices([
            {
                id: 1001, customerId: 1, staffId: 1, date: '2025-12-20',
                services: [mockServices[0]], products: [],
                salonState: 'Delhi', customerState: 'Delhi',
                subtotal: 50, cgst: 1.25, sgst: 1.25, igst: 0, totalGst: 2.5, total: 52.5
            },
            {
                id: 1002, customerId: 2, staffId: 2, date: '2025-12-21',
                services: [mockServices[1], mockServices[2]], products: [mockProducts[0]],
                salonState: 'Delhi', customerState: 'Maharashtra',
                subtotal: 120, cgst: 0, sgst: 0, igst: 6, totalGst: 6, total: 126
            },
            {
                id: 1003, customerId: 3, staffId: 1, date: '2025-12-22',
                services: [mockServices[0]], products: [],
                salonState: 'Delhi', customerState: 'Delhi',
                subtotal: 50, cgst: 1.25, sgst: 1.25, igst: 0, totalGst: 2.5, total: 52.5
            },
            {
                id: 1004, customerId: 1, staffId: 3, date: '2025-12-23',
                services: [mockServices[2]], products: [],
                salonState: 'Delhi', customerState: 'Punjab',
                subtotal: 80, cgst: 0, sgst: 0, igst: 4, totalGst: 4, total: 84
            }
        ]);
    }, []);

    return (
        <DataContext.Provider value={{
            services, addService, deleteService,
            staff, addStaff,
            products, addProduct, deleteProduct,
            customers, addCustomer,
            appointments, addAppointment, setAppointments,
            attendance, markAttendance,
            invoices, addInvoice
        }}>
            {children}
        </DataContext.Provider>
    );
};
