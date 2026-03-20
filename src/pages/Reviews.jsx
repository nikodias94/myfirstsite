import React, { useState, useCallback } from 'react';
import { useContent } from '../context/ContentContext';
import { motion } from 'framer-motion';
import { Star, MessageSquareQuote, Eye } from 'lucide-react';
import ContentModal from '../components/ContentModal';
import useAutoOpenItem from '../hooks/useAutoOpenItem';
import PageHero from '../components/PageHero';
import useSEO from '../hooks/useSEO';

import PoemCard from '../components/PoemCard';

const Reviews = () => {
    const { content } = useContent();
    const { reviews } = content;
    const [selectedItem, setSelectedItem] = useState(null);

    useSEO({ title: 'რეცენზია', path: '/reviews' });

    const openItem = useCallback((item) => setSelectedItem(item), []);
    useAutoOpenItem(reviews, openItem);

    return (
        <>
            <PageHero
                variant="reviews"
                icon={Star}
                title="რეცენზია"
                subtitle="Literary Reviews"
            />

            <div className="container section-sm" style={{ paddingTop: 0 }}>
                {reviews.length > 0 ? (
                    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 'var(--space-8)' }}>
                        {reviews.map((item, index) => (
                            <PoemCard
                                key={item.id}
                                item={item}
                                index={index}
                                onOpenModal={() => setSelectedItem(item)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon"><MessageSquareQuote size={48} /></div>
                        <h3 className="empty-state-title">რეცენზიები ჯერ არ არის დამატებული</h3>
                        <p className="empty-state-text">მალე აქ გამოჩნდება ახალი რეცენზიები. დაბრუნდით მოგვიანებით!</p>
                    </div>
                )}

                <ContentModal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} id={selectedItem?.id} title={selectedItem?.title} content={selectedItem?.content} date={selectedItem?.date} />
            </div>
        </>
    );
};

export default Reviews;
