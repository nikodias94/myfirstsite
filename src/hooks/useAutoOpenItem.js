import { useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';

/**
 * Reads location.state.highlightId after navigation.
 * Calls `onOpen(item)` for the matching item and scrolls its card into view.
 *
 * @param {Array}    items   - array of content items [{ id, ... }]
 * @param {Function} onOpen  - callback to open the modal/detail for that item
 */
const useAutoOpenItem = (items, onOpen) => {
    const location = useLocation();
    const { slug } = useParams();
    const handled = useRef(false);

    useEffect(() => {
        // Reset on every navigation so re-visits work correctly
        handled.current = false;
    }, [location.key]);

    useEffect(() => {
        if (!items || items.length === 0) return;

        const highlightId = location.state?.highlightId;
        
        let match;
        if (slug) {
            match = items.find((it) => it.slug === slug);
        } else if (highlightId) {
            match = items.find((it) => String(it.id) === String(highlightId));
        }

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
