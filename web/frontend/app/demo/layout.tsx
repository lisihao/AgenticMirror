'use client';

import DemoSidebar from '@/components/layout/DemoSidebar';
import { CartProvider, ThemeProvider, FavoritesProvider } from '@/contexts';
import { ToastProvider } from '@/components/ui/Toast';

export default function DemoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider>
            <CartProvider>
                <FavoritesProvider>
                    <ToastProvider>
                        <div className="flex h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
                            <DemoSidebar />
                            <main className="flex-1 overflow-auto">
                                {children}
                            </main>
                        </div>
                    </ToastProvider>
                </FavoritesProvider>
            </CartProvider>
        </ThemeProvider>
    );
}
