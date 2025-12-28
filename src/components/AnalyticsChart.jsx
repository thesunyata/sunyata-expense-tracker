import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';

const COLORS = ['#f43f5e', '#ef4444', '#dc2626', '#fb923c', '#d97706', '#9f1239'];

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                background: 'var(--surface-color)',
                border: '1px solid var(--glass-border)',
                padding: '0.8rem',
                borderRadius: '12px',
                boxShadow: 'var(--shadow-lg)'
            }}>
                <p style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{payload[0].name}</p>
                <p style={{ color: 'var(--text-secondary)' }}>₹{payload[0].value.toFixed(2)}</p>
            </div>
        );
    }
    return null;
};

const RenderLegend = (props) => {
    const { payload } = props;
    return (
        <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
            {payload.map((entry, index) => (
                <li key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: entry.color }} />
                    {entry.value}
                </li>
            ))}
        </ul>
    );
};

const AnalyticsChart = ({ transactions }) => {
    const data = useMemo(() => {
        const expenses = transactions.filter(t => t.amount < 0);
        const categoryTotals = expenses.reduce((acc, curr) => {
            const cat = curr.category;
            const amt = Math.abs(curr.amount);
            acc[cat] = (acc[cat] || 0) + amt;
            return acc;
        }, {});

        return Object.keys(categoryTotals).map(cat => ({
            name: cat,
            value: categoryTotals[cat]
        }));
    }, [transactions]);

    if (transactions.length === 0) return null;

    return (
        <motion.div
            className="glass-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ height: 'auto', marginBottom: '2rem', padding: '1.5rem' }}
        >
            <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Expense Breakdown</h3>
            <div style={{ height: '300px', width: '100%' }}>
                {data.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend content={<RenderLegend />} />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                        No expenses yet.
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default AnalyticsChart;
