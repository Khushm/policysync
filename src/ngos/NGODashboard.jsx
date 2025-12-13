import React, { useEffect, useState } from 'react';

const NGODashboard = () => {
    const [services, setServices] = useState([]);
    const [newService, setNewService] = useState({ name: '', description: '', website: '' });

    const fetchServices = () => {
        fetch('http://localhost:3001/api/ngos/services')
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/api/ngos/services', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newService)
        })
            .then(res => res.json())
            .then(saved => {
                setServices([...services, saved]);
                setNewService({ name: '', description: '', website: '' });
            });
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>NGO Partner Dashboard</h1>
            <p>Manage your service listings.</p>

            <div style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
                <h3>Add New Service</h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
                    <input
                        placeholder="Organization Name"
                        value={newService.name}
                        onChange={e => setNewService({ ...newService, name: e.target.value })}
                        style={{ padding: '0.5rem' }}
                        required
                    />
                    <textarea
                        placeholder="Service Description"
                        value={newService.description}
                        onChange={e => setNewService({ ...newService, description: e.target.value })}
                        style={{ padding: '0.5rem' }}
                        required
                    />
                    <input
                        placeholder="Website URL"
                        value={newService.website}
                        onChange={e => setNewService({ ...newService, website: e.target.value })}
                        style={{ padding: '0.5rem' }}
                    />
                    <button type="submit" style={{ padding: '0.5rem', background: '#BA0C2F', color: 'white', border: 'none', cursor: 'pointer' }}>
                        Register Service
                    </button>
                </form>
            </div>

            <h2>Your Listed Services</h2>
            <ul>
                {services.map((s, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem' }}>
                        <strong>{s.name}</strong> - {s.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NGODashboard;
