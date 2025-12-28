import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp, FaArrowDown, FaWallet } from 'react-icons/fa';

const BalanceCard = ({ totalBalance, income, expense }) => {
    return (
        <motion.div
            className="glass-panel"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
                marginBottom: '2rem',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div style={{ position: 'relative', zIndex: 1 }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Balance</p>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                    ₹{totalBalance.toFixed(2)}
                </h2>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'rgba(16, 185, 129, 0.2)',
                            color: 'var(--secondary-color)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <FaArrowUp />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Income</p>
                            <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>+₹{income.toFixed(2)}</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'rgba(244, 63, 94, 0.2)',
                            color: 'var(--accent-color)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <FaArrowDown />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Expense</p>
                            <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>-₹{Math.abs(expense).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Blur */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '200px',
                height: '200px',
                background: 'var(--primary-color)',
                filter: 'blur(80px)',
                opacity: 0.3,
                borderRadius: '50%',
                zIndex: 0
            }} />
        </motion.div>
    );
};

export default BalanceCard;
