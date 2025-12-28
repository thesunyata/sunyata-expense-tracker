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
                <p style={{ color: payload[0].value >= 0 ? 'var(--secondary-color)' : 'var(--accent-color)', fontWeight: 600 }}>
                    {payload[0].value >= 0 ? '+' : ''}₹{Math.abs(payload[0].value).toFixed(2)}
                </p>
            </div>
        );
    }
    return null;
};

const ExpenseChart = ({ data }) => {

    const gradientOffset = () => {
        const dataMax = Math.max(...data.map((i) => i.value));
        const dataMin = Math.min(...data.map((i) => i.value));

        if (dataMax <= 0) {
            return 0;
        }
        if (dataMin >= 0) {
            return 1;
        }

        return dataMax / (dataMax - dataMin);
    };

    const off = gradientOffset();

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
                <AreaChart data={data} margin={{ left: -20, right: 10 }}>
                    <defs>
                        <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset={off} stopColor="var(--secondary-color)" stopOpacity={1} />
                            <stop offset={off} stopColor="var(--accent-color)" stopOpacity={1} />
                        </linearGradient>
                        <linearGradient id="splitColorFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset={0} stopColor="var(--secondary-color)" stopOpacity={0.3} />
                            <stop offset={off} stopColor="var(--secondary-color)" stopOpacity={0} />
                            <stop offset={off} stopColor="var(--accent-color)" stopOpacity={0} />
                            <stop offset={1} stopColor="var(--accent-color)" stopOpacity={0.3} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--surface-color-light)" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'var(--text-secondary)', fontSize: 10 }}
                        dy={10}
                        tickFormatter={(str) => {
                            if (!str) return '';
                            const d = new Date(str);
                            if (isNaN(d)) return str;
                            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                            return `${days[d.getDay()]} ${d.getDate()}`;
                        }}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--surface-color-light)', strokeWidth: 2 }} />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="url(#splitColor)"
                        strokeWidth={3}
                        fill="url(#splitColorFill)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </motion.div>
    );
};

export default ExpenseChart;
