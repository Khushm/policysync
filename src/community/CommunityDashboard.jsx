import React, { useEffect, useState } from 'react';

const CommunityDashboard = () => {
    const [policies, setPolicies] = useState([]);
    const [ngos, setNgos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/community/policies')
            .then(res => res.json())
            .then(data => setPolicies(data))
            .catch(err => console.error("Error fetching policies:", err));

        fetch('http://localhost:3001/api/community/ngo-services')
            .then(res => res.json())
            .then(data => setNgos(data))
            .catch(err => console.error("Error fetching NGOs:", err));
    }, []);

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>Community Dashboard</h1>
            <p>Access public policies and NGO services.</p>

            <div style={{ marginTop: '2rem' }}>
                <h2>Available Relief Policies</h2>
                <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                    {policies.map(p => (
                        <div key={p.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
                            <h3>{p.program}</h3>
                            <p>{p.summary}</p>
                            <span style={{ background: '#eee', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{p.type}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ marginTop: '3rem' }}>
                <h2>Local NGO Services</h2>
                <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                    {ngos.map((n, i) => (
                        <div key={i} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
                            <h3>{n.name}</h3>
                            <p>{n.description}</p>
                            <p><strong>Contact:</strong> <a href={n.website} target="_blank" rel="noreferrer">Website</a></p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CommunityDashboard;
