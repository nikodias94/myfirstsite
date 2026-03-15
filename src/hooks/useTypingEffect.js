import { useState, useEffect, useCallback } from 'react';

/**
 * Typing animation hook.
 * Cycles through `words` array, types each word, pauses, then deletes.
 */
const useTypingEffect = (words = [], { typeSpeed = 80, deleteSpeed = 45, pauseMs = 1800 } = {}) => {
    const [displayText, setDisplayText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const tick = useCallback(() => {
        const current = words[wordIndex] || '';

        setDisplayText(prev => {
            if (!isDeleting) {
                // Typing forward
                if (prev.length < current.length) return current.slice(0, prev.length + 1);
                return prev; // full word reached - trigger pause then delete
            } else {
                // Deleting
                if (prev.length > 0) return prev.slice(0, -1);
                return prev; // empty - advance word
            }
        });
    }, [words, wordIndex, isDeleting]);

    useEffect(() => {
        if (!words.length) return;
        const current = words[wordIndex] || '';

        let delay = isDeleting ? deleteSpeed : typeSpeed;

        // Pause at full word before deleting
        if (!isDeleting && displayText === current) {
            delay = pauseMs;
        }

        const timer = setTimeout(() => {
            if (!isDeleting && displayText === current) {
                setIsDeleting(true);
            } else if (isDeleting && displayText === '') {
                setIsDeleting(false);
                setWordIndex(i => (i + 1) % words.length);
            } else {
                tick();
            }
        }, delay);

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pauseMs, tick]);

    return displayText;
};

export default useTypingEffect;
