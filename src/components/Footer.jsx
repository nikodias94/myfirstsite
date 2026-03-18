import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Footer = () => {
    const { content } = useContent();
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Helper to get Lucide icon component by name, fallback to a default if not found
    const getIconComponent = (iconName) => {
        const Icon = LucideIcons[iconName];
        return Icon || LucideIcons.Link; 
    };

    return (
        <footer className="footer">
            {/* Gradient Border Top */}
            <div className="footer-gradient-border" aria-hidden="true" />

            <div className="container">
                <div className="footer-content">
                    {/* Social Icons */}
                    <motion.div
                        className="footer-social"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        {content.socialLinks?.map((social, index) => {
                            const IconComponent = getIconComponent(social.icon_name);
                            return (
                                <motion.a
                                    key={social.id || social.platform_name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon"
                                    aria-label={social.platform_name}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{
                                        scale: 1.15,
                                        backgroundColor: 'var(--accent-gold)',
                                        borderColor: 'var(--accent-gold)'
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <IconComponent size={20} aria-hidden="true" />
                                </motion.a>
                            );
                        })}
                    </motion.div>

                    {/* Copyright Text */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <p className="footer-text">
                            © {currentYear} Zhana Ananidze. ყველა უფლება დაცულია.
                        </p>
                        <p className="footer-subtext">
                            {content.about?.footerText || 'Created with ❤️ & React'}
                        </p>
                    </motion.div>

                    {/* Back to Top Button */}
                    <motion.button
                        onClick={scrollToTop}
                        className="btn btn-outline btn-sm back-to-top"
                        aria-label="ზემოთ დაბრუნება"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <LucideIcons.ArrowUp size={16} aria-hidden="true" />
                        <span>ზემოთ დაბრუნება</span>
                    </motion.button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
