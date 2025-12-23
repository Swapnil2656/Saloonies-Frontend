import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"

const MainLayout = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex min-h-screen flex-1 flex-col overflow-hidden">
                <SiteHeader />
                <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 min-w-0">
                    <div className="w-full max-w-none">
                        <Outlet />
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
};

export default MainLayout;
