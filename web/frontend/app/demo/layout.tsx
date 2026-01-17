'use client';

import DemoSidebar from '@/components/layout/DemoSidebar';

export default function DemoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-50">
            <DemoSidebar />
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}
