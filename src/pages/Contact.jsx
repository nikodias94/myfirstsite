import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle, AlertCircle, User, MessageSquare, Feather, Phone, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useContent } from '../context/ContentContext';

/* ─────────────────────────────────────────────
   EmailJS configuration
   Replace with real IDs from emailjs.com
───────────────────────────────────────────── */
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const itemVariants = {
    hidden:   { opacity: 0, y: 24 },
    visible:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
};

const Contact = () => {
    const { content } = useContent();
    const formRef  = useRef(null);
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [form,   setForm]   = useState({ name: '', email: '', subject: '', message: '' });

    // Fallbacks if data empty
    const contactEmail = content.about?.contactEmail || 'zhana.ananidze@gmail.com';
    const contactPhone = content.about?.contactPhone || '';
    const contactAddress = content.about?.contactAddress || '';
    const contactText = content.about?.contactText || 'გაქვს შეკითხვა, წინადადება ან უბრალოდ გსურს ლიტერატურაზე ისაუბრო? დამიწერე — ყოველ წერილს ვკითხულობ.';

    const handleChange = (e) =>
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (status === 'sending') return;
        setStatus('sending');

        try {
            await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formRef.current,
                EMAILJS_PUBLIC_KEY
            );
            setStatus('success');
            setForm({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            console.error('EmailJS error:', err);
            setStatus('error');
        }
    };

    return (
        <div className="contact-page">
            {/* Gradient orbs */}
            <div className="contact-orb contact-orb-1" aria-hidden="true" />
            <div className="contact-orb contact-orb-2" aria-hidden="true" />

            <div className="container section-sm">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="contact-wrapper"
                >
                    {/* ── LEFT PANEL ── */}
                    <motion.aside variants={itemVariants} className="contact-info">
                        <motion.div
                            className="contact-feather"
                            animate={{ rotate: [0, 8, -8, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <Feather size={48} />
                        </motion.div>

                        <h1 className="contact-title">მოგისმენ</h1>
                        <div className="divider-gold" style={{ margin: '1rem 0 1.5rem', maxWidth: '60px' }} />
                        <p className="contact-subtitle">
                            {contactText}
                        </p>

                        <div className="contact-info-items">
                            {contactEmail && (
                                <div className="contact-info-item">
                                    <Mail size={18} />
                                    <span>{contactEmail}</span>
                                </div>
                            )}
                            {contactPhone && (
                                <div className="contact-info-item">
                                    <Phone size={18} />
                                    <span>{contactPhone}</span>
                                </div>
                            )}
                            {contactAddress && (
                                <div className="contact-info-item">
                                    <MapPin size={18} />
                                    <span>{contactAddress}</span>
                                </div>
                            )}
                        </div>
                    </motion.aside>

                    {/* ── FORM PANEL ── */}
                    <motion.div variants={itemVariants} className="contact-form-wrapper">
                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    key="success"
                                    className="contact-success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <CheckCircle size={56} className="contact-success-icon" />
                                    <h2>გამოგზავნილია!</h2>
                                    <p>მადლობა შეტყობინებისთვის. მალე გიპასუხებ.</p>
                                    <button
                                        className="btn btn-outline"
                                        onClick={() => setStatus('idle')}
                                    >
                                        ახლის გაგზავნა
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    ref={formRef}
                                    onSubmit={handleSubmit}
                                    className="contact-form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    {/* Name */}
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="cf-name">
                                            <User size={14} />
                                            <span>სახელი</span>
                                        </label>
                                        <input
                                            id="cf-name"
                                            name="name"
                                            type="text"
                                            value={form.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="შენი სახელი"
                                            className="form-input"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="cf-email">
                                            <Mail size={14} />
                                            <span>ელ.ფოსტა</span>
                                        </label>
                                        <input
                                            id="cf-email"
                                            name="email"
                                            type="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="your@email.com"
                                            className="form-input"
                                        />
                                    </div>

                                    {/* Subject */}
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="cf-subject">
                                            <MessageSquare size={14} />
                                            <span>თემა</span>
                                        </label>
                                        <input
                                            id="cf-subject"
                                            name="subject"
                                            type="text"
                                            value={form.subject}
                                            onChange={handleChange}
                                            required
                                            placeholder="წერილის თემა"
                                            className="form-input"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="cf-message">
                                            <Feather size={14} />
                                            <span>შეტყობინება</span>
                                        </label>
                                        <textarea
                                            id="cf-message"
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            required
                                            placeholder="შენი შეტყობინება..."
                                            className="form-textarea"
                                            style={{ minHeight: '160px' }}
                                        />
                                    </div>

                                    {/* Error */}
                                    {status === 'error' && (
                                        <motion.div
                                            className="contact-error"
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <AlertCircle size={16} />
                                            <span>გაგზავნა ვერ მოხერხდა. სცადე მოგვიანებით.</span>
                                        </motion.div>
                                    )}

                                    {/* Submit */}
                                    <motion.button
                                        type="submit"
                                        className={`btn btn-primary w-full ${status === 'sending' ? 'opacity-70' : ''}`}
                                        disabled={status === 'sending'}
                                        whileHover={status !== 'sending' ? { scale: 1.02 } : {}}
                                        whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
                                        style={{ width: '100%', justifyContent: 'center' }}
                                    >
                                        {status === 'sending' ? (
                                            <>
                                                <span className="search-loading-dot" />
                                                <span className="search-loading-dot" style={{ animationDelay: '0.15s' }} />
                                                <span className="search-loading-dot" style={{ animationDelay: '0.3s' }} />
                                                <span style={{ marginLeft: '0.5rem' }}>იგზავნება...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send size={16} />
                                                <span>გაგზავნა</span>
                                            </>
                                        )}
                                    </motion.button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
