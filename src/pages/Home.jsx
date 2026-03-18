import React from 'react';
import { useContent } from '../context/ContentContext';
import { motion } from 'framer-motion';
import { User, Feather } from 'lucide-react';
import useTypingEffect from '../hooks/useTypingEffect';
import PoemOfDay from '../components/PoemOfDay';

const Home = () => {
    const { content } = useContent();
    const { about } = content;
    const typingWordsList = about.typingWords
        ? about.typingWords.split(',').map(w => w.trim()).filter(Boolean)
        : ['პოეტი', 'პროზაიკოსი', 'მთარგმნელი', 'შემოქმედი'];
    const typedWord = useTypingEffect(typingWordsList, { typeSpeed: 90, deleteSpeed: 50, pauseMs: 1600 });

    const heroStyle = about.heroImage ? {
        backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 10, 0.7), rgba(10, 10, 10, 0.95)), url(${about.heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    } : {};

    return (
        <>
        <section className="hero" style={heroStyle}>
            {/* Gradient Orbs Background if no image */}
            {!about.heroImage && (
                <>
                    <div className="gradient-orb gradient-orb-1" />
                    <div className="gradient-orb gradient-orb-2" />
                    <div className="gradient-orb gradient-orb-3" />
                </>
            )}

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
                        style={{ color: 'var(--accent-gold)', opacity: 0.8 }}
                    />
                </motion.div>

                {/* Hero Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="hero-title"
                >
                    {about.name}
                </motion.h1>

                {/* Typing subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                    style={{
                        fontSize: 'var(--text-xl)',
                        color: 'var(--text-muted)',
                        fontFamily: 'var(--font-main)',
                        letterSpacing: '0.08em',
                        minHeight: '2rem',
                        marginBottom: 'var(--space-4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0',
                    }}
                    aria-live="polite"
                    aria-label={`ჟანა ანანიძე — ${typedWord}`}
                >
                    <span>{typedWord}</span>
                    <span className="typing-cursor" aria-hidden="true" />
                </motion.div>

                {/* Decorative Divider */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="divider-gold"
                />

                {/* Quote */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-8"
                >
                    <blockquote className="text-center" style={{ border: 'none', padding: 0, margin: 0 }}>
                        <span
                            className="italic text-lg"
                            style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}
                        >
                            {about.quote || '"პოეზია - ეს არის სიტყვებით ხატვა..."'}
                        </span>
                    </blockquote>
                </motion.div>
            </div>
        </section>

        {/* Poem of the Day */}
        <PoemOfDay />

        {/* Dynamic About Section */}
        {(about.aboutTitle || about.aboutDescription) && (
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                    background: 'var(--bg-secondary)',
                    borderTop: '1px solid var(--border-gold)',
                    borderBottom: '1px solid var(--border-gold)',
                    padding: '5rem 0'
                }}
            >
                <div className="container">
                    <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        {about.aboutImage && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                style={{ flex: '0 0 280px' }}
                            >
                                <div style={{
                                    width: '280px', height: '340px',
                                    borderRadius: '12px', overflow: 'hidden',
                                    border: '2px solid var(--border-gold)',
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
                                }}>
                                    <img src={about.aboutImage} alt={about.aboutTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            </motion.div>
                        )}
                        <div style={{ flex: 1, minWidth: '260px' }}>
                            {about.aboutTitle && (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}
                                    >
                                        <User size={22} style={{ color: 'var(--accent-gold)' }} />
                                        <span style={{ color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>
                                            {about.aboutTitle}
                                        </span>
                                    </motion.div>
                                    <div className="divider-gold" style={{ margin: '0 0 1.5rem', maxWidth: '80px' }} />
                                </>
                            )}
                            {about.aboutDescription && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    {about.aboutDescription.split('\n').map((para, i) =>
                                        para.trim() ? (
                                            <p key={i} style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: '1.25rem', fontSize: '1.05rem' }}>
                                                {para}
                                            </p>
                                        ) : null
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.section>
        )}
        </>
    );
};

export default Home;
