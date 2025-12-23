import React, { useState } from 'react';
import { formatCurrency } from '../utils/formatters';
import { useData } from '../context/DataContext';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Plus, Search, User, Scissors, FileText } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const Appointments = () => {
    const { appointments, staff, services, customers, addAppointment, updateAppointmentStatus, deleteAppointment } = useData();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const handleStatusChange = (id, newStatus) => {
        if (window.confirm(`Mark appointment as ${newStatus}?`)) {
            updateAppointmentStatus(id, newStatus);
        }
    };

    const handleCreateBill = (app) => {
        // Navigate with pre-filled data
        navigate('/billing', {
            state: {
                appointmentId: app.id,
                customerId: app.customerId,
                staffId: app.staffId,
                serviceId: app.serviceId
            }
        });
    };

    // Filter and search appointments
    const filteredAppointments = appointments.filter(appointment => {
        const customer = customers.find(c => c.id === appointment.customerId);
        const service = services.find(s => s.id === appointment.serviceId);
        const staffMember = staff.find(s => s.id === appointment.staffId);
        
        const matchesSearch = customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             service?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             staffMember?.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    // Sort by date/time
    const sortedAppointments = [...filteredAppointments].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="w-full max-w-none space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div>
                    <h1 className="text-2xl font-semibold">Appointments</h1>
                    <p className="text-muted-foreground">Manage bookings and status</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Appointment
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search appointments..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="Scheduled">Scheduled</SelectItem>
                        <SelectItem value="Confirmed">Confirmed</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Appointments Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>
                        {sortedAppointments.length} appointment{sortedAppointments.length !== 1 ? 's' : ''} found
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date & Time</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Service</TableHead>
                                    <TableHead>Staff</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortedAppointments.map((app) => {
                                    const customer = customers.find(c => c.id === app.customerId);
                                    const service = services.find(s => s.id === app.serviceId);
                                    const staffMember = staff.find(s => s.id === app.staffId);

                                    return (
                                        <TableRow key={app.id} className={app.status === 'Cancelled' ? 'opacity-60' : ''}>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="font-medium">{format(parseISO(app.date), 'MMM dd, yyyy')}</div>
                                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                        <Clock className="h-3 w-3" />
                                                        {app.time}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                    {customer?.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Scissors className="h-4 w-4 text-muted-foreground" />
                                                    {service?.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>{staffMember?.name}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-col gap-1">
                                                    <Badge 
                                                        variant={
                                                            app.status === 'Completed' ? 'default' :
                                                            app.status === 'Confirmed' ? 'secondary' :
                                                            app.status === 'Cancelled' ? 'destructive' :
                                                            'outline'
                                                        }
                                                    >
                                                        {app.status}
                                                    </Badge>
                                                    {app.isBilled && <Badge variant="outline">Billed</Badge>}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    {app.status === 'Scheduled' && (
                                                        <Button 
                                                            size="sm" 
                                                            variant="outline"
                                                            onClick={() => handleStatusChange(app.id, 'Confirmed')}
                                                        >
                                                            Confirm
                                                        </Button>
                                                    )}
                                                    {app.status === 'Confirmed' && (
                                                        <Button 
                                                            size="sm"
                                                            onClick={() => handleCreateBill(app)}
                                                        >
                                                            <FileText className="h-4 w-4 mr-1" />
                                                            Bill
                                                        </Button>
                                                    )}
                                                    {app.status !== 'Completed' && app.status !== 'Cancelled' && (
                                                        <Button 
                                                            size="sm" 
                                                            variant="destructive"
                                                            onClick={() => handleStatusChange(app.id, 'Cancelled')}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                    
                    {/* Empty State */}
                    {sortedAppointments.length === 0 && (
                        <div className="text-center py-8">
                            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium">No appointments found</h3>
                            <p className="text-muted-foreground">Start scheduling appointments for your customers.</p>
                            <Button className="mt-4">
                                <Plus className="mr-2 h-4 w-4" />
                                Schedule Appointment
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Appointments;
