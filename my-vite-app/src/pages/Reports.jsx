import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { formatCurrency } from '../utils/formatters';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, FileText, PieChart, Download, BarChart3, DollarSign, TrendingDown } from 'lucide-react';

const Reports = () => {
    const { invoices, staff, services, customers } = useData();
    const [filter, setFilter] = useState('All Time');

    // --- Aggregations ---
    const totalRev = invoices.reduce((a, b) => a + b.total, 0);
    const totalCGST = invoices.reduce((a, b) => a + (b.cgst || 0), 0);
    const totalSGST = invoices.reduce((a, b) => a + (b.sgst || 0), 0);
    const totalIGST = invoices.reduce((a, b) => a + (b.igst || 0), 0);
    const totalTax = totalCGST + totalSGST + totalIGST;

    // Service performance
    const serviceStats = services.map(service => {
        const serviceInvoices = invoices.filter(inv => 
            inv.services.some(s => s.id === service.id)
        );
        const revenue = serviceInvoices.reduce((sum, inv) => sum + service.price, 0);
        return {
            ...service,
            bookings: serviceInvoices.length,
            revenue
        };
    }).sort((a, b) => b.revenue - a.revenue);

    // Staff performance
    const staffStats = staff.map(member => {
        const memberInvoices = invoices.filter(inv => inv.staffId === member.id);
        const revenue = memberInvoices.reduce((sum, inv) => sum + inv.total, 0);
        return {
            ...member,
            bookings: memberInvoices.length,
            revenue
        };
    }).sort((a, b) => b.revenue - a.revenue);

    return (
        <div className="w-full max-w-none space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div>
                    <h1 className="text-2xl font-semibold">Analytics Dashboard</h1>
                    <p className="text-muted-foreground">Financial performance and business insights</p>
                </div>
                <div className="flex gap-2">
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Time period" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All Time">All Time</SelectItem>
                            <SelectItem value="This Month">This Month</SelectItem>
                            <SelectItem value="Today">Today</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Revenue Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(totalRev)}</div>
                        <p className="text-xs text-muted-foreground">
                            From {invoices.length} invoices
                        </p>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total GST</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(totalTax)}</div>
                        <p className="text-xs text-muted-foreground">
                            Tax collected
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">CGST + SGST</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(totalCGST + totalSGST)}</div>
                        <p className="text-xs text-muted-foreground">
                            State tax
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">IGST</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(totalIGST)}</div>
                        <p className="text-xs text-muted-foreground">
                            Interstate tax
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Service Performance */}
            <Card>
                <CardHeader>
                    <CardTitle>Service Performance</CardTitle>
                    <CardDescription>
                        Most popular services by revenue
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {serviceStats.slice(0, 5).map((service, index) => (
                            <div key={service.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="font-medium">{service.name}</p>
                                        <p className="text-sm text-muted-foreground">{service.bookings} bookings</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">{formatCurrency(service.revenue)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Staff Performance */}
            <Card>
                <CardHeader>
                    <CardTitle>Staff Performance</CardTitle>
                    <CardDescription>
                        Team member revenue contribution
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {staffStats.map((member, index) => (
                            <div key={member.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-medium">
                                        {member.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-medium">{member.name}</p>
                                        <p className="text-sm text-muted-foreground">{member.bookings} appointments</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">{formatCurrency(member.revenue)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Reports;
