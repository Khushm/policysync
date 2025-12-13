import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, HeartHandshake, ArrowRight } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    const groups = [
        {
            id: 'policy',
            title: 'Policymakers',
            icon: <Shield size={48} className="text-secondary" />, // text-secondary maps to blue-ish in our CSS usually? Wait, let's check CSS. text-primary is white. text-secondary is gray. Hmm. Let's use inline style or class for color.
            description: 'Analyze vulnerability, track resources, and optimize policy impact.',
            path: '/policymaker',
            color: '#38bdf8' // Sky blue
        },
        {
            id: 'community',
            title: 'Community',
            icon: <Users size={48} />,
            description: 'Access resources, report issues, and connect with local support.',
            path: '/community',
            color: '#22c55e' // Green
        },
        {
            id: 'ngo',
            title: 'NGOs',
            icon: <HeartHandshake size={48} />,
            description: 'Coordinate relief, track gaps, and mobilize volunteers efficiently.',
            path: '/ngos',
            color: '#fbbf24' // Amber
        }
    ];

    const handleNavigation = (group) => {
        navigate(group.path);
    };

    return (
        <div className="flex-center" style={{ minHeight: '100vh', flexDirection: 'column', gap: '4rem', padding: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Resilience Connect
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                    Bridging the gap between data, policy, and people.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', width: '100%', maxWidth: '1200px' }}>
                {groups.map((group) => (
                    <div
                        key={group.id}
                        className="glass-panel"
                        style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                        onClick={() => handleNavigation(group)}
                    >
                        <div style={{ color: group.color }}>{group.icon}</div>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{group.title}</h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{group.description}</p>
                        </div>
                        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', color: group.color, fontWeight: '600' }}>
                            Enter Portal <ArrowRight size={16} />
                        </div>

                        {/* Hover Glow Effect Mock */}
                        <div style={{
                            position: 'absolute', top: 0, right: 0, width: '100px', height: '100px',
                            background: group.color, filter: 'blur(80px)', opacity: 0.1
                        }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LandingPage;
