import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingBag, FaCoffee, FaHome, FaCar, FaGamepad, FaTrash } from 'react-icons/fa';

const getIcon = (category) => {
    switch (category.toLowerCase()) {
        case 'food': return <FaCoffee />;
        case 'housing': return <FaHome />;
        case 'transport': return <FaCar />;
        case 'entertainment': return <FaGamepad />;
        default: return <FaShoppingBag />;
    }
};

const TransactionList = ({ transactions, onDelete }) => {
    return (
        <div style={{ paddingBottom: '80px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.2rem' }}>Recent Transactions</h3>
                <button style={{ color: 'var(--primary-color)', fontSize: '0.9rem' }}>View All</button>
            </div>

            <AnimatePresence initial={false}>
                {transactions.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '2rem' }}
                    >
                        No transactions yet.
                    </motion.div>
                )}

                {transactions.map((tx) => (
                    <motion.div
                        key={tx.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        layout
                        style={{
                            padding: '1rem',
                            background: 'var(--surface-color)',
                            marginBottom: '0.8rem',
                            borderRadius: 'var(--radius-sm)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                                width: '45px',
                                height: '45px',
                                borderRadius: '12px',
                                background: 'var(--surface-color-light)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--text-primary)',
                                fontSize: '1.1rem'
                            }}>
                                {getIcon(tx.category)}
                            </div>
                            <div>
                                <p style={{ fontWeight: 500 }}>{tx.text}</p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{tx.date}</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <p style={{
                                fontWeight: 600,
                                color: tx.amount > 0 ? 'var(--secondary-color)' : 'var(--accent-color)'
                            }}>
                                {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toFixed(2)}
                            </p>
                            <button
                                onClick={() => onDelete(tx.id)}
                                style={{
                                    background: 'transparent',
                                    color: 'var(--text-secondary)',
                                    opacity: 0.5,
                                    padding: '5px'
                                }}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default TransactionList;
