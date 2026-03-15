import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Reads location.state.highlightId after navigation.
 * Calls `onOpen(item)` for the matching item and scrolls its card into view.
 *
 * @param {Array}    items   - array of content items [{ id, ... }]
 * @param {Function} onOpen  - callback to open the modal/detail for that item
 */
const useAutoOpenItem = (items, onOpen) => {
    const location = useLocation();
    const handled = useRef(false);

    useEffect(() => {
        // Reset on every navigation so re-visits work correctly
        handled.current = false;
    }, [location.key]);

    useEffect(() => {
        if (handled.current) return;
        const highlightId = location.state?.highlightId;
        if (!highlightId || !items || items.length === 0) return;

        const match = items.find((it) => String(it.id) === String(highlightId));
        if (!match) return;

        handled.current = true;

        // Small delay so the page has rendered before opening
        const timer = setTimeout(() => {
            onOpen(match);

            // Scroll the card into view
            const el = document.getElementById(`item-card-${match.id}`);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 200);

        return () => clearTimeout(timer);
    }, [items, location.state, onOpen, location.key]);
};

export default useAutoOpenItem;
