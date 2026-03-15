import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check } from 'lucide-react';

const ContentModal = ({ isOpen, onClose, title, content, date }) => {
    const [copied, setCopied] = useState(false);

    // Close on Escape key
    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose]);

    // Prevent body scroll while open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(`${title}\n\n${content}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch { /* ignore */ }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        className="modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={onClose}
                        aria-hidden="true"
                    />

                    {/* Full-screen flex centering wrapper */}
                    <div className="modal-centering-wrapper">
                        <motion.div
                            key="modal"
                            className="modal-panel"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-title"
                            initial={{ opacity: 0, scale: 0.94, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.94, y: 20 }}
                            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                            {/* Header */}
                            <div className="modal-header">
                                <div>
                                    <h3 id="modal-title" className="modal-title">{title}</h3>
                                    {date && <span className="modal-date">{date}</span>}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {/* Copy button */}
                                    <motion.button
                                        onClick={handleCopy}
                                        className="modal-close-btn"
                                        aria-label="კოპირება"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        title="კოპირება"
                                    >
                                        <AnimatePresence mode="wait">
                                            {copied ? (
                                                <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} style={{ color: '#4ade80', display: 'flex' }}>
                                                    <Check size={18} />
                                                </motion.span>
                                            ) : (
                                                <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} style={{ display: 'flex' }}>
                                                    <Copy size={18} />
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                    {/* Close button */}
                                    <motion.button
                                        onClick={onClose}
                                        className="modal-close-btn"
                                        aria-label="დახურვა"
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X size={20} />
                                    </motion.button>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="modal-divider" />

                            {/* Scrollable Content */}
                            <div className="modal-body">
                                <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.9, color: 'var(--text-secondary)' }}>
                                    {content}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ContentModal;
