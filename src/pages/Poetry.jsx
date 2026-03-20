import React, { useState, useCallback } from 'react';
import { useContent } from '../context/ContentContext';
import { Feather, PenLine } from 'lucide-react';
import ContentModal from '../components/ContentModal';
import useAutoOpenItem from '../hooks/useAutoOpenItem';
import PoemCard from '../components/PoemCard';
import PageHero from '../components/PageHero';

const Poetry = () => {
    const { content } = useContent();
    const { poems } = content;
    const [selectedItem, setSelectedItem] = useState(null);

    const openItem = useCallback((item) => setSelectedItem(item), []);
    useAutoOpenItem(poems, openItem);

    return (
        <>
            <PageHero
                variant="poetry"
                icon={Feather}
                title="პოეზია"
                subtitle="Georgian Poetry"
            />

            <div className="container section-sm" style={{ paddingTop: 0 }}>
                {poems.length > 0 ? (
                    <div className="grid-poems">
                        {poems.map((poem, index) => (
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
                        <h3 className="empty-state-title">ლექსები ჯერ არ არის დამატებული</h3>
                        <p className="empty-state-text">მალე აქ გამოჩნდება ახალი ლექსები. დაბრუნდით მოგვიანებით!</p>
                    </div>
                )}

                <ContentModal
                    isOpen={!!selectedItem}
                    onClose={() => setSelectedItem(null)}
                    title={selectedItem?.title}
                    content={selectedItem?.content}
                    date={selectedItem?.date}
                />
            </div>
        </>
    );
};

export default Poetry;
