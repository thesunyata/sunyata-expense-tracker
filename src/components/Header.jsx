import React from 'react';
import { motion } from 'framer-motion';

const Header = ({ user, onProfileClick }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        marginTop: '1rem'
      }}
    >
      <h1 className="title-gradient" style={{ fontSize: '1.8rem', fontWeight: 700 }}>
        Śūnyatā
      </h1>
      <button
        onClick={onProfileClick}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'var(--surface-color-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          border: '1px solid var(--glass-border)',
          cursor: 'pointer',
          padding: 0
        }}
      >
        <img
          src={user?.user_metadata?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
          alt="User"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </button>
    </motion.header>
  );
};

export default Header;
