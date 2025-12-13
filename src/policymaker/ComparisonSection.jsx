import React from 'react';
import { ArrowRightLeft } from 'lucide-react';

const ComparisonSection = () => {
    return (
        <div className="glass-panel" style={{ padding: '1.5rem', background: 'white', color: '#0f172a' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <ArrowRightLeft className="text-secondary" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Compare Communities</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Community A */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input type="text" defaultValue="10001" style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', width: '100%' }} />

                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ color: '#64748b' }}>Risk Score</span>
                            <span style={{ fontWeight: 700, color: '#ef4444' }}>85 / 100</span>
                        </div>
                        <div style={{ background: '#e2e8f0', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ width: '85%', height: '100%', background: '#ef4444' }}></div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', marginBottom: '0.5rem' }}>
                            <span style={{ color: '#64748b' }}>Resource Gap</span>
                            <span style={{ fontWeight: 700, color: '#f97316' }}>Critical</span>
                        </div>
                        <div style={{ background: '#e2e8f0', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ width: '80%', height: '100%', background: '#f97316' }}></div>
                        </div>
                    </div>
                </div>

                {/* Community B */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input type="text" defaultValue="10002" style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', width: '100%' }} />

                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ color: '#64748b' }}>Risk Score</span>
                            <span style={{ fontWeight: 700, color: '#22c55e' }}>42 / 100</span>
                        </div>
                        <div style={{ background: '#e2e8f0', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ width: '42%', height: '100%', background: '#22c55e' }}></div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', marginBottom: '0.5rem' }}>
                            <span style={{ color: '#64748b' }}>Resource Gap</span>
                            <span style={{ fontWeight: 700, color: '#22c55e' }}>Low</span>
                        </div>
                        <div style={{ background: '#e2e8f0', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ width: '30%', height: '100%', background: '#22c55e' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComparisonSection;
