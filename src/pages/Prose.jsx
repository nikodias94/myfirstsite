import React, { useState, useCallback } from 'react';
import { useContent } from '../context/ContentContext';
import { motion } from 'framer-motion';
import { BookText, FileText, Eye } from 'lucide-react';
import ContentModal from '../components/ContentModal';
import useAutoOpenItem from '../hooks/useAutoOpenItem';

const TRUNCATE_AT = 300;

const Prose = () => {
    const { content } = useContent();
    const { prose } = content;
    const [selectedItem, setSelectedItem] = useState(null);

    const openItem = useCallback((item) => setSelectedItem(item), []);
    useAutoOpenItem(prose, openItem);

    return (
        <div className="container section-sm">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="section-title">
                    <BookText size={32} style={{ marginBottom: '0.5rem', opacity: 0.8 }} />
                    <br />
                    პროზა
                </h2>
            </motion.div>

            {prose.length > 0 ? (
                <motion.div
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
                    initial="hidden"
                    animate="visible"
                    className="grid"
                    style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 'var(--space-6)' }}
                >
                    {prose.map((item) => {
                        const hasMore = item.content && item.content.length > TRUNCATE_AT;
                        const preview = hasMore ? item.content.substring(0, TRUNCATE_AT) + '...' : item.content;
                        return (
                            <motion.article
                                key={item.id}
                                id={`item-card-${item.id}`}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
                                }}
                                className="card"
                                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            >
                                <h3 className="card-title">{item.title}</h3>
                                <div className="card-content">
                                    <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{preview}</p>
                                </div>
                                <div className="card-footer">
                                    <span className="card-date">{item.date}</span>
                                    {hasMore && (
                                        <motion.button
                                            onClick={() => setSelectedItem(item)}
                                            className="btn btn-outline btn-sm"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Eye size={15} />
                                            <span>სრულად ნახვა</span>
                                        </motion.button>
                                    )}
                                </div>
                            </motion.article>
                        );
                    })}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="empty-state"
                >
                    <div className="empty-state-icon"><FileText size={48} /></div>
                    <h3 className="empty-state-title">პროზა ჯერ არ არის დამატებული</h3>
                    <p className="empty-state-text">მალე აქ გამოჩნდება ახალი პროზის ნაწარმოებები. დაბრუნდით მოგვიანებით!</p>
                </motion.div>
            )}

            <ContentModal
                isOpen={!!selectedItem}
                onClose={() => setSelectedItem(null)}
                title={selectedItem?.title}
                content={selectedItem?.content}
                date={selectedItem?.date}
            />
        </div>
    );
};

export default Prose;
