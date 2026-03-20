import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, AlertCircle, LogIn } from 'lucide-react';

import { supabase } from '../lib/supabase';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!supabase) {
            setError('სერვერთან კავშირი ვერ დამყარდა (Supabase NOT initialized)');
            setIsLoading(false);
            return;
        }

        const { error } = await supabase.auth.signInWithPassword({
            email: `${username}@admin.com`,
            password,
        });

        if (error) {
            setError(error.message === 'Invalid login credentials' ? 'მომხმარებლის სახელი ან პაროლი არასწორია' : error.message);
            setIsLoading(false);
        } else {
            navigate('/admin');
        }
    };

    return (
        <div className="login-container">
            {/* Background Gradient Orbs */}
            <div className="gradient-orb gradient-orb-1" style={{ opacity: 0.2 }} />
            <div className="gradient-orb gradient-orb-2" style={{ opacity: 0.15 }} />

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="login-card card"
            >
                {/* Glassmorphism overlay */}
                <div className="glass" style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 'var(--radius-lg)',
                    zIndex: -1
                }} />

                {/* Header */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                        style={{
                            background: 'var(--accent-gold-dim)',
                            border: '1px solid var(--border-gold)'
                        }}
                    >
                        <Lock size={28} style={{ color: 'var(--accent-gold)' }} />
                    </motion.div>
                    <h2 className="card-title" style={{ textAlign: 'center', margin: 0 }}>
                        ავტორიზაცია
                    </h2>
                    <p className="text-muted mt-2" style={{ fontSize: 'var(--text-sm)' }}>
                        შეიყვანეთ პაროლი ადმინ პანელში შესასვლელად
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="flex flex-col gap-6">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">მომხმარებლის სახელი</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setError('');
                            }}
                            placeholder="შეიყვანეთ მომხმარებლის სახელი"
                            className={`form-input ${error ? 'error' : ''}`}
                            style={{
                                background: error ? 'rgba(239, 68, 68, 0.05)' : undefined
                            }}
                            disabled={isLoading}
                            required
                        />
                    </div>
                    
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">პაროლი</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError('');
                                }}
                                placeholder="შეიყვანეთ პაროლი"
                                className={`form-input ${error ? 'error' : ''}`}
                                style={{
                                    paddingRight: '3rem',
                                    background: error ? 'rgba(239, 68, 68, 0.05)' : undefined
                                }}
                                disabled={isLoading}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="btn-ghost"
                                style={{
                                    position: 'absolute',
                                    right: '0.75rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    padding: '0.25rem',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--text-muted)'
                                }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="form-error"
                        >
                            <AlertCircle size={16} />
                            <span>{error}</span>
                        </motion.div>
                    )}

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={isLoading}
                        whileHover={{ scale: isLoading ? 1 : 1.02 }}
                        whileTap={{ scale: isLoading ? 1 : 0.98 }}
                        style={{
                            opacity: isLoading ? 0.7 : 1,
                            cursor: isLoading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isLoading ? (
                            <>
                                <div
                                    className="animate-spin"
                                    style={{
                                        width: '18px',
                                        height: '18px',
                                        border: '2px solid transparent',
                                        borderTopColor: 'currentColor',
                                        borderRadius: '50%'
                                    }}
                                />
                                <span>მიმდინარეობს...</span>
                            </>
                        ) : (
                            <>
                                <LogIn size={18} />
                                <span>შესვლა</span>
                            </>
                        )}
                    </motion.button>
                </form>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-muted" style={{ fontSize: 'var(--text-xs)' }}>
                        დაცულია ადმინისტრატორის უფლებებით
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
