import React from 'react';
import { useContent } from '../context/ContentContext';
import { motion } from 'framer-motion';
import PoemCard from '../components/PoemCard';
import { Feather, PenLine } from 'lucide-react';

const Poetry = () => {
    const { content } = useContent();
    const { poems } = content;

    return (
        <div className="container section-sm">
            {/* Section Title */}
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

            {/* Poems Grid */}
            {poems.length > 0 ? (
                <div className="grid-poems">
                    {poems.map((poem, index) => (
                        <PoemCard key={poem.id} item={poem} index={index} />
                    ))}
                </div>
            ) : (
                /* Empty State */
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="empty-state"
                >
                    <div className="empty-state-icon">
                        <PenLine size={48} />
                    </div>
                    <h3 className="empty-state-title">ლექსები ჯერ არ არის დამატებული</h3>
                    <p className="empty-state-text">
                        მალე აქ გამოჩნდება ახალი ლექსები. დაბრუნდით მოგვიანებით!
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default Poetry;
