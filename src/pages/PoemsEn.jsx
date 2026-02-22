import React from 'react';
import { useContent } from '../context/ContentContext';
import { motion } from 'framer-motion';
import PoemCard from '../components/PoemCard';
import { Globe, PenLine } from 'lucide-react';

const PoemsEn = () => {
    const { content } = useContent();
    const { poemsEn } = content;

    return (
        <div className="container section-sm">
            {/* Section Title */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="section-title">
                    <Globe size={32} style={{ marginBottom: '0.5rem', opacity: 0.8 }} />
                    <br />
                    Poems in English
                </h2>
            </motion.div>

            {/* Poems Grid */}
            {poemsEn.length > 0 ? (
                <div className="grid-poems">
                    {poemsEn.map((poem, index) => (
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
                    <h3 className="empty-state-title">No Poems Available Yet</h3>
                    <p className="empty-state-text">
                        English poems will appear here soon. Please check back later!
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default PoemsEn;
