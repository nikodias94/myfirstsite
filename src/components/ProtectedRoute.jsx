import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (isMounted) setIsAuthenticated(!!session);
        };
        
        checkSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                if (isMounted) setIsAuthenticated(!!session);
            }
        );

        return () => {
            isMounted = false;
            subscription.unsubscribe();
        };
    }, []);

    if (isAuthenticated === null) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-dark)', color: 'var(--text-gold)' }}>
                 <div className="animate-spin" style={{ width: '24px', height: '24px', border: '2px solid transparent', borderTopColor: 'currentColor', borderRadius: '50%' }} />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
