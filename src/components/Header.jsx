import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldAlert, Globe } from 'lucide-react';
import '../community/CommunityDashboard.css'; // Ensure styles are applied

const Header = () => {
    const [lang, setLang] = useState('en');

    const toggleLanguage = () => {
        setLang(prev => prev === 'en' ? 'es' : 'en');
    };

    return (
        <header className="app-header">
            <div className="logo">
                <ShieldAlert size={24} />
                <span>FranklinResponse</span>
            </div>
            <nav class="main-nav">
                <NavLink to="/community" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Community Members
                </NavLink>
                <NavLink to="/policymaker" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Policymakers
                </NavLink>
                <NavLink to="/ngos" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    NGOs
                </NavLink>
            </nav>
            <div className="header-actions">
                <button className="lang-toggle" onClick={toggleLanguage}>
                    <Globe size={18} />
                    <span id="lang-text">{lang === 'en' ? 'Español' : 'English'}</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
