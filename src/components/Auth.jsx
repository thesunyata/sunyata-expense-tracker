import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { supabase } from '../supabaseClient';

const Auth = () => {
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });
            if (error) throw error;
        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-color)',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1000
        }}>
            {/* Background Ambience */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '20%',
                width: '300px',
                height: '300px',
                background: 'var(--primary-color)',
                filter: 'blur(120px)',
                opacity: 0.2,
                borderRadius: '50%',
                pointerEvents: 'none'
            }} />

            <div style={{
                position: 'absolute',
                bottom: '20%',
                right: '20%',
                width: '250px',
                height: '250px',
                background: 'var(--accent-color)',
                filter: 'blur(120px)',
                opacity: 0.15,
                borderRadius: '50%',
                pointerEvents: 'none'
            }} />

            <motion.div
                className="glass-panel"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    width: '90%',
                    maxWidth: '400px',
                    padding: '3rem 2rem',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: 800 }}>
                        Śūnyatā
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1rem' }}>
                        Find clarity in your finances.
                    </p>
                </motion.div>

                <motion.button
                    onClick={handleGoogleLogin}
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: 'var(--radius-md)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        fontSize: '1rem',
                        fontWeight: 500,
                        cursor: loading ? 'wait' : 'pointer',
                        transition: 'background 0.3s'
                    }}
                >
                    <FcGoogle size={24} />
                    {loading ? 'Connecting...' : 'Continue with Google'}
                </motion.button>

                <p style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'var(--text-secondary)', opacity: 0.7 }}>
                    By continuing, you simply agree to be mindful.
                </p>
            </motion.div>
        </div>
    );
};

export default Auth;
