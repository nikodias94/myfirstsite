import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Heart } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import DOMPurify from 'dompurify';

const ContentModal = ({ isOpen, onClose, id, title, content, date, cover_url }) => {
    const { likes: allLikes, toggleLike } = useContent();
    const [copied, setCopied] = useState(false);

    const liked = allLikes[id] || false;
    const likeCount = allLikes[id] || 0;

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
                                    {/* Like button */}
                                    <motion.button
                                        onClick={() => toggleLike(id)}
                                        className="action-btn like-btn"
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent',
                                            border: '1px solid rgba(201, 169, 110, 0.2)', padding: '0.5rem 1rem', borderRadius: '20px',
                                            color: liked ? '#ef4444' : 'rgba(201, 169, 110, 0.7)',
                                            cursor: 'pointer'
                                        }}
                                        whileHover={{ scale: 1.05, borderColor: '#c9a96e', color: liked ? '#ef4444' : '#c9a96e' }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Heart size={18} fill={liked ? '#ef4444' : 'none'} strokeWidth={liked ? 2 : 2.5} />
                                        <span>{likeCount} მოწონება</span>
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
                                {cover_url && (
                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'center', 
                                        marginBottom: '2.5rem',
                                        perspective: '1000px'
                                    }}>
                                        <motion.div
                                            initial={{ rotateY: -15, scale: 0.9, opacity: 0 }}
                                            animate={{ rotateY: 0, scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.6, delay: 0.2 }}
                                            style={{
                                                width: '220px',
                                                height: '300px',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                border: '2px solid var(--border-gold)',
                                                boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
                                            }}
                                        >
                                            <img src={cover_url} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </motion.div>
                                    </div>
                                )}
                                <div 
                                    className="tiptap-editor-content"
                                    style={{ lineHeight: 1.9, color: 'var(--text-secondary)' }}
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ContentModal;
