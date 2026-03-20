import React, { useState, useCallback } from 'react';
import { useContent } from '../context/ContentContext';
import { motion } from 'framer-motion';
import { Languages, BookOpen, Eye } from 'lucide-react';
import ContentModal from '../components/ContentModal';
import useAutoOpenItem from '../hooks/useAutoOpenItem';
import PageHero from '../components/PageHero';
import useSEO from '../hooks/useSEO';

import PoemCard from '../components/PoemCard';

const Translations = () => {
    const { content } = useContent();
    const { translations } = content;
    const [selectedItem, setSelectedItem] = useState(null);

    useSEO({ title: 'თარგმანი', path: '/translations' });

    const openItem = useCallback((item) => setSelectedItem(item), []);
    useAutoOpenItem(translations, openItem);

    return (
        <>
            <PageHero
                variant="translations"
                icon={Languages}
                title="თარგმანი"
                subtitle="Translations"
            />

            <div className="container section-sm" style={{ paddingTop: 0 }}>
                {translations.length > 0 ? (
                    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 'var(--space-8)' }}>
                        {translations.map((item, index) => (
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
                        <div className="empty-state-icon"><BookOpen size={48} /></div>
                        <h3 className="empty-state-title">თარგმანები ჯერ არ არის დამატებული</h3>
                        <p className="empty-state-text">მალე აქ გამოჩნდება ახალი თარგმანები. დაბრუნდით მოგვიანებით!</p>
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

export default Translations;
