// State
let appState = {
    map: null,
    resources: [],
    markers: [],
    filters: {
        zip: '',
        income: '',
        household: '1',
        disability: false,
        transport: false
    }
};

// DOM Elements
const els = {
    resourceList: document.getElementById('resource-list'),
    policyList: document.getElementById('policy-list'),
    findBtn: document.getElementById('find-btn'),
    clearBtn: document.getElementById('clear-btn'),
    chatInput: document.getElementById('chat-input'),
    sendBtn: document.getElementById('send-btn'),
    chatWindow: document.getElementById('chat-window'),
    inputs: {
        zip: document.getElementById('zip-input'),
        income: document.getElementById('income-input'),
        household: document.getElementById('size-input'),
        disability: document.getElementById('disability-check'),
        transport: document.getElementById('transport-check')
    }
};

document.addEventListener('DOMContentLoaded', init);

async function init() {
    initMap();
    await loadData();
    setupEventListeners();
}

function initMap() {
    appState.map = L.map('map').setView([39.9612, -82.9988], 11);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO'
    }).addTo(appState.map);
}

async function loadData() {
    try {
        // Fetch from Central API
        const [resNgos, resPolicies] = await Promise.all([
            fetch('http://localhost:3001/api/ngos'),
            fetch('http://localhost:3001/api/policies')
        ]);

        const ngos = await resNgos.json();
        const policies = await resPolicies.json();

        // Transform API data to map format
        appState.resources = ngos.map((n, i) => ({
            id: i,
            name: n.name,
            type: n.categories.toLowerCase().includes('food') ? 'food' : 'shelter',
            status: 'available',
            lat: 39.95 + (Math.random() - 0.5) * 0.1,
            lng: -82.99 + (Math.random() - 0.5) * 0.1,
            address: n.zip ? `Zip ${n.zip}` : "Franklin County",
            phone: "Contact via Website",
            capacity: "Unknown",
            pets: false,
            hours: "See Website",
            desc: n.description,
            website: n.website
        }));

        renderResources(appState.resources);
        renderMapMarkers(appState.resources);

        // Render Policies
        const policyItems = policies.map(p => ({
            type: p.type || 'General',
            title: p.program,
            desc: p.summary,
            icon: '📋'
        }));
        renderPolicies(policyItems);

    } catch (err) {
        console.error("Failed to load resources from API:", err);
    }
}

function setupEventListeners() {
    els.findBtn.addEventListener('click', applyFilters);
    els.clearBtn.addEventListener('click', clearFilters);

    els.sendBtn.addEventListener('click', handleChat);
    els.chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChat();
    });
}

function applyFilters() {
    const zip = els.inputs.zip.value.trim();

    let filtered = appState.resources.filter(r => {
        if (zip && !r.address.includes(zip) && Math.random() > 0.5) return false;
        return true;
    });

    renderResources(filtered);
    renderMapMarkers(filtered);

    if (filtered.length > 0 && appState.map) {
        const group = L.featureGroup(appState.markers);
        appState.map.fitBounds(group.getBounds().pad(0.1));
    }
}

function clearFilters() {
    els.inputs.zip.value = '';
    els.inputs.income.value = '';
    els.inputs.household.value = '1';
    els.inputs.disability.checked = false;
    els.inputs.transport.checked = false;
    applyFilters();
}

function renderMapMarkers(items) {
    appState.markers.forEach(m => appState.map.removeLayer(m));
    appState.markers = [];

    items.forEach(item => {
        const color = item.status === 'full' ? '#f97316' :
            item.type === 'food' ? '#3b82f6' : '#22c55e';

        const markerHtml = `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.3);"></div>`;
        const icon = L.divIcon({
            className: 'custom-pin',
            html: markerHtml,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });

        const m = L.marker([item.lat, item.lng], { icon: icon })
            .bindPopup(`<b>${item.name}</b><br>${item.address}<br>${item.status === 'full' ? 'FULL' : 'Available'}`);

        m.addTo(appState.map);
        appState.markers.push(m);
    });
}

function renderResources(items) {
    els.resourceList.innerHTML = '';
    items.forEach(item => {
        const tagClass = item.type;
        const badgeColor = item.status === 'available' ? 'green' : 'orange';

        const card = document.createElement('div');
        card.className = 'resource-card';
        card.innerHTML = `
            <span class="tag ${tagClass}">${item.type}</span>
            <div style="float: right; font-size: 0.7rem; color: ${badgeColor === 'green' ? '#166534' : '#9a3412'}; background: ${badgeColor === 'green' ? '#dcfce7' : '#ffedd5'}; padding: 2px 6px; border-radius: 99px;">
                ${item.status === 'available' ? 'Space Available' : 'Full'}
            </div>
            <h4>${item.name}</h4>
            <p>${item.desc}</p>
            <div class="meta-row">
                <span class="meta-item">📍 ${item.address}</span>
            </div>
            <div class="meta-row">
                <span class="meta-item">📞 ${item.phone}</span>
                <span class="meta-item">🕒 ${item.hours}</span>
            </div>
            <div class="meta-row" style="margin-top: 0.5rem; justify-content: space-between;">
                <span>${item.pets ? '🐕 Pets Allowed' : '🚫 No Pets'}</span>
                <span class="bookmark-icon">🔖</span>
            </div>
        `;
        els.resourceList.appendChild(card);
    });
}

function renderPolicies(items) {
    els.policyList.innerHTML = '';
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'resource-card policy';
        card.innerHTML = `
            <span class="tag ${item.type.toLowerCase()}">${item.type}</span>
            <h4>${item.title}</h4>
            <p>${item.desc}</p>
            <div class="meta-row">
                <span>${item.icon} ${item.type} Support</span>
            </div>
        `;
        els.policyList.appendChild(card);
    });
}

// Chatbot Logic
function handleChat() {
    const text = els.chatInput.value.trim();
    if (!text) return;

    addMsg(text, 'user');
    els.chatInput.value = '';

    setTimeout(() => {
        const response = getBotResponse(text);
        addMsg(response, 'bot');
    }, 600);
}

function addMsg(text, sender) {
    const div = document.createElement('div');
    div.className = `msg ${sender}`;
    div.textContent = text;
    els.chatWindow.appendChild(div);
    els.chatWindow.scrollTop = els.chatWindow.scrollHeight;
}

function getBotResponse(input) {
    const lower = input.toLowerCase();
    if (lower.includes('food')) return "I found 2 food pantries near you. The Mid-Ohio Food Collective is open until 4pm.";
    if (lower.includes('shelter')) return "There are 3 shelters in your area. Faith Mission has space available.";
    if (lower.includes('pet') || lower.includes('dog')) return "Clintonville-Beechwold Resources allows pets, but most emergency shelters do not.";
    return "I can help you find resources. Try asking about 'food', 'shelter', or 'policies'.";
}
