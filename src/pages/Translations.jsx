import React from 'react';
import { useContent } from '../context/ContentContext';
import { motion } from 'framer-motion';
import { Languages, BookOpen } from 'lucide-react';

const Translations = () => {
    const { content } = useContent();
    const { translations } = content;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1]
            }
        }
    };

    return (
        <div className="container section-sm">
            {/* Section Title */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="section-title">
                    <Languages size={32} style={{ marginBottom: '0.5rem', opacity: 0.8 }} />
                    <br />
                    თარგმანი
                </h2>
            </motion.div>

            {/* Translations Grid */}
            {translations.length > 0 ? (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid"
                    style={{
                        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                        gap: 'var(--space-6)'
                    }}
                >
                    {translations.map((item) => (
                        <motion.article
                            key={item.id}
                            variants={itemVariants}
                            className="card"
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        >
                            <h3 className="card-title">{item.title}</h3>
                            <div className="card-content">
                                <p style={{ whiteSpace: 'pre-wrap' }}>
                                    {item.content.length > 300
                                        ? item.content.substring(0, 300) + '...'
                                        : item.content
                                    }
                                </p>
                            </div>
                            <div className="card-footer">
                                <span className="card-date">{item.date}</span>
                                {item.content.length > 300 && (
                                    <button className="btn btn-outline btn-sm">
                                        სრულად ნახვა
                                    </button>
                                )}
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            ) : (
                /* Empty State */
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="empty-state"
                >
                    <div className="empty-state-icon">
                        <BookOpen size={48} />
                    </div>
                    <h3 className="empty-state-title">თარგმანები ჯერ არ არის დამატებული</h3>
                    <p className="empty-state-text">
                        მალე აქ გამოჩნდება ახალი თარგმანები. დაბრუნდით მოგვიანებით!
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default Translations;
