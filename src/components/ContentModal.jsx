import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, MessageSquare, User, Send, Heart } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import DOMPurify from 'dompurify';

const ContentModal = ({ isOpen, onClose, id, title, content, date, cover_url }) => {
    const { comments: allComments, addComment, likes: allLikes, toggleLike } = useContent();
    const [copied, setCopied] = useState(false);
    const [commentData, setCommentData] = useState({ name: '', content: '' });
    const [submitting, setSubmitting] = useState(false);

    const itemComments = allComments[id] || [];
    const liked = allLikes[id] || false;
    const itemCount = 0; // Temporary placeholder until itemCount is available in context or passed as prop

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

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentData.name.trim() || !commentData.content.trim()) return;
        
        setSubmitting(true);
        const success = await addComment(id, commentData);
        if (success) {
            setCommentData({ name: '', content: '' });
        }
        setSubmitting(false);
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
                                        <span>{itemCount} მოწონება</span>
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

                                {/* Comments Section */}
                                <div className="modal-comments-section" style={{ marginTop: '4rem', borderTop: '1px solid var(--border-gold)', paddingTop: '2.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                                        <MessageSquare size={20} style={{ color: 'var(--accent-gold)' }} />
                                        <h4 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '1rem', color: 'var(--accent-gold)' }}>
                                            კომენტარები ({itemComments.length})
                                        </h4>
                                    </div>

                                    {/* Comment List */}
                                    <div className="comments-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                                        {itemComments.length === 0 ? (
                                            <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.95rem' }}>ჯერჯერობით კომენტარები არ არის. იყავი პირველი!</p>
                                        ) : (
                                            itemComments.map(comment => (
                                                <motion.div 
                                                    key={comment.id}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '8px', borderLeft: '2px solid var(--border-gold)' }}
                                                >
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                                                        <span style={{ fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                            <User size={14} /> {comment.author_name}
                                                        </span>
                                                        <span style={{ color: 'var(--text-muted)' }}>
                                                            {new Date(comment.created_at).toLocaleDateString('ka-GE')}
                                                        </span>
                                                    </div>
                                                    <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{comment.content}</p>
                                                </motion.div>
                                            ))
                                        )}
                                    </div>

                                    {/* Comment Form */}
                                    <form onSubmit={handleCommentSubmit} className="comment-form" style={{ background: 'rgba(201,169,110,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(201,169,110,0.1)' }}>
                                        <h5 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1rem' }}>დატოვე კომენტარი</h5>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            <div className="input-group">
                                                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>სახელი</label>
                                                <input 
                                                    type="text" 
                                                    value={commentData.name}
                                                    onChange={(e) => setCommentData({...commentData, name: e.target.value})}
                                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: 'var(--bg-main)', border: '1px solid var(--border-gold)', color: 'var(--text-main)', outline: 'none' }}
                                                    placeholder="შენი სახელი"
                                                    required
                                                />
                                            </div>
                                            <div className="input-group">
                                                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>თქვენი აზრი</label>
                                                <textarea 
                                                    rows="4" 
                                                    value={commentData.content}
                                                    onChange={(e) => setCommentData({...commentData, content: e.target.value})}
                                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: 'var(--bg-main)', border: '1px solid var(--border-gold)', color: 'var(--text-main)', outline: 'none', resize: 'vertical' }}
                                                    placeholder="დაწერე რამე..."
                                                    required
                                                ></textarea>
                                            </div>
                                            <button 
                                                type="submit" 
                                                className="btn btn-primary" 
                                                disabled={submitting}
                                                style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}
                                            >
                                                {submitting ? 'იგზავნება...' : <><Send size={16} /> გაგზავნა</>}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ContentModal;
