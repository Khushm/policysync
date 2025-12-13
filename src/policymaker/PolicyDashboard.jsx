import React from 'react';
import { Shield, Download } from 'lucide-react';
import FilterPanel from './FilterPanel';
import HeatmapView from './HeatmapView';
import FileUpload from './FileUpload';
import ComparisonSection from './ComparisonSection';
import ResourceGapChart from './ResourceGapChart';

const PolicyDashboard = () => {
    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a', fontFamily: 'Inter, sans-serif' }}>

            {/* Top Navbar */}
            <header style={{
                background: '#BA0C2F',
                color: 'white',
                borderBottom: '1px solid #e2e8f0',
                padding: '1rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                zIndex: 10
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Shield className="text-white" size={28} color="white" />
                    <div>
                        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.2 }}>Policymaker Dashboard</h1>
                        <p style={{ fontSize: '0.875rem', color: '#e2e8f0' }}>Vulnerability & Resource Gap Analysis</p>
                    </div>
                </div>

                <button style={{
                    background: 'white',
                    color: '#BA0C2F',
                    border: 'none',
                    padding: '0.6rem 1.2rem',
                    borderRadius: '6px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer'
                }}>
                    <Download size={18} color="#BA0C2F" /> Export Report
                </button>
            </header>

            {/* Main Content */}
            <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Section 1: Upload */}
                    <FileUpload />

                    {/* Section 2: Filters */}
                    <FilterPanel />

                    {/* Section 3: Map */}
                    <div className="glass-panel" style={{ padding: '1.5rem', background: 'white', height: '600px', display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Geospatial Analysis</h3>
                        <div style={{ flex: 1, borderRadius: '8px', overflow: 'hidden' }}>
                            <HeatmapView />
                        </div>
                    </div>

                    {/* Section 4: Comparison */}
                    <ComparisonSection />

                    {/* Section 5: Resource Chart */}
                    <ResourceGapChart />

                </div>
            </main>
        </div>
    );
};

export default PolicyDashboard;
