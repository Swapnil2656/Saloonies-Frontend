import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { formatCurrency } from '../utils/formatters';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Printer, Eye, Download, Search, FileText, CreditCard, Receipt } from 'lucide-react';
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
        <div className="w-full max-w-none space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div>
                    <h1 className="text-2xl font-semibold">GST Invoicing</h1>
                    <p className="text-muted-foreground">Manage billing with auto-calculated taxes</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Invoice
                </Button>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search invoices..."
                    className="pl-10"
                />
            </div>

            {/* Invoices Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Invoices</CardTitle>
                    <CardDescription>
                        {invoices.length} invoice{invoices.length !== 1 ? 's' : ''} generated
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Invoice ID</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Subtotal</TableHead>
                                    <TableHead>Tax Type</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invoices.map((inv) => {
                                    const customer = customers.find(c => c.id === inv.customerId);
                                    const isIGST = inv.igst > 0;
                                    
                                    return (
                                        <TableRow key={inv.id}>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="font-medium">#{inv.id}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {format(new Date(inv.date), 'dd MMM yyyy')}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="font-medium">{customer?.name || 'Unknown'}</div>
                                                    <div className="text-sm text-muted-foreground">{inv.customerState}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{formatCurrency(inv.subtotal)}</TableCell>
                                            <TableCell>
                                                <Badge variant={isIGST ? "default" : "secondary"}>
                                                    {isIGST ? "IGST (5%)" : "CGST+SGST"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="font-medium text-green-600">
                                                {formatCurrency(inv.total)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button size="sm" variant="outline">
                                                    <Printer className="h-4 w-4 mr-1" />
                                                    Print
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Empty State */}
                    {invoices.length === 0 && (
                        <div className="text-center py-8">
                            <Receipt className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium">No invoices found</h3>
                            <p className="text-muted-foreground">Start creating invoices for your customers.</p>
                            <Button className="mt-4">
                                <Plus className="mr-2 h-4 w-4" />
                                Create Invoice
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Billing;
