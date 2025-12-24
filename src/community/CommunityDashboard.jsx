import React, { useState, useMemo } from 'react';
import './DashboardLayout.css';
import CommunityMap from './CommunityMap';
import Chatbot from './Chatbot';
import { RESOURCES, POLICIES } from './data';
import { Bookmark, MapPin, Clock, Phone, Dog, Menu, Users, Download, Sparkles } from 'lucide-react';

const CommunityDashboard = () => {
    const [filters, setFilters] = useState({
        zip: '',
        income: '',
        household: '1',
        disability: false,
        transport: false
    });

    const [resourceFilter, setResourceFilter] = useState('all');
    const [policyFilter, setPolicyFilter] = useState('all');
    const [savedResources, setSavedResources] = useState(new Set());
    const [showResourceMenu, setShowResourceMenu] = useState(false);
    const [showPolicyMenu, setShowPolicyMenu] = useState(false);

    const handleFilterChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFilters(prev => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    const clearFilters = () => {
        setFilters({
            zip: '',
            income: '',
            household: '1',
            disability: false,
            transport: false
        });
        setResourceFilter('all');
        setPolicyFilter('all');
    };

    const toggleSave = (id) => {
        setSavedResources(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    // Filter Logic
    const filteredResources = useMemo(() => {
        return RESOURCES.filter(r => {
            if (filters.zip && r.zip !== filters.zip) return false;
            // Income/Household logic could filter based on eligibility, for now just zip
            if (resourceFilter !== 'all' && r.type !== resourceFilter) return false;
            return true;
        });
    }, [filters.zip, resourceFilter]);

    const filteredPolicies = useMemo(() => {
        return POLICIES.filter(p => {
            if (policyFilter !== 'all' && p.category !== policyFilter) return false;
            return true;
        });
    }, [policyFilter]);

    // AI Recommendations Logic
    const aiRecommendations = useMemo(() => {
        const recs = [];
        if (filters.income === 'low') {
            recs.push({ text: "SNAP Benefits: Based on your income, you likely qualify for expedited food assistance.", bold: "SNAP Benefits:" });
            recs.push({ text: "Emergency Cash Assistance: You may be eligible for one-time disaster relief grants.", bold: "Emergency Cash Assistance:" });
        }
        if (filters.disability) {
            recs.push({ text: "Accessible Shelters: We have filtered for shelters with ADA compliance and medical support.", bold: "Accessible Shelters:" });
        }
        if (filters.transport) {
            recs.push({ text: "Free Transit: COTA is offering free rides to shelters for affected residents.", bold: "Free Transit:" });
        }
        if (filters.household === '10+' || parseInt(filters.household) > 3) {
            recs.push({ text: "Family Housing: Prioritized placement for larger families at the Downtown Center.", bold: "Family Housing:" });
        }
        return recs;
    }, [filters]);

    const generatePDF = () => {
        alert("Downloading PDF Summary... (Mock Functionality)");
        // In a real app, use jsPDF or logic from script.js
    };

    return (
        <div className="community-dashboard">
            {/* Filter Bar */}
            <div className="filter-bar hero-compact dark-hero">
                <div className="hero-text">
                    <h1>Disaster Response & Recovery</h1>
                    <p>Find shelter, food, and policy guidance.</p>
                </div>

                <div className="sdoh-form">
                    <div className="form-group">
                        <label><MapPin size={12} /> Zip Code</label>
                        <input
                            type="text"
                            id="zip"
                            placeholder="e.g. 43215"
                            value={filters.zip}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="form-group">
                        <label><Users size={12} /> Annual Income</label>
                        <select id="income" value={filters.income} onChange={handleFilterChange}>
                            <option value="">Select Range</option>
                            <option value="low">&lt; $30,000</option>
                            <option value="med">$30k - $60k</option>
                            <option value="high">&gt; $60,000</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label><Users size={12} /> Household Size</label>
                        <select id="household" value={filters.household} onChange={handleFilterChange}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '10+'].map(n => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </div>
                    <div className="checkbox-group-vertical" style={{ color: 'white' }}>
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                id="disability"
                                checked={filters.disability}
                                onChange={handleFilterChange}
                            />
                            Disability Accommodations
                        </label>
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                id="transport"
                                checked={filters.transport}
                                onChange={handleFilterChange}
                            />
                            Need Transportation
                        </label>
                    </div>
                    <div className="actions">
                        <button className="clear-btn" onClick={clearFilters}>Clear</button>
                        <button className="find-btn">Find Resources</button>
                    </div>
                </div>
            </div>

            <main className="dashboard-grid">
                {/* Col 1: AI Chat */}
                <aside className="sidebar sidebar-left ai-chat-column">
                    <div className="card ai-panel">
                        <div className="panel-header">
                            <Sparkles size={18} />
                            <h3>AI Recommendations</h3>
                        </div>
                        <div className="panel-content">
                            {aiRecommendations.length === 0 ? (
                                <p className="small-text">Enter your information above to get personalized recommendations.</p>
                            ) : (
                                aiRecommendations.map((rec, i) => (
                                    <p key={i} className="small-text" style={{ marginBottom: '0.5rem' }}>
                                        <b>{rec.bold}</b> {rec.text.replace(rec.bold, '')}
                                    </p>
                                ))
                            )}
                            <button className="download-btn" onClick={generatePDF}>
                                <Download size={16} /> Download Summary PDF
                            </button>
                        </div>
                    </div>

                    <Chatbot />
                </aside>

                {/* Col 2: Map */}
                <section className="map-section">
                    <CommunityMap resources={filteredResources} />
                    <div className="map-legend">
                        <div className="legend-item"><span className="dot green"></span> Shelter (Open)</div>
                        <div className="legend-item"><span className="dot orange"></span> Shelter (Full)</div>
                        <div className="legend-item"><span className="dot blue"></span> Food Pantry</div>
                    </div>
                </section>

                {/* Col 3: Resources */}
                <aside className="sidebar resources-column">
                    <div className="panel-header">
                        <div className="header-title">
                            <h3>Resources ({filteredResources.length})</h3>
                        </div>
                        <div className="sort-menu-container">
                            <button className="icon-btn" onClick={() => setShowResourceMenu(!showResourceMenu)}>
                                <Menu size={18} />
                            </button>
                            {showResourceMenu && (
                                <div className="dropdown-menu show" style={{ right: 0, left: 'auto' }}>
                                    <button onClick={() => { setResourceFilter('all'); setShowResourceMenu(false); }}>Show All</button>
                                    <button onClick={() => { setResourceFilter('shelter'); setShowResourceMenu(false); }}>Shelters Only</button>
                                    <button onClick={() => { setResourceFilter('pantry'); setShowResourceMenu(false); }}>Food Pantries Only</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="scrolly-list">
                        {filteredResources.map(r => (
                            <div key={r.id} className="resource-card">
                                <div className="card-header">
                                    <span className={`resource-tag ${r.type === 'shelter' ? 'tag-shelter' : 'tag-pantry'}`}>
                                        {r.type === 'shelter' ? 'Shelter' : 'Food Pantry'}
                                    </span>
                                    <button className={`save-btn ${savedResources.has(r.id) ? 'saved' : ''}`} onClick={() => toggleSave(r.id)}>
                                        <Bookmark size={16} fill={savedResources.has(r.id) ? 'currentColor' : 'none'} />
                                    </button>
                                </div>
                                <h4>{r.title}</h4>
                                <p>{r.description}</p>
                                <div className="resource-details">
                                    <div className="detail-row"><MapPin size={14} /> {r.address}</div>
                                    <div className="detail-row"><Clock size={14} /> {r.hours}</div>
                                    <div className="detail-row"><Phone size={14} /> {r.contact}</div>
                                    {r.type === 'shelter' && (
                                        <>
                                            <div className="detail-row">
                                                <Users size={14} /> Capacity: {r.capacity}
                                                <span style={{ color: r.isAtCapacity ? 'orange' : 'green', marginLeft: '4px' }}>
                                                    ({r.isAtCapacity ? 'Full' : 'Space Available'})
                                                </span>
                                            </div>
                                            <div className="detail-row">
                                                <Dog size={14} /> Pets: {r.pets ? 'Allowed' : 'Not Allowed'}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Col 4: Policies */}
                <aside className="sidebar policies-column">
                    <div className="panel-header" style={{ justifyContent: 'space-between' }}>
                        <div className="header-title">
                            <h3>Policies</h3>
                        </div>
                        <div className="sort-menu-container">
                            <button className="icon-btn" onClick={() => setShowPolicyMenu(!showPolicyMenu)}>
                                <Menu size={18} />
                            </button>
                            {showPolicyMenu && (
                                <div className="dropdown-menu show" style={{ right: 0, left: 'auto' }}>
                                    <button onClick={() => { setPolicyFilter('all'); setShowPolicyMenu(false); }}>All Policies</button>
                                    <button onClick={() => { setPolicyFilter('housing'); setShowPolicyMenu(false); }}>Housing</button>
                                    <button onClick={() => { setPolicyFilter('financial'); setShowPolicyMenu(false); }}>Financial</button>
                                    <button onClick={() => { setPolicyFilter('legal'); setShowPolicyMenu(false); }}>Legal</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="scrolly-list">
                        {filteredPolicies.map((p, i) => (
                            <div key={i} className="resource-card">
                                <div className="card-header">
                                    <span className={`resource-tag tag-${p.category === 'housing' ? 'policy' : p.category === 'financial' ? 'shelter' : 'pantry'}`}>
                                        {p.type}
                                    </span>
                                </div>
                                <h4>{p.title}</h4>
                                <p>{p.desc}</p>
                                <div className="resource-details">
                                    <div className="detail-row">
                                        <span>{p.category.charAt(0).toUpperCase() + p.category.slice(1)} Support</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default CommunityDashboard;
