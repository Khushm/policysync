import React from 'react';
import { Filter, Sliders } from 'lucide-react';

const FilterPanel = () => {
    return (
        <div className="glass-panel" style={{ padding: '1.5rem', background: 'white', color: '#0f172a' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <Sliders size={20} className="text-secondary" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Filters</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Income Range */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem', color: '#64748b' }}>Income Level</label>
                    <select style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                        <option>All Levels</option>
                        <option>&lt; $30,000</option>
                        <option>$30,000 - $60,000</option>
                        <option>&gt; $60,000</option>
                    </select>
                </div>

                {/* Age Demographics */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem', color: '#64748b' }}>Age Demographics</label>
                    <select style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                        <option>All Ages</option>
                        <option>0-18</option>
                        <option>19-64</option>
                        <option>65+</option>
                    </select>
                </div>

                {/* Disability Index */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <label style={{ fontWeight: 500, fontSize: '0.9rem', color: '#64748b' }}>Disability Index Threshold</label>
                    </div>
                    <input type="range" min="0" max="100" defaultValue="50" style={{ width: '100%', accentColor: '#cbd5e1' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
