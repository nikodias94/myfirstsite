import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Calendar, ChevronRight, Share2, Twitter, Facebook, MessageCircle, Copy, Check, Heart } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const PoemCard = ({ item, index = 0, onOpenModal }) => {
    const { likes, toggleLike } = useContent();
    const [isHovered, setIsHovered] = useState(false);
    const [showFullContent, setShowFullContent] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [copied, setCopied] = useState(false);

    const itemCount = likes[item.id] || 0;
    const likedItems = JSON.parse(localStorage.getItem('zhana_liked_items') || '[]');
    const isLiked = likedItems.includes(item.id);

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

    // Calculate reading time
    const calculateReadingTime = (text) => {
        if (!text) return 0;
        const wordsPerMinute = 200;
        const noOfWords = text.split(/\s+/).length;
        const minutes = Math.ceil(noOfWords / wordsPerMinute);
        return minutes;
    };

    const readingTime = calculateReadingTime(item.content);

    // Share functionality
    const getShareUrl = () => {
        const origin = window.location.origin;
        const path = window.location.pathname.split('/')[1]; // get 'poetry' or 'prose' etc.
        if (item.slug) {
            return `${origin}/${path}/${item.slug}`;
        }
        return `${origin}/${path}?id=${item.id}`;
    };
    const shareUrl = getShareUrl();
    const shareTitle = `${item.title} — ჟანა ანანიძე`;

    const handleShare = (platform) => {
        let url = '';
        switch (platform) {
            case 'twitter':
                url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
                break;
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
                break;
            case 'whatsapp':
                url = `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`;
                break;
            case 'copy':
                navigator.clipboard.writeText(shareUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
                return;
            default:
                return;
        }
        window.open(url, '_blank', 'noopener,noreferrer');
        setShowShareMenu(false);
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
                    {readingTime > 0 && (
                        <span className="poem-reading-time">
                            • {readingTime} წთ. კითხვა
                        </span>
                    )}
                </div>

                <div className="poem-card-actions" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {/* Share Button */}
                    <div style={{ position: 'relative' }}>
                        <motion.button
                            onClick={() => setShowShareMenu(!showShareMenu)}
                            className="btn btn-icon btn-sm"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="გაზიარება"
                        >
                            <Share2 size={16} />
                        </motion.button>

                        {showShareMenu && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className="share-dropdown"
                                style={{
                                    position: 'absolute',
                                    bottom: '100%',
                                    right: 0,
                                    marginBottom: '0.5rem',
                                    background: 'var(--bg-secondary)',
                                    border: '1px solid var(--border-gold)',
                                    borderRadius: '8px',
                                    padding: '0.5rem',
                                    zIndex: 100,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.25rem',
                                    minWidth: '160px',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                                }}
                            >
                                <button onClick={() => handleShare('facebook')} className="share-item">
                                    <Facebook size={14} /> Facebook
                                </button>
                                <button onClick={() => handleShare('twitter')} className="share-item">
                                    <Twitter size={14} /> Twitter
                                </button>
                                <button onClick={() => handleShare('whatsapp')} className="share-item">
                                    <MessageCircle size={14} /> WhatsApp
                                </button>
                                <button onClick={() => handleShare('copy')} className="share-item">
                                    {copied ? <Check size={14} style={{ color: '#4ade80' }} /> : <Copy size={14} />} 
                                    {copied ? 'კოპირებულია!' : 'ბმულის კოპირება'}
                                </button>
                            </motion.div>
                        )}
                    </div>

                    {/* Like Button */}
                    <motion.button
                        onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }}
                        className="btn btn-icon btn-sm"
                        style={{ color: isLiked ? '#ef4444' : 'inherit' }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="მოწონება"
                    >
                        <Heart size={16} fill={isLiked ? '#ef4444' : 'none'} />
                        {itemCount > 0 && <span style={{ fontSize: '0.85rem', marginLeft: '0.3rem' }}>{itemCount}</span>}
                    </motion.button>

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
                </div>
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
