import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Feather, Home, ArrowLeft } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const NotFound = () => {
  useSEO({ title: 'გვერდი ვერ მოიძებნა', path: '/404' });

  const poems = [
    '"ეძებ გვერდს, მაგრამ ეს გვერდი სადღაც დაიკარგა,\n  მსგავსად სიტყვისა, რომელიც ლექსიდან გაიქცა..."',
    '"ბილიკი ვერ ვიპოვე, ამ ნისლში ჩამიხლია,\n  მაგრამ სხვა გვერდი მელოდება — წინ გზა გამიხლია..."',
    '"ეს URL-ი ასოებად დაიშალა სივრცეში,\n  მოდი სახლში ვბრუნდეთ — იქ ლექსი გელოდება შენ."',
  ];
  const msg = poems[Math.floor(Math.random() * poems.length)];

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '3rem 2rem',
      background: 'radial-gradient(ellipse at 50% 30%, rgba(201,169,110,0.12) 0%, transparent 60%)',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ marginBottom: '2rem' }}
      >
        <Feather size={64} style={{ color: 'var(--accent-gold)', opacity: 0.6 }} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          fontSize: 'clamp(5rem, 15vw, 9rem)',
          fontFamily: 'var(--font-heading)',
          background: 'linear-gradient(135deg, var(--accent-gold) 0%, rgba(201,169,110,0.4) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1,
          margin: 0,
        }}
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        style={{
          fontFamily: 'var(--font-main)',
          fontSize: '1.1rem',
          color: 'var(--text-muted)',
          fontStyle: 'italic',
          whiteSpace: 'pre-line',
          maxWidth: '480px',
          lineHeight: 1.8,
          marginTop: '1.5rem',
          marginBottom: '2.5rem',
        }}
      >
        {msg}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <Link to="/" className="btn btn-primary">
          <Home size={18} /> მთავარ გვერდზე
        </Link>
        <button onClick={() => window.history.back()} className="btn btn-outline">
          <ArrowLeft size={18} /> უკან დაბრუნება
        </button>
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        style={{
          width: '120px', height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)',
          marginTop: '3rem',
        }}
      />
    </div>
  );
};

export default NotFound;
