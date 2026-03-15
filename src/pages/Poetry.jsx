import React, { useState, useCallback } from 'react';
import { useContent } from '../context/ContentContext';
import { motion } from 'framer-motion';
import { Feather, PenLine } from 'lucide-react';
import ContentModal from '../components/ContentModal';
import useAutoOpenItem from '../hooks/useAutoOpenItem';
import PoemCard from '../components/PoemCard';

const Poetry = () => {
    const { content } = useContent();
    const { poems } = content;
    const [selectedItem, setSelectedItem] = useState(null);

    const openItem = useCallback((item) => setSelectedItem(item), []);
    useAutoOpenItem(poems, openItem);

    return (
        <div className="container section-sm">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="section-title">
                    <Feather size={32} style={{ marginBottom: '0.5rem', opacity: 0.8 }} />
                    <br />
                    პოეზია
                </h2>
            </motion.div>

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
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="empty-state"
                >
                    <div className="empty-state-icon"><PenLine size={48} /></div>
                    <h3 className="empty-state-title">ლექსები ჯერ არ არის დამატებული</h3>
                    <p className="empty-state-text">მალე აქ გამოჩნდება ახალი ლექსები. დაბრუნდით მოგვიანებით!</p>
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

export default Poetry;
