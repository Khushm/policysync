import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';

const AnalyticsCharts = () => {
    const policyData = [
        { name: 'Food', used: 400, gap: 240 },
        { name: 'Housing', used: 300, gap: 400 }, // High gap
        { name: 'Health', used: 200, gap: 100 },
        { name: 'Transport', used: 278, gap: 150 },
        { name: 'Edu', used: 189, gap: 80 },
    ];

    const trendData = [
        { month: 'Jan', risk: 65 },
        { month: 'Feb', risk: 59 },
        { month: 'Mar', risk: 80 }, // Spike
        { month: 'Apr', risk: 81 },
        { month: 'May', risk: 56 },
        { month: 'Jun', risk: 55 },
    ];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>

            {/* Resource Gap Chart */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <h3>Resource Gaps by Category</h3>
                <div style={{ height: '300px', marginTop: '1rem' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={policyData}>
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                itemStyle={{ color: '#f8fafc' }}
                            />
                            <Bar dataKey="used" name="Resources Used" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="gap" name="Unmet Needs" fill="#ef4444" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Risk Trend Chart */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <h3>Risk Score Trend (6 Months)</h3>
                <div style={{ height: '300px', marginTop: '1rem' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="month" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                            />
                            <Line type="monotone" dataKey="risk" stroke="#22c55e" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
};

export default AnalyticsCharts;
