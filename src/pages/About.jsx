import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

/* ─── Timeline data ─── */
const timeline = [
    { year: '2010', event: 'პოეზიის წერა — პირველი ლექსები' },
    { year: '2014', event: 'პირველი კრებულის გამოცემა' },
    { year: '2017', event: 'სალიტერატურო ჟურნალ "მნათობი"-ში პუბლიკაციები' },
    { year: '2020', event: 'ინგლისურ ენაზე თარგმნები, საერთაშორისო ექსპოზიცია' },
    { year: '2024', event: 'მეორე კრებული და ახალი პროზა' },
];

/* ─── Stat cards ─── */
const stats = [
    { icon: BookOpen,  label: 'პოეზია',    id: 'poems' },
    { icon: Globe,     label: 'ინგლისური', id: 'poems-en' },
    { icon: Languages, label: 'თარგმანი',  id: 'translations' },
    { icon: Star,      label: 'რეცენზია',  id: 'reviews' },
    { icon: BookText,  label: 'პროზა',     id: 'prose' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12 }
    }
};
const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } }
};

const About = () => {
    const { content } = useContent();
    const [expandedTimeline, setExpandedTimeline] = useState(false);

    // Fallbacks if data empty
    const aboutTitle = content.about?.aboutTitle || 'ჩემს შესახებ';
    const aboutBio = content.about?.aboutBio || 'ჟანა ანანიძე — ქართველი პოეტი, პროზაიკოსი და მთარგმნელი... (განაახლეთ ტექსტი მართვის პანელიდან)';
    const aboutQuote = content.about?.aboutQuote || 'პოეზია ჟანასთვის არ არის მხოლოდ სიტყვები — ეს არის დუნდულა, სადაც ინახება ყველაზე ნამდვილი განცდები.';
    const aboutImage = content.about?.aboutImage || null;

    return (
        <div className="about-page">

            {/* ── HERO BANNER ── */}
            <motion.section
                className="about-hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="about-hero-orb about-hero-orb-1" />
                <div className="about-hero-orb about-hero-orb-2" />

                <motion.div
                    className="about-hero-content container"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="about-feather-icon">
                        <Feather size={52} />
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="about-hero-title">
                        ჟანა ანანიძე
                    </motion.h1>

                    <motion.div variants={itemVariants} className="divider-gold" style={{ margin: '1.25rem auto' }} />

                    <motion.p variants={itemVariants} className="about-hero-subtitle">
                        პოეტი · პროზაიკოსი · მთარგმნელი
                    </motion.p>
                </motion.div>
            </motion.section>

            {/* ── BIO SECTION ── */}
            <motion.section
                className="container section-sm about-bio-section"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
            >
                <div className="about-bio-grid">
                    {/* Portrait */}
                    <motion.div variants={itemVariants} className="about-portrait-wrapper">
                        <div className="about-portrait" style={aboutImage ? { backgroundImage: `url(${aboutImage})`, backgroundSize: 'cover', backgroundPosition: 'center', border: 'none' } : {}}>
                            {!aboutImage && (
                                <>
                                    <User size={64} className="about-portrait-icon" />
                                    <p className="about-portrait-hint">ფოტო მალე დაემატება</p>
                                </>
                            )}
                        </div>
                    </motion.div>

                    {/* Bio text */}
                    <motion.div variants={itemVariants} className="about-bio-text">
                        <div className="about-section-label">
                            <User size={18} />
                            <span>{aboutTitle}</span>
                        </div>
                        <div className="divider-gold" style={{ margin: '0.75rem 0 1.5rem', maxWidth: '60px' }} />

                        <div style={{ whiteSpace: 'pre-line' }}>
                            <p style={{ marginBottom: '1.5rem' }}>{aboutBio}</p>
                            {aboutQuote && (
                                <blockquote style={{
                                    borderLeft: '4px solid var(--accent-gold)',
                                    paddingLeft: '1.5rem',
                                    paddingTop: '0.5rem',
                                    paddingBottom: '0.5rem',
                                    margin: '2rem 0',
                                    fontStyle: 'italic',
                                    color: 'var(--accent-gold)',
                                    fontSize: '1.1rem',
                                    background: 'var(--accent-gold-dim)',
                                    borderRadius: '0 8px 8px 0'
                                }}>
                                    "{aboutQuote}"
                                </blockquote>
                            )}
                        </div>

                        <div className="about-cta-row">
                            <Link to="/poetry" className="btn btn-primary">
                                <BookOpen size={16} />
                                <span>ნაწარმოებები</span>
                            </Link>
                            <Link to="/contact" className="btn btn-outline">
                                <span>დამიკავშირდი</span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── WORKS QUICK LINKS ── */}
            <motion.section
                className="about-stats-section"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
            >
                <div className="container">
                    <motion.div variants={itemVariants} className="about-section-label" style={{ justifyContent: 'center', marginBottom: '2rem' }}>
                        <Award size={18} />
                        <span>ნაწარმოებების კატეგორიები</span>
                    </motion.div>
                    <div className="about-stats-grid">
                        {stats.map(({ icon: Icon, label, id }) => (
                            <motion.div key={id} variants={itemVariants}>
                                <Link to={`/${id}`} className="about-stat-card">
                                    <Icon size={28} className="about-stat-icon" />
                                    <span className="about-stat-label">{label}</span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* ── TIMELINE ── */}
            <motion.section
                className="container section-sm"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
            >
                <motion.div variants={itemVariants} className="about-section-label" style={{ marginBottom: '2rem' }}>
                    <Star size={18} />
                    <span>ლიტერატურული გზა</span>
                </motion.div>

                <div className="about-timeline">
                    {(expandedTimeline ? timeline : timeline.slice(0, 3)).map((item, i) => (
                        <motion.div
                            key={item.year}
                            className="about-timeline-item"
                            variants={itemVariants}
                            custom={i}
                        >
                            <div className="about-timeline-year">{item.year}</div>
                            <div className="about-timeline-dot" />
                            <div className="about-timeline-event">{item.event}</div>
                        </motion.div>
                    ))}
                </div>

                {timeline.length > 3 && (
                    <motion.button
                        className="btn btn-ghost btn-sm"
                        onClick={() => setExpandedTimeline(!expandedTimeline)}
                        style={{ marginTop: '1.5rem' }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <motion.span animate={{ rotate: expandedTimeline ? 180 : 0 }}>
                            <ChevronDown size={16} />
                        </motion.span>
                        <span>{expandedTimeline ? 'ნაკლების ჩვენება' : 'მეტის ჩვენება'}</span>
                    </motion.button>
                )}
            </motion.section>
        </div>
    );
};

export default About;
