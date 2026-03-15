import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Feather, ArrowLeft } from 'lucide-react';

/* A short original poem for the 404 page */
const poem = {
    title: 'გზა, რომელიც არ არის',
    lines: [
        'ეძებ ბილიკს, მაგრამ ბილიკი',
        'დაიკარგა ნისლში, სიჩუმეში —',
        'ბრუნდები, რადგან ყოველი გზა',
        'საყვარელ ადგილამდე მიგვიყვანს.',
    ],
    author: '— ჟანა ანანიძე',
};

const NotFound = () => (
    <motion.div
        className="not-found-page"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    >
        {/* Decorative orbs */}
        <div className="nf-orb nf-orb-1" aria-hidden="true" />
        <div className="nf-orb nf-orb-2" aria-hidden="true" />

        <div className="not-found-content">
            {/* Icon */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                className="nf-feather"
            >
                <Feather size={56} />
            </motion.div>

            {/* 404 number */}
            <motion.div
                className="nf-code"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
            >
                404
            </motion.div>

            <div className="divider-gold" style={{ margin: '1.25rem auto', maxWidth: '120px' }} />

            {/* Poem */}
            <motion.article
                className="nf-poem"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                aria-label={poem.title}
            >
                <h2 className="nf-poem-title">{poem.title}</h2>
                <div className="nf-poem-lines">
                    {poem.lines.map((line, i) => (
                        <motion.p
                            key={i}
                            className="nf-poem-line"
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.45, delay: 0.6 + i * 0.1 }}
                        >
                            {line}
                        </motion.p>
                    ))}
                    <motion.p
                        className="nf-poem-author"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1, duration: 0.5 }}
                    >
                        {poem.author}
                    </motion.p>
                </div>
            </motion.article>

            {/* CTA */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
            >
                <Link to="/" className="btn btn-primary nf-btn">
                    <ArrowLeft size={16} />
                    <span>მთავარ გვერდზე დაბრუნება</span>
                </Link>
            </motion.div>
        </div>
    </motion.div>
);

export default NotFound;
