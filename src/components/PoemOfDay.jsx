import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Feather, BookOpen, Eye, Copy, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ContentModal from './ContentModal';

const TABLES = [
    { table: 'poems',        label: 'პოეზია'     },
    { table: 'poems_en',     label: 'ლექსი (EN)' },
    { table: 'translations', label: 'თარგმანი'   },
];

/* Pick a random item from all categories */
const fetchRandomPoem = async () => {
    if (!supabase) return null;
    const tableConfig = TABLES[Math.floor(Math.random() * TABLES.length)];
    const { data, error } = await supabase
        .from(tableConfig.table)
        .select('id, title, content, date')
        .limit(20);

    if (error || !data || data.length === 0) return null;
    const item = data[Math.floor(Math.random() * data.length)];
    return { ...item, category: tableConfig.label };
};

const PoemOfDay = () => {
    const [poem, setPoem]           = useState(null);
    const [loading, setLoading]     = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [copied, setCopied]       = useState(false);

    useEffect(() => {
        fetchRandomPoem()
            .then(p => setPoem(p))
            .finally(() => setLoading(false));
    }, []);

    const handleCopy = async () => {
        if (!poem) return;
        try {
            await navigator.clipboard.writeText(`${poem.title}\n\n${poem.content}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
        } catch { /* ignore */ }
    };

    const handleRefresh = () => {
        setLoading(true);
        setPoem(null);
        fetchRandomPoem()
            .then(p => setPoem(p))
            .finally(() => setLoading(false));
    };

    if (loading) return (
        <section className="potd-section">
            <div className="potd-label">
                <Sun size={14} />
                <span>დღის ლექსი</span>
            </div>
            <div className="potd-card" style={{ maxWidth: 620, margin: '0 auto' }}>
                <div className="potd-card-inner" style={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="search-loading-dot" />
                    <span className="search-loading-dot" style={{ animationDelay: '0.15s' }} />
                    <span className="search-loading-dot" style={{ animationDelay: '0.3s' }} />
                </div>
            </div>
        </section>
    );

    if (!poem) return null;

    return (
        <motion.section
            className="potd-section"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
            {/* Label */}
            <div className="potd-label">
                <Sun size={14} />
                <span>დღის ლექსი</span>
            </div>

            {/* Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={poem.id}
                    className="potd-card"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.45 }}
                >
                    <div className="potd-glow" aria-hidden="true" />
                    <div className="potd-card-inner">
                        <div className="potd-tag">
                            <Feather size={11} style={{ display: 'inline', marginRight: 4 }} />
                            {poem.category}
                        </div>
                        <h2 className="potd-title">{poem.title}</h2>

                        <div className="potd-content">
                            {poem.content}
                        </div>

                        <div className="potd-footer">
                            {poem.date && <span className="potd-date">{poem.date}</span>}
                            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                                {/* Copy */}
                                <motion.button
                                    className="btn btn-ghost btn-sm"
                                    onClick={handleCopy}
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    title="კოპირება"
                                >
                                    <AnimatePresence mode="wait">
                                        {copied ? (
                                            <motion.span key="check"
                                                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                                style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#4ade80' }}
                                            >
                                                <Check size={14} />
                                                <span>კოპირდა</span>
                                            </motion.span>
                                        ) : (
                                            <motion.span key="copy"
                                                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                                style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                                            >
                                                <Copy size={14} />
                                                <span>კოპირება</span>
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.button>

                                {/* Read Full */}
                                <motion.button
                                    className="btn btn-outline btn-sm"
                                    onClick={() => setModalOpen(true)}
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                >
                                    <Eye size={14} />
                                    <span>სრულად</span>
                                </motion.button>

                                {/* Refresh */}
                                <motion.button
                                    className="btn btn-ghost btn-sm"
                                    onClick={handleRefresh}
                                    whileHover={{ scale: 1.04, rotate: 180 }}
                                    whileTap={{ scale: 0.96 }}
                                    title="სხვა ლექსი"
                                    style={{ padding: '0.4rem' }}
                                >
                                    <BookOpen size={14} />
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Full poem modal */}
            <ContentModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                id={poem.id}
                title={poem.title}
                content={poem.content}
                date={poem.date}
            />
        </motion.section>
    );
};

export default PoemOfDay;
