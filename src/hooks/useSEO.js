/**
 * useSEO — sets document title, meta description, og:title, og:description
 * per page without any external library.
 */
import { useEffect } from 'react';

const SITE_NAME = 'ჟანა ანანიძე';
const DEFAULT_DESC = 'ჟანა ანანიძეს პოეზია, პროზა, თარგმანები და ლიტერატურული რეცენზიები.';
const OG_IMAGE = 'https://zhana.ge/og-image.jpg';

const useSEO = ({ title, description, path = '' } = {}) => {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
    const desc = description || DEFAULT_DESC;
    const url = `https://zhana.ge${path}`;

    // Title
    document.title = fullTitle;

    // Helper to upsert a meta tag
    const setMeta = (selector, attr, value) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const [key, val] = selector.replace('meta[', '').replace(']', '').split('=');
        el.setAttribute(key.trim(), val.replace(/"/g, ''));
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]',        'content', desc);
    setMeta('meta[property="og:title"]',       'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', desc);
    setMeta('meta[property="og:url"]',         'content', url);
    setMeta('meta[property="og:image"]',       'content', OG_IMAGE);
    setMeta('meta[property="og:type"]',        'content', 'website');
    setMeta('meta[property="og:locale"]',      'content', 'ka_GE');
    setMeta('meta[name="twitter:card"]',       'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]',      'content', fullTitle);
    setMeta('meta[name="twitter:description"]','content', desc);
  }, [title, description, path]);
};

export default useSEO;
