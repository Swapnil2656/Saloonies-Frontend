
export const mockServices = [
    { id: 1, name: 'Haircut (Men)', category: 'Hair', price: 25, duration: 30 },
    { id: 2, name: 'Haircut (Women)', category: 'Hair', price: 45, duration: 60 },
    { id: 3, name: 'Hair Color', category: 'Hair', price: 120, duration: 120 },
    { id: 4, name: 'Manicure', category: 'Nails', price: 30, duration: 45 },
    { id: 5, name: 'Pedicure', category: 'Nails', price: 40, duration: 60 },
    { id: 6, name: 'Facial', category: 'Skin', price: 70, duration: 60 },
    { id: 7, name: 'Massage', category: 'Wellness', price: 90, duration: 60 },
];

export const mockStaff = [
    { id: 1, name: 'Sarah Jones', role: 'Senior Stylist', phone: '555-0101', email: 'sarah@salon.com', salary: 5000, joiningDate: '2023-01-15', image: 'https://i.pravatar.cc/150?u=sarah' },
    { id: 2, name: 'Mike Ross', role: 'Barber', phone: '555-0102', email: 'mike@salon.com', salary: 4200, joiningDate: '2023-03-10', image: 'https://i.pravatar.cc/150?u=mike' },
    { id: 3, name: 'Jessica Pearson', role: 'Manager', phone: '555-0103', email: 'jessica@salon.com', salary: 6000, joiningDate: '2022-11-01', image: 'https://i.pravatar.cc/150?u=jessica' },
    { id: 4, name: 'Emily Blunt', role: 'Nail Artist', phone: '555-0104', email: 'emily@salon.com', salary: 3800, joiningDate: '2023-06-20', image: 'https://i.pravatar.cc/150?u=emily' },
];

export const mockProducts = [
    { id: 1, name: 'Shampoo Volumizing', category: 'Hair Care', price: 25, stock: 15 },
    { id: 2, name: 'Conditioner Smoothening', category: 'Hair Care', price: 28, stock: 8 },
    { id: 3, name: 'Hair Serum', category: 'Hair Care', price: 35, stock: 20 },
    { id: 4, name: 'Nail Polish Red', category: 'Nails', price: 12, stock: 5 },
    { id: 5, name: 'Face Scrub', category: 'Skin Care', price: 18, stock: 2 },
];

export const mockCustomers = [
    { id: 1, name: 'Alice Walker', phone: '555-0201', email: 'alice@example.com', visits: 5 },
    { id: 2, name: 'Bob Smith', phone: '555-0202', email: 'bob@example.com', visits: 2 },
    { id: 3, name: 'Charlie Brown', phone: '555-0203', email: 'charlie@example.com', visits: 8 },
    { id: 4, name: 'Diana Prince', phone: '555-0204', email: 'diana@example.com', visits: 12 },
];

export const mockAppointments = [
    { id: 1, customerId: 1, staffId: 1, serviceId: 2, date: '2025-12-23', time: '10:00', status: 'Completed' },
    { id: 2, customerId: 2, staffId: 2, serviceId: 1, date: '2025-12-23', time: '11:00', status: 'Completed' },
    { id: 3, customerId: 3, staffId: 4, serviceId: 4, date: '2025-12-23', time: '14:00', status: 'Confirmed' },
    { id: 4, customerId: 4, staffId: 1, serviceId: 3, date: '2025-12-24', time: '09:00', status: 'Scheduled' },
];
