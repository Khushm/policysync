import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Medical', Unmet: 65, Available: 40 },
    { name: 'Food', Unmet: 59, Available: 70 },
    { name: 'Housing', Unmet: 80, Available: 40 },
    { name: 'Transport', Unmet: 81, Available: 60 },
    { name: 'Education', Unmet: 56, Available: 85 },
];

const ResourceGapChart = () => {
    return (
        <div className="glass-panel" style={{ padding: '1.5rem', background: 'white', color: '#0f172a' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Resource Gaps</h3>
            <div style={{ height: '300px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        barGap={0}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend />
                        <Bar dataKey="Unmet" name="Unmet Needs" fill="#f87171" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Available" name="Resources Available" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ResourceGapChart;
