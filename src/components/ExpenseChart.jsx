import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                background: 'var(--surface-color)',
                border: '1px solid var(--glass-border)',
                padding: '0.8rem',
                borderRadius: '12px',
                boxShadow: 'var(--shadow-lg)'
            }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{label}</p>
                <p style={{ color: 'var(--primary-color)', fontWeight: 600 }}>₹{payload[0].value}</p>
            </div>
        );
    }
    return null;
};

const ExpenseChart = ({ data }) => {
    return (
        <motion.div
            className="glass-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ height: '300px', marginBottom: '2rem', padding: '1.5rem 0' }}
        >
            <h3 style={{ paddingLeft: '1.5rem', marginBottom: '1rem', fontSize: '1.2rem' }}>Activity</h3>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--primary-color)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="var(--primary-color)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--surface-color-light)" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                        dy={10}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--surface-color-light)', strokeWidth: 2 }} />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="var(--primary-color)"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </motion.div>
    );
};

export default ExpenseChart;
