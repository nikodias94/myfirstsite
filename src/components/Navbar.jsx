import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Feather } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import SearchBar from './SearchBar';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    // Handle scroll effect for glassmorphism
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        closeMenu();
    }, [location.pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const { content } = useContent();

    const isActive = (path) => location.pathname === path;

    return (
        <nav
            className={`navbar glass ${scrolled ? 'navbar-scrolled' : ''}`}
            role="navigation"
            aria-label="მთავარი ნავიგაცია"
        >
            <div className="nav-container">
                <Link to="/" className="nav-logo" aria-label="Zhana Ananidze - მთავარი გვერდი">
                    <Feather aria-hidden="true" />
                    <span>Zhana Ananidze</span>
                </Link>

                {/* Desktop Menu */}
                <div className="nav-links" role="menubar">
                    {content.navigation.map((link) => (
                        <Link
                            key={link.id || link.path}
                            to={link.path}
                            role="menuitem"
                            className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                            aria-current={isActive(link.path) ? 'page' : undefined}
                        >
                            <span className="nav-link-text">{link.title}</span>
                            <span className="nav-link-underline" aria-hidden="true" />
                        </Link>
                    ))}
                </div>

                {/* Search Bar - Desktop */}
                <div className="nav-search">
                    <SearchBar />
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="mobile-menu-btn"
                    aria-expanded={isOpen}
                    aria-label={isOpen ? "დახურე მენიუ" : "გახსენი მენიუ"}
                    aria-controls="mobile-menu"
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X size={28} aria-hidden="true" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Menu size={28} aria-hidden="true" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mobile-menu-backdrop"
                            onClick={closeMenu}
                            aria-hidden="true"
                        />

                        {/* Menu Panel */}
                        <motion.div
                            id="mobile-menu"
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{
                                type: 'spring',
                                damping: 30,
                                stiffness: 300
                            }}
                            className="mobile-menu glass"
                            role="dialog"
                            aria-label="მობილური მენიუ"
                            aria-modal="true"
                        >
                            <div className="mobile-menu-inner">
                                {/* Search bar inside mobile menu */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 }}
                                    className="mobile-search-wrapper"
                                >
                                    <SearchBar onNavigate={closeMenu} />
                                </motion.div>

                                <div className="mobile-menu-divider" />

                                {content.navigation.map((link, index) => (
                                    <motion.div
                                        key={link.id || link.path}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 + 0.1 }}
                                    >
                                        <Link
                                            to={link.path}
                                            onClick={closeMenu}
                                            className={`mobile-link ${isActive(link.path) ? 'active' : ''}`}
                                            aria-current={isActive(link.path) ? 'page' : undefined}
                                        >
                                            {link.title}
                                        </Link>
                                    </motion.div>
                                ))}

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: content.navigation.length * 0.05 + 0.1 }}
                                >
                                    <Link
                                        to="/admin"
                                        onClick={closeMenu}
                                        className="mobile-link mobile-link-admin"
                                    >
                                        ადმინ პანელი
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
