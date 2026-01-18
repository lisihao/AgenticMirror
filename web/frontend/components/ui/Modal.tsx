'use client';

import { Fragment, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    closeOnOverlayClick?: boolean;
    showCloseButton?: boolean;
    children: ReactNode;
    footer?: ReactNode;
}

const Modal = ({
    open,
    onClose,
    title,
    size = 'md',
    closeOnOverlayClick = true,
    showCloseButton = true,
    children,
    footer,
}: ModalProps) => {
    const sizes = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        full: 'max-w-4xl',
    };

    return (
        <AnimatePresence>
            {open && (
                <Fragment>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50"
                        onClick={closeOnOverlayClick ? onClose : undefined}
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className={cn(
                                'w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden',
                                sizes[size]
                            )}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            {(title || showCloseButton) && (
                                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                                    {title && (
                                        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                            {title}
                                        </h2>
                                    )}
                                    {showCloseButton && (
                                        <button
                                            onClick={onClose}
                                            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* Content */}
                            <div className="px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                                {children}
                            </div>

                            {/* Footer */}
                            {footer && (
                                <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                                    {footer}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </Fragment>
            )}
        </AnimatePresence>
    );
};

export { Modal };
export type { ModalProps };
