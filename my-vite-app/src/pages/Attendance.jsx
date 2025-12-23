import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarCheck, Clock, Users } from 'lucide-react';

const Attendance = () => {
    return (
        <div className="w-full max-w-none space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div>
                    <h1 className="text-2xl font-semibold">Attendance</h1>
                    <p className="text-muted-foreground">Track staff attendance and working hours</p>
                </div>
                <Button>
                    <CalendarCheck className="mr-2 h-4 w-4" />
                    Mark Attendance
                </Button>
            </div>

            {/* Coming Soon */}
            <Card className="text-center p-12">
                <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
                    <Clock className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">Attendance Tracking</h3>
                <p className="text-muted-foreground mb-6">Advanced attendance management system coming soon with clock-in/out functionality, timesheet management, and detailed reporting.</p>
                <div className="flex justify-center gap-2">
                    <Button variant="outline">
                        <Users className="mr-2 h-4 w-4" />
                        View Staff
                    </Button>
                    <Button>
                        <CalendarCheck className="mr-2 h-4 w-4" />
                        Quick Check-in
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default Attendance;
