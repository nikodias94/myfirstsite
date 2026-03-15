import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, X, BookOpen, FileText, Globe, Star, BookText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

// Mapping each table to a display label, icon and route
const TABLES = [
    { table: 'poems',        label: 'პოეზია',    icon: BookOpen,  route: '/poetry' },
    { table: 'poems_en',     label: 'ლექსები (EN)', icon: Globe,  route: '/poems-en' },
    { table: 'translations', label: 'თარგმანი',  icon: Globe,     route: '/translations' },
    { table: 'reviews',      label: 'რეცენზია',  icon: Star,      route: '/reviews' },
    { table: 'prose',        label: 'პროზა',     icon: BookText,  route: '/prose' },
];

const SearchBar = ({ onNavigate } = {}) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const inputRef = useRef(null);
    const containerRef = useRef(null);
    const debounceRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Close dropdown on route change
    useEffect(() => {
        setQuery('');
        setResults([]);
        setOpen(false);
    }, [location.pathname]);

    // Close on outside click
    useEffect(() => {
        const handleClick = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const runSearch = useCallback(async (searchQuery) => {
        if (!searchQuery.trim()) {
            setResults([]);
            setOpen(false);
            return;
        }

        setLoading(true);
        try {
            const promises = TABLES.map(({ table, label, icon, route }) =>
                supabase
                    .from(table)
                    .select('id, title')
                    .ilike('title', `%${searchQuery}%`)
                    .limit(4)
                    .then(({ data }) =>
                        (data || []).map(item => ({ ...item, label, icon, route, table }))
                    )
            );
            const allResults = (await Promise.all(promises)).flat();
            setResults(allResults);
            setOpen(true);
        } catch (err) {
            console.error('Search error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleChange = (e) => {
        const val = e.target.value;
        setQuery(val);
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => runSearch(val), 300);
    };

    const handleSelect = (item) => {
        navigate(`${item.route}`, { state: { highlightId: item.id } });
        setQuery('');
        setResults([]);
        setOpen(false);
        onNavigate?.();
    };

    const handleClear = () => {
        setQuery('');
        setResults([]);
        setOpen(false);
        inputRef.current?.focus();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') handleClear();
    };

    return (
        <div ref={containerRef} className="search-bar-wrapper" role="search">
            <div className="search-bar-input-row">
                <Search
                    size={16}
                    className="search-bar-icon"
                    aria-hidden="true"
                />
                <input
                    ref={inputRef}
                    type="search"
                    value={query}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => query.trim() && setOpen(true)}
                    placeholder="ძებნა სათაურით..."
                    className="search-bar-input"
                    aria-label="ძებნა"
                    aria-expanded={open}
                    aria-autocomplete="list"
                    autoComplete="off"
                />
                <AnimatePresence>
                    {query && (
                        <motion.button
                            key="clear"
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                            transition={{ duration: 0.15 }}
                            onClick={handleClear}
                            className="search-bar-clear"
                            aria-label="გასუფთავება"
                            type="button"
                        >
                            <X size={14} />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            {/* Dropdown Results */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="dropdown"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                        className="search-dropdown glass"
                        role="listbox"
                        aria-label="ძებნის შედეგები"
                    >
                        {loading ? (
                            <div className="search-dropdown-empty">
                                <span className="search-loading-dot" />
                                <span className="search-loading-dot" style={{ animationDelay: '0.15s' }} />
                                <span className="search-loading-dot" style={{ animationDelay: '0.3s' }} />
                            </div>
                        ) : results.length === 0 ? (
                            <div className="search-dropdown-empty">
                                <FileText size={18} style={{ opacity: 0.4 }} />
                                <span>ვერაფერი მოიძებნა</span>
                            </div>
                        ) : (
                            results.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <motion.button
                                        key={`${item.table}-${item.id}`}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.03 }}
                                        onClick={() => handleSelect(item)}
                                        className="search-result-item"
                                        role="option"
                                        type="button"
                                    >
                                        <Icon size={15} className="search-result-icon" />
                                        <div className="search-result-text">
                                            <span className="search-result-title">{item.title}</span>
                                            <span className="search-result-category">{item.label}</span>
                                        </div>
                                    </motion.button>
                                );
                            })
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchBar;
