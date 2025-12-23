import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Mail, Phone, Users, Calendar } from 'lucide-react';

const Staff = () => {
    const { staff, addStaff } = useData();

    return (
        <div className="w-full max-w-none space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div>
                    <h1 className="text-2xl font-semibold">Staff Management</h1>
                    <p className="text-muted-foreground">Manage your salon team members</p>
                </div>
                <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Staff Member
                </Button>
            </div>

            {/* Staff Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {staff.map((member) => (
                    <Card key={member.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={member.image} alt={member.name} />
                                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <CardTitle className="text-lg">{member.name}</CardTitle>
                                    <Badge variant="secondary" className="mt-1">{member.role}</Badge>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Phone className="h-4 w-4" />
                                    <span>{member.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Mail className="h-4 w-4" />
                                    <span>{member.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span>Joined: {member.joiningDate}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {staff.length === 0 && (
                <Card className="text-center p-8">
                    <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                        <Users className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">No staff members found</h3>
                    <p className="text-muted-foreground">Get started by adding your first team member.</p>
                    <Button className="mt-4">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add Staff Member
                    </Button>
                </Card>
            )}
        </div>
    );
};

export default Staff;
