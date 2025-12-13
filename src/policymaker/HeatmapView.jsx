import React from 'react';
import { motion } from 'framer-motion';

const HeatmapView = () => {
    // Mock Grid Data simulating Zip codes
    const dim = 10;
    const cells = Array.from({ length: dim * dim }, (_, i) => {
        // Generate pseudorandom risk score
        const risk = Math.floor(Math.random() * 100);
        return { id: i, risk };
    });

    const getColor = (risk) => {
        if (risk > 80) return '#ef4444'; // Red - High
        if (risk > 50) return '#fbbf24'; // Orange - Medium
        return '#22c55e'; // Green - Low
    };

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3>Community Risk Heatmap</h3>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><span style={{ width: 8, height: 8, background: '#ef4444', borderRadius: '50%' }} /> High Vulnerability</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><span style={{ width: 8, height: 8, background: '#22c55e', borderRadius: '50%' }} /> Low Vulnerability</span>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${dim}, 1fr)`,
                gap: '4px',
                height: '400px', // Fixed height for visualization
                borderRadius: '8px',
                overflow: 'hidden'
            }}>
                {cells.map((cell) => (
                    <motion.div
                        key={cell.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: cell.id * 0.005 }}
                        whileHover={{ scale: 1.2, zIndex: 10, boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}
                        style={{
                            backgroundColor: getColor(cell.risk),
                            opacity: 0.7 + (cell.risk / 300), // Slightly vary opacity
                            borderRadius: '2px',
                            cursor: 'crosshair'
                        }}
                        title={`Region ${cell.id} - Risk: ${cell.risk}`}
                    />
                ))}
            </div>
            <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                * Visualizing aggregated SDOH risk scores across {dim * dim} micro-regions (Simulated Zip Codes).
            </p>
        </div>
    );
};

export default HeatmapView;
