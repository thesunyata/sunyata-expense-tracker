import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const categories = ['Food', 'Housing', 'Transport', 'Entertainment', 'Shopping', 'Other'];

const AddTransactionModal = ({ isOpen, onClose, onAdd }) => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Food');
    const [type, setType] = useState('expense'); // 'income' or 'expense'

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text || !amount) return;

        const finalAmount = type === 'expense' ? -Math.abs(parseFloat(amount)) : Math.abs(parseFloat(amount));

        onAdd({
            text,
            amount: finalAmount,
            category,
            date: new Date().toLocaleDateString()
        });

        setText('');
        setAmount('');
        setCategory('Food');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.6)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 100
                        }}
                    />
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        style={{
                            position: 'fixed',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: 'var(--surface-color)',
                            borderTopLeftRadius: 'var(--radius-lg)',
                            borderTopRightRadius: 'var(--radius-lg)',
                            padding: '2rem',
                            zIndex: 101,
                            maxWidth: '600px',
                            margin: '0 auto',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.4rem' }}>Add Transaction</h2>
                            <button onClick={onClose} style={{ background: 'transparent', color: 'var(--text-secondary)' }}>
                                <FaTimes size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', background: 'var(--surface-color-light)', borderRadius: '12px', padding: '4px' }}>
                                    <div
                                        onClick={() => setType('expense')}
                                        style={{
                                            flex: 1,
                                            textAlign: 'center',
                                            padding: '10px',
                                            borderRadius: '10px',
                                            background: type === 'expense' ? 'var(--accent-color)' : 'transparent',
                                            color: type === 'expense' ? 'white' : 'var(--text-secondary)',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        Expense
                                    </div>
                                    <div
                                        onClick={() => setType('income')}
                                        style={{
                                            flex: 1,
                                            textAlign: 'center',
                                            padding: '10px',
                                            borderRadius: '10px',
                                            background: type === 'income' ? 'var(--secondary-color)' : 'transparent',
                                            color: type === 'income' ? 'white' : 'var(--text-secondary)',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        Income
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Description</label>
                                <input
                                    type="text"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="What is this for?"
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        background: 'var(--surface-color-light)',
                                        borderRadius: '12px',
                                        color: 'white',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Amount</label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        background: 'var(--surface-color-light)',
                                        borderRadius: '12px',
                                        color: 'white',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Category</label>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {categories.map(cat => (
                                        <div
                                            key={cat}
                                            onClick={() => setCategory(cat)}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                borderRadius: '20px',
                                                border: `1px solid ${category === cat ? 'var(--primary-color)' : 'var(--glass-border)'}`,
                                                background: category === cat ? 'rgba(109, 40, 217, 0.2)' : 'transparent',
                                                color: category === cat ? 'var(--primary-color)' : 'var(--text-secondary)',
                                                fontSize: '0.85rem',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {cat}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'var(--primary-gradient)',
                                    color: 'white',
                                    borderRadius: '16px',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    boxShadow: '0 10px 15px -3px rgba(124, 58, 237, 0.4)'
                                }}
                            >
                                Add Transaction
                            </button>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AddTransactionModal;
