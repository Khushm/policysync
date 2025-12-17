import React, { useState, useEffect } from 'react';
import './CommunityDashboard.css';
import CommunityMap from './CommunityMap';
import Chatbot from './Chatbot';
import ResourceList from './ResourceList';

const CommunityDashboard = () => {
    const [resources, setResources] = useState([]);
    const [policies, setPolicies] = useState([]);
    const [filters, setFilters] = useState({
        zip: '',
        income: '',
        household: '1',
        disability: false,
        transport: false
    });

    // Mock Data Loading (simulating API)
    useEffect(() => {
        // Mock Resources
        const mockResources = Array.from({ length: 10 }).map((_, i) => ({
            id: i,
            name: i % 2 === 0 ? `Community Shelter ${i + 1}` : `Food Pantry ${i + 1}`,
            type: i % 2 === 0 ? 'shelter' : 'food',
            status: Math.random() > 0.3 ? 'available' : 'full',
            lat: 39.95 + (Math.random() - 0.5) * 0.1,
            lng: -82.99 + (Math.random() - 0.5) * 0.1,
            address: `Zip 432${Math.floor(Math.random() * 10) + 10}`,
            phone: "555-0123",
            capacity: "Unknown",
            pets: Math.random() > 0.7,
            hours: "9am - 5pm",
            desc: "Providing essential services to the community.",
            website: "#"
        }));
        setResources(mockResources);

        // Mock Policies
        const mockPolicies = [
            { type: 'Housing', title: 'Home Loss Guide', desc: 'Steps to take after losing your home.', icon: '🏠' },
            { type: 'Financial', title: 'Emergency Grants', desc: 'Immediate financial assistance for disaster victims.', icon: '💰' }
        ];
        setPolicies(mockPolicies);
    }, []);

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
    };

    // Filter Logic
    const filteredResources = resources.filter(r => {
        if (filters.zip && !r.address.includes(filters.zip)) return false;
        // Add more filter logic here as needed
        return true;
    });

    return (
        <div className="community-dashboard">
            <div className="filter-bar">
                <div className="filter-group">
                    <label>Zip Code</label>
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
                        <option value="low">&lt; $20,000</option>
                        <option value="med-low">$20k - $40k</option>
                        <option value="med">$40k - $60k</option>
                        <option value="high">$60k+</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Household Size</label>
                    <select id="household" value={filters.household} onChange={handleFilterChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4+</option>
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
                        Disability Accommodations Required
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
                    <button className="find-btn">Find Resources</button>
                </div>
            </div>

            <main className="dashboard-grid">
                <aside className="sidebar-left">
                    <div className="card ai-recommendations">
                        <div className="card-header">
                            <h2>AI Recommendations</h2>
                        </div>
                        <div className="card-body">
                            <p>Enter your information above to get personalized recommendations.</p>
                            <button className="download-btn">Download Summary PDF</button>
                            <p className="small-text">Get a personalized summary of recommended resources and policies.</p>
                        </div>
                    </div>

                    <Chatbot />

                    <div className="legend-card">
                        <div className="legend-item"><span className="dot green"></span> Shelter (Open)</div>
                        <div className="legend-item"><span className="dot orange"></span> Shelter (Full)</div>
                        <div className="legend-item"><span className="dot blue"></span> Food Pantry</div>
                    </div>
                </aside>

                <section className="map-section">
                    <CommunityMap resources={filteredResources} />
                </section>

                <ResourceList resources={filteredResources} policies={policies} />
            </main>
        </div>
    );
};

export default CommunityDashboard;
