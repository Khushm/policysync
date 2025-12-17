import React from 'react';

const ResourceList = ({ resources, policies }) => {
    return (
        <aside className="sidebar-right">
            <div className="panel-section">
                <div className="panel-head">
                    <h3>Resources</h3>
                </div>
                <div className="scrolly-list">
                    {resources.map((item) => (
                        <div key={item.id} className="resource-card">
                            <span className={`tag ${item.type}`}>{item.type}</span>
                            <div style={{
                                float: 'right',
                                fontSize: '0.7rem',
                                color: item.status === 'available' ? '#166534' : '#9a3412',
                                background: item.status === 'available' ? '#dcfce7' : '#ffedd5',
                                padding: '2px 6px',
                                borderRadius: '99px'
                            }}>
                                {item.status === 'available' ? 'Space Available' : 'Full'}
                            </div>
                            <h4>{item.name}</h4>
                            <p>{item.desc}</p>
                            <div className="meta-row">
                                <span className="meta-item">📍 {item.address}</span>
                            </div>
                            <div className="meta-row">
                                <span className="meta-item">📞 {item.phone}</span>
                                <span className="meta-item">🕒 {item.hours}</span>
                            </div>
                            <div className="meta-row" style={{ marginTop: '0.5rem', justifyContent: 'space-between' }}>
                                <span>{item.pets ? '🐕 Pets Allowed' : '🚫 No Pets'}</span>
                                <span className="bookmark-icon">🔖</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="panel-section">
                <div className="panel-head">
                    <h3>Relevant Policies</h3>
                </div>
                <div className="scrolly-list">
                    {policies.map((item, idx) => (
                        <div key={idx} className="resource-card policy">
                            <span className={`tag ${item.type.toLowerCase()}`}>{item.type}</span>
                            <h4>{item.title}</h4>
                            <p>{item.desc}</p>
                            <div className="meta-row">
                                <span>{item.icon} {item.type} Support</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default ResourceList;
