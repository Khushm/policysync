import React, { useState, useMemo } from 'react';
import './DashboardLayout.css';
import CommunityMap from './CommunityMap';
import Chatbot from './Chatbot';
import { RESOURCES, POLICIES } from './data';
import { Bookmark, MapPin, Clock, Phone, Dog, Menu, Users, Download, Sparkles, ExternalLink } from 'lucide-react';

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
    const [highlightedItems, setHighlightedItems] = useState({ resources: new Set(), policies: new Set() });

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
        setHighlightedItems({ resources: new Set(), policies: new Set() });
        setLastSearch(null);
    };

    const toggleSave = (id) => {
        setSavedResources(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    // Filter Logic - ONLY filters by Type/Category now, NOT by the top search bar ZIP
    const filteredResources = useMemo(() => {
        return RESOURCES.filter(r => {
            if (resourceFilter !== 'all' && r.type !== resourceFilter) return false;
            return true;
        });
    }, [resourceFilter]);

    const filteredPolicies = useMemo(() => {
        return POLICIES.filter(p => {
            if (policyFilter !== 'all' && p.category !== policyFilter) return false;
            return true;
        });
    }, [policyFilter]);

    // AI Recommendations Logic
    const aiRecommendations = useMemo(() => {
        const recs = [];
        if (filters.income === 'low' || filters.income === 'none') {
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

    // This state will be checked by the Chatbot to provide an automated response
    const [lastSearch, setLastSearch] = useState(null);

    const handleFindResources = () => {
        const newHighlights = { resources: new Set(), policies: new Set() };

        // 1. Logic for Highlighting Resources based on Need/Income
        if (filters.income === 'low' || filters.income === 'none') {
            RESOURCES.forEach(r => { if (r.type === 'pantry') newHighlights.resources.add(r.id); });
            POLICIES.forEach(p => { if (p.category === 'financial') newHighlights.policies.add(p.title); });
        }

        if (filters.disability) {
            // Highlight shelters with known high ADA compliance (Faith Mission, Van Buren)
            newHighlights.resources.add(1);
            newHighlights.resources.add(2);
            // Highlight policies related to disability/repair
            POLICIES.forEach(p => { if (p.category === 'housing') newHighlights.policies.add(p.title); });
        }

        if (filters.transport) {
            POLICIES.forEach(p => { if (p.type.includes('Financial')) newHighlights.policies.add(p.title); });
        }

        if (filters.zip) {
            RESOURCES.forEach(r => { if (r.zip === filters.zip) newHighlights.resources.add(r.id); });
        }

        setHighlightedItems(newHighlights);
        setLastSearch({ ...filters, timestamp: Date.now() });
    };

    const generatePDF = () => {
        const reportWindow = window.open('', '_blank');
        const now = new Date().toLocaleString();

        let resourcesHtml = "";
        RESOURCES.filter(r => highlightedItems.resources.has(r.id)).forEach(r => {
            resourcesHtml += `<li><strong>${r.title}</strong>: ${r.address} | ${r.contact}</li>`;
        });

        let policiesHtml = "";
        POLICIES.filter(p => highlightedItems.policies.has(p.title)).forEach(p => {
            policiesHtml += `<li><strong>${p.title}</strong>: ${p.desc}</li>`;
        });

        reportWindow.document.write(`
            <html>
            <head>
                <title>Franklin County Recovery Summary</title>
                <style>
                    body { font-family: 'Inter', sans-serif; padding: 40px; color: #333; }
                    .header { border-bottom: 2px solid #BA0C2F; padding-bottom: 20px; margin-bottom: 30px; }
                    h1 { color: #BA0C2F; margin: 0; }
                    .info-box { background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
                    .section { margin-bottom: 30px; }
                    h2 { border-left: 4px solid #BA0C2F; padding-left: 10px; font-size: 1.2rem; }
                    ul { list-style: none; padding: 0; }
                    li { margin-bottom: 10px; padding: 10px; border-bottom: 1px solid #eee; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Crisis Resource Summary</h1>
                    <p>Generated for Franklin County Response Plan | ${now}</p>
                </div>
                
                <div class="info-box">
                    <strong>User Profile:</strong><br/>
                    ZIP Code: ${filters.zip || 'Not Provided'} | 
                    Income: ${filters.income || 'Not Provided'} | 
                    Household Size: ${filters.household} | 
                    Disability Needs: ${filters.disability ? 'Yes' : 'No'} | 
                    Transport Needs: ${filters.transport ? 'Yes' : 'No'}
                </div>

                <div class="section">
                    <h2>Recommended Resources</h2>
                    <ul>${resourcesHtml || '<li>Use the dashbord filters to generate specific recommendations.</li>'}</ul>
                </div>

                <div class="section">
                    <h2>Suggested Policies</h2>
                    <ul>${policiesHtml || '<li>No specific policies highlighted based on current search.</li>'}</ul>
                </div>

                <p style="font-size: 0.8rem; color: #666; margin-top: 50px;">
                    This document is a summary of available resources. Always call 2-1-1 or the Homeless Hotline at 614-274-7000 for verified real-time availability.
                </p>
                <script>window.print();</script>
            </body>
            </html>
        `);
        reportWindow.document.close();
    };

    return (
        <div className="community-dashboard">
            {/* Filter Bar */}
            <div className="filter-bar">
                <div className="hero-text">
                    <h1>Disaster Response & Recovery</h1>
                    <p>Enter your information to receive AI-guided resource recommendations.</p>
                </div>

                <div className="sdoh-form">
                    <div className="filter-group">
                        <label><MapPin size={12} /> Zip Code</label>
                        <input
                            type="text"
                            id="zip"
                            placeholder="e.g. 43215"
                            value={filters.zip}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="filter-group">
                        <label>Annual Income</label>
                        <select id="income" value={filters.income} onChange={handleFilterChange}>
                            <option value="">Select Range</option>
                            <option value="none">No Income</option>
                            <option value="low">Under $25k</option>
                            <option value="med">$25k - $60k</option>
                            <option value="high">Over $60k</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Household Size</label>
                        <select id="household" value={filters.household} onChange={handleFilterChange}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, '10+'].map(n => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </div>
                    <div className="checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                id="disability"
                                checked={filters.disability}
                                onChange={handleFilterChange}
                            />
                            Disability Accommodations
                        </label>
                        <label>
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
                        <button className="find-btn" onClick={handleFindResources}>Find Resources</button>
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
                                <p className="small-text">Complete the form and click "Find Resources" for personaized AI guidance.</p>
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

                    <Chatbot externalSearch={lastSearch} />
                </aside>

                {/* Col 2: Map */}
                <section className="map-section">
                    <CommunityMap resources={filteredResources} />
                    <div className="map-legend">
                        <div className="legend-item"><span className="dot shelter"></span> Shelter</div>
                        <div className="legend-item"><span className="dot pantry"></span> Food Pantry</div>
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
                            <div
                                key={r.id}
                                className={`resource-card ${highlightedItems.resources.has(r.id) ? 'highlighted-ai' : ''}`}
                            >
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
                                                <Users size={14} /> Max Capacity: {r.maxCapacity}
                                                <span style={{ color: r.isAtCapacity ? 'orange' : 'green', marginLeft: '4px' }}>
                                                    ({r.isAtCapacity ? 'Full' : 'Space Available'})
                                                </span>
                                            </div>
                                            <div className="detail-row">
                                                <Dog size={14} /> Pets: {r.pets ? 'Allowed' : 'Not Allowed'}
                                            </div>
                                        </>
                                    )}
                                    {r.website && (
                                        <div className="detail-row" style={{ marginTop: '0.5rem' }}>
                                            <a href={r.website} target="_blank" rel="noopener noreferrer" className="official-link">
                                                <ExternalLink size={14} /> Official Website
                                            </a>
                                        </div>
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
                            <div
                                key={i}
                                className={`resource-card ${highlightedItems.policies.has(p.title) ? 'highlighted-ai' : ''}`}
                            >
                                <div className="card-header">
                                    <span className={`resource-tag tag-${p.category === 'housing' ? 'policy' : p.category === 'financial' ? 'shelter' : 'pantry'}`}>
                                        {p.type}
                                    </span>
                                </div>
                                <h4>{p.title}</h4>
                                <p>{p.desc}</p>
                                <div className="resource-details">
                                    <div className="detail-row">
                                        <span>{p.type}</span>
                                    </div>
                                    {p.url && (
                                        <div className="detail-row" style={{ marginTop: '0.5rem' }}>
                                            <a href={p.url} target="_blank" rel="noopener noreferrer" className="official-link">
                                                <ExternalLink size={14} /> View Policy
                                            </a>
                                        </div>
                                    )}
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
