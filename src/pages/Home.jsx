import React from 'react';
import { useContent } from '../context/ContentContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, User, Feather } from 'lucide-react';

const Home = () => {
    const { content } = useContent();
    const { about } = content;

    // Split bio into sentences for staggered animation
    const bioSentences = about.bio ? about.bio.split('. ').filter(s => s.trim()) : [];

    return (
        <section className="hero">
            {/* Gradient Orbs Background */}
            <div className="gradient-orb gradient-orb-1" />
            <div className="gradient-orb gradient-orb-2" />
            <div className="gradient-orb gradient-orb-3" />

            <div className="hero-container">
                {/* Animated Icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    className="mb-6"
                >
                    <Feather
                        size={48}
                        className="text-gold mx-auto"
                        style={{ color: 'var(--accent-gold)', opacity: 0.8 }}
                    />
                </motion.div>

                {/* Hero Title with Animation */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="hero-title"
                >
                    {about.name}
                </motion.h1>

                {/* Decorative Divider */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="divider-gold"
                />

                {/* Bio with Staggered Text Reveal */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="hero-bio"
                >
                    {bioSentences.map((sentence, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: 0.6 + (index * 0.15),
                                ease: [0.25, 0.1, 0.25, 1]
                            }}
                            className="inline"
                        >
                            {sentence}{index < bioSentences.length - 1 ? '. ' : ''}
                        </motion.span>
                    ))}
                </motion.div>

                {/* Quote */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="mt-8"
                >
                    <blockquote className="text-center" style={{ border: 'none', padding: 0, margin: 0 }}>
                        <span
                            className="italic text-lg"
                            style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}
                        >
                            "პოეზია - ეს არის სიტყვებით ხატვა..."
                        </span>
                    </blockquote>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    className="hero-cta"
                >
                    <Link to="/poetry" className="btn btn-primary btn-lg">
                        <BookOpen size={20} />
                        <span>ნაწარმოებები</span>
                    </Link>
                    <Link to="/about" className="btn btn-outline btn-lg">
                        <User size={20} />
                        <span>ჩემ შესახებ</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Home;
