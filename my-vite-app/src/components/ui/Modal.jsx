import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div style={{
                position: 'fixed', inset: 0, zIndex: 100,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(4px)'
            }}>
                {/* Backdrop */}
                <div
                    onClick={onClose}
                    style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }}
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    style={{
                        position: 'relative', width: '100%', maxWidth: '500px',
                        background: 'white', borderRadius: '12px', padding: '0',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid #E5E7EB' }}>
                        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>{title}</h2>
                        <button onClick={onClose} className="icon-btn"><X size={20} /></button>
                    </div>

                    <div style={{ padding: '1.5rem' }}>
                        {children}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default Modal;
