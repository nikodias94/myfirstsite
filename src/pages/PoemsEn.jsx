import React, { useState, useCallback } from 'react';
import { useContent } from '../context/ContentContext';
import { Globe, PenLine } from 'lucide-react';
import ContentModal from '../components/ContentModal';
import useAutoOpenItem from '../hooks/useAutoOpenItem';
import PoemCard from '../components/PoemCard';
import PageHero from '../components/PageHero';
import useSEO from '../hooks/useSEO';

const PoemsEn = () => {
    const { content } = useContent();
    const { poemsEn } = content;
    const [selectedItem, setSelectedItem] = useState(null);

    useSEO({ title: 'Poems in English', path: '/poems-en' });

    const openItem = useCallback((item) => setSelectedItem(item), []);
    useAutoOpenItem(poemsEn, openItem);

    return (
        <>
            <PageHero
                variant="poemsEn"
                icon={Globe}
                title="Poems in English"
                subtitle="English Language Poetry"
            />

            <div className="container section-sm" style={{ paddingTop: 0 }}>
                {poemsEn.length > 0 ? (
                    <div className="grid-poems">
                        {poemsEn.map((poem, index) => (
                            <PoemCard
                                key={poem.id}
                                item={poem}
                                index={index}
                                onOpenModal={() => setSelectedItem(poem)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon"><PenLine size={48} /></div>
                        <h3 className="empty-state-title">No Poems Available Yet</h3>
                        <p className="empty-state-text">English poems will appear here soon. Please check back later!</p>
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

export default PoemsEn;
