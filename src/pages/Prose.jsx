import React, { useState, useCallback } from 'react';
import { useContent } from '../context/ContentContext';
import { motion } from 'framer-motion';
import { BookText, FileText, Eye } from 'lucide-react';
import ContentModal from '../components/ContentModal';
import useAutoOpenItem from '../hooks/useAutoOpenItem';
import PageHero from '../components/PageHero';
import useSEO from '../hooks/useSEO';

import PoemCard from '../components/PoemCard';

const Prose = () => {
    const { content } = useContent();
    const { prose } = content;
    const [selectedItem, setSelectedItem] = useState(null);

    useSEO({ title: 'პროზა', path: '/prose' });

    const openItem = useCallback((item) => setSelectedItem(item), []);
    useAutoOpenItem(prose, openItem);

    return (
        <>
            <PageHero
                variant="prose"
                icon={BookText}
                title="პროზა"
                subtitle="Prose & Narrative"
            />

            <div className="container section-sm" style={{ paddingTop: 0 }}>
                {prose.length > 0 ? (
                    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 'var(--space-8)' }}>
                        {prose.map((item, index) => (
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
                        <div className="empty-state-icon"><FileText size={48} /></div>
                        <h3 className="empty-state-title">პროზა ჯერ არ არის დამატებული</h3>
                        <p className="empty-state-text">მალე აქ გამოჩნდება ახალი პროზის ნაწარმოებები. დაბრუნდით მოგვიანებით!</p>
                    </div>
                )}

                <ContentModal
                isOpen={!!selectedItem}
                onClose={() => setSelectedItem(null)}
                id={selectedItem?.id}
                title={selectedItem?.title}
                content={selectedItem?.content}
                date={selectedItem?.date}
            />
            </div>
        </>
    );
};

export default Prose;
