import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Calendar, ChevronRight } from 'lucide-react';

const PoemCard = ({ item, index = 0, onOpenModal }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showFullContent, setShowFullContent] = useState(false);

    // Truncate text function for excerpt
    const truncateText = (text, maxLength = 150) => {
        if (!text) return '';
        if (text.length <= maxLength) return text;

        // Find the last space before maxLength to avoid cutting words
        const truncated = text.substring(0, maxLength);
        const lastSpaceIndex = truncated.lastIndexOf(' ');

        if (lastSpaceIndex > 0) {
            return truncated.substring(0, lastSpaceIndex) + '...';
        }
        return truncated + '...';
    };

    // Format date nicely
    const formatDate = (dateString) => {
        if (!dateString) return null;
        try {
            return new Date(dateString).toLocaleDateString('ka-GE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return dateString;
        }
    };

    const displayContent = showFullContent
        ? item.content
        : truncateText(item.content, 200);

    const hasMoreContent = item.content && item.content.length > 200;

    return (
        <motion.article
            id={`item-card-${item.id}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1]
            }}
            className="card poem-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{
                y: -8,
                transition: { duration: 0.3 }
            }}
        >
            {/* Card Header with Title */}
            <header className="poem-card-header">
                <h3 className="card-title poem-title">
                    {item.title}
                </h3>

                {/* Decorative line */}
                <motion.div
                    className="poem-title-line"
                    initial={{ width: 0 }}
                    whileInView={{ width: '40px' }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                />
            </header>

            {/* Card Content */}
            <div className="card-content poem-content">
                <p className={showFullContent ? 'poem-text-full' : 'poem-text-truncated'}>
                    {displayContent}
                </p>

                {/* Fade effect for truncated text */}
                {!showFullContent && hasMoreContent && (
                    <div className="poem-fade-overlay" aria-hidden="true" />
                )}
            </div>

            {/* Card Footer */}
            <footer className="card-footer poem-footer">
                <div className="poem-meta">
                    {item.date && (
                        <time
                            className="card-date poem-date"
                            dateTime={item.date}
                        >
                            <Calendar size={14} aria-hidden="true" />
                            <span>{formatDate(item.date)}</span>
                        </time>
                    )}
                </div>

                {/* View Full Button */}
                {hasMoreContent && (
                    <motion.button
                        onClick={onOpenModal ? onOpenModal : () => setShowFullContent(!showFullContent)}
                        className="btn btn-outline btn-sm poem-view-btn"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-expanded={showFullContent}
                        aria-label={showFullContent ? "ნაკლების ჩვენება" : "სრულად ნახვა"}
                    >
                        <Eye size={16} aria-hidden="true" />
                        <span>{onOpenModal ? 'სრულად ნახვა' : (showFullContent ? 'ნაკლების ჩვენება' : 'სრულად ნახვა')}</span>
                        {!onOpenModal && (
                            <motion.span
                                animate={{ rotate: showFullContent ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronRight
                                    size={16}
                                    aria-hidden="true"
                                    style={{
                                        transform: showFullContent ? 'rotate(-90deg)' : 'rotate(90deg)',
                                        transition: 'transform 0.2s ease'
                                    }}
                                />
                            </motion.span>
                        )}
                    </motion.button>
                )}
            </footer>

            {/* Hover Glow Effect */}
            <motion.div
                className="poem-card-glow"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
            />
        </motion.article>
    );
};

export default PoemCard;
