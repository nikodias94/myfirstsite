import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const Lightbox = ({ images, initialIndex = 0, isOpen, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
        }
    }, [isOpen, initialIndex]);

    // Handle keyboard navigation
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, currentIndex, images.length]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (typeof document === 'undefined') return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="lightbox-overlay">
                    <motion.div
                        className="lightbox-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                    />
                    
                    <div className="lightbox-content-wrapper">
                        {/* Header controls */}
                        <div className="lightbox-header">
                            <span className="lightbox-counter">
                                {currentIndex + 1} / {images.length}
                            </span>
                            <button onClick={onClose} className="lightbox-close-btn" title="დახურვა">
                                <X size={28} />
                            </button>
                        </div>

                        {/* Navigation Prev */}
                        {images.length > 1 && (
                            <button onClick={handlePrev} className="lightbox-nav-btn prev" title="წინა">
                                <ChevronLeft size={40} />
                            </button>
                        )}

                        {/* Main Image */}
                        <motion.div 
                            key={currentIndex}
                            className="lightbox-image-container"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                            <img 
                                src={images[currentIndex]} 
                                alt={`Gallery image ${currentIndex + 1}`} 
                                className="lightbox-image" 
                            />
                        </motion.div>

                        {/* Navigation Next */}
                        {images.length > 1 && (
                            <button onClick={handleNext} className="lightbox-nav-btn next" title="შემდეგი">
                                <ChevronRight size={40} />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default Lightbox;
