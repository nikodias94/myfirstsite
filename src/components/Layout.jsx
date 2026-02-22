import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
    const { pathname } = useLocation();
    const [scrollProgress, setScrollProgress] = useState(0);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    // Scroll progress indicator
    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Page transition variants
    const pageVariants = {
        initial: {
            opacity: 0,
            y: 20,
        },
        in: {
            opacity: 1,
            y: 0,
        },
        out: {
            opacity: 0,
            y: -20,
        },
    };

    const pageTransition = {
        type: 'tween',
        ease: 'anticipate',
        duration: 0.4,
    };

    return (
        <div className="app-layout">
            {/* Scroll Progress Indicator */}
            <div
                className="scroll-progress"
                role="progressbar"
                aria-label="გვერდის სქროლის პროგრესი"
                aria-valuenow={Math.round(scrollProgress)}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                <motion.div
                    className="scroll-progress-bar"
                    style={{ width: `${scrollProgress}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${scrollProgress}%` }}
                    transition={{ duration: 0.1 }}
                />
            </div>

            <Navbar />

            <main className="main-content">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={pathname}
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                        className="animate-fadeIn"
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
