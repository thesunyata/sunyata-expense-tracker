import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaMoon, FaSun, FaArrowLeft, FaSignOutAlt } from 'react-icons/fa';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Profile = ({ user, onClose }) => {
    const [profile, setProfile] = useState({
        username: user?.user_metadata?.full_name || '',
        avatar_url: user?.user_metadata?.avatar_url || '',
    });
    const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark

    // Sync dark mode state with usage
    useEffect(() => {
        // Check if root has light-mode class or similar if we implemented toggle logic
    }, []);

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error('Error logging out:', error.message);
        window.location.reload(); // Force reload to clear state
    };

    return (
        <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                maxWidth: '400px', // Slide in panel size
                background: 'var(--surface-color)',
                zIndex: 200,
                padding: '2rem',
                boxShadow: '-10px 0 25px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem' }}>
                <button
                    onClick={onClose}
                    style={{
                        background: 'transparent',
                        color: 'var(--text-primary)',
                        fontSize: '1.2rem',
                        marginRight: '1rem',
                        padding: '8px',
                        borderRadius: '50%'
                    }}
                >
                    <FaArrowLeft />
                </button>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Profile</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '3rem' }}>
                <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    marginBottom: '1.5rem',
                    border: '3px solid var(--primary-color)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
                }}>
                    <img
                        src={profile.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                        alt="Profile"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{profile.username}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{user?.email}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button
                    style={{
                        padding: '1rem',
                        background: 'var(--surface-color-light)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        color: 'var(--text-primary)'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ padding: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                            {isDarkMode ? <FaMoon /> : <FaSun />}
                        </div>
                        <span>Dark Mode</span>
                    </div>
                    <div style={{
                        width: '50px',
                        height: '26px',
                        background: isDarkMode ? 'var(--primary-color)' : '#555',
                        borderRadius: '13px',
                        position: 'relative',
                        transition: 'background 0.3s'
                    }}>
                        <div style={{
                            width: '20px',
                            height: '20px',
                            background: 'white',
                            borderRadius: '50%',
                            position: 'absolute',
                            top: '3px',
                            left: isDarkMode ? '27px' : '3px',
                            transition: 'left 0.3s'
                        }} />
                    </div>
                </button>

                <button
                    onClick={handleSignOut}
                    style={{
                        marginTop: 'auto',
                        padding: '1rem',
                        background: 'rgba(244, 63, 94, 0.1)',
                        color: 'var(--accent-color)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontWeight: 600
                    }}
                >
                    <FaSignOutAlt />
                    Sign Out
                </button>
            </div>

        </motion.div>
    );
};

export default Profile;
