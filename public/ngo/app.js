// Franklin County ZIP Codes (White list)
const VALID_ZIPS = new Set([
    "43123", "43026", "43230", "43228", "43068", "43229", "43232", "43207", "43224", "43204",
    "43235", "43016", "43017", "43110", "43213", "43221", "43201", "43219", "43004", "43220",
    "43209", "43119", "43223", "43214", "43085", "43054", "43227", "43231", "43211", "43212",
    "43202", "43206", "43215", "43146", "43125", "43205", "43210", "43203", "43137", "43222",
    "43299", "43265", "43196", "43217", "43198", "43109", "43126", "43216", "43086", "43195",
    "43199", "43218", "43226", "43234", "43236", "43260", "43251", "43266", "43270", "43268",
    "43272", "43271", "43287", "43279", "43291", "43002", "43194", "43081", "43065"
]);

const NGO_CATEGORIES = [
    "Addiction Services", "Advocacy", "Affordable Housing", "Arts", "Behavioral Health Provider",
    "Child Care or Early Education", "Community Building", "Developmental Disabilities",
    "Educational Programming", "Family Safety", "Food and Nutrition", "Food Pantry", "Food Programs",
    "Health", "Healthcare Provider", "Homelessness", "Housing", "In-School or Afterschool Program",
    "Legal Services", "Mental Health", "Mentoring", "Nonprofit Supports", "Reentry Services",
    "Referral Services", "Refugee and Immigration Services", "Secondary School", "Senior Services",
    "Seniors", "Services for People Who Are Pregnant or Parenting"
];

// State
let appState = {
    zipData: {}, // SDOH data keyed by ZIP
    ngos: [], // Flat list of NGOs
    ngosByZip: {}, // Keyed by ZIP
    selectedZip: null,
    selectedCategory: "",
    searchQuery: "",
    geoJsonLayer: null,
    map: null
};

// DOM Elements
const els = {
    map: document.getElementById('map'),
    categorySelect: document.getElementById('category-select'),
    totalCount: document.getElementById('total-count'),
    localCount: document.getElementById('local-count'),
    ngoSearch: document.getElementById('ngo-search'),
    clearBtn: document.getElementById('clear-filters'),
    panelTitle: document.getElementById('panel-title'),
    panelContent: document.getElementById('panel-content'),
    sdohGrid: document.getElementById('sdoh-grid'),
    ngoList: document.getElementById('ngo-list'),
    emptyState: document.getElementById('empty-state')
};

// Initialize App
document.addEventListener('DOMContentLoaded', init);

async function init() {
    initMap();
    initControls();

    // 1. Load Map Features (Critical for visual)
    try {
        const geoJson = await fetch('franklin_zipcodes.geojson').then(r => r.json());
        renderGeoJson(geoJson);
    } catch (err) {
        console.error("Failed to load GeoJSON:", err);
    }

    // 2. Load Data from API
    try {
        const [sdohRes, ngoRes] = await Promise.all([
            fetch('http://localhost:3001/api/sdoh').then(r => r.json()),
            fetch('http://localhost:3001/api/ngos').then(r => r.json())
        ]);

        console.log("Loaded Data:", { sdoh: sdohRes, ngos: ngoRes });
        processData(sdohRes, ngoRes);
    } catch (err) {
        console.error("Failed to load API data:", err);
        // Don't alert blocking error, just log. Map should still show.
    }
}

function processData(sdohData, ngoData) {
    // 1. Process SDOH
    appState.zipData = sdohData || {};

    // 2. Process NGOs
    if (Array.isArray(ngoData)) {
        appState.ngos = ngoData.map(row => ({
            ...row,
            zip: normalizeZip(row.zip),
            categoriesList: row.categories ? row.categories.split(';').map(c => c.trim()) : []
        })).filter(n => {
            const valid = n.zip && VALID_ZIPS.has(n.zip);
            if (!valid) console.warn("Filtered out NGO:", n.name, n.zip);
            return valid;
        });
    }

    // Build index
    appState.ngos.forEach(ngo => {
        if (!appState.ngosByZip[ngo.zip]) appState.ngosByZip[ngo.zip] = [];
        appState.ngosByZip[ngo.zip].push(ngo);
    });

    updateGlobalStats();
}

function renderGeoJson(data) {
    appState.geoJsonLayer = L.geoJSON(data, {
        style: styleFeature,
        onEachFeature: onEachFeature,
        filter: (feature) => VALID_ZIPS.has(normalizeZip(feature.properties.ZIP))
    }).addTo(appState.map);

    // Fit bounds to Franklin County
    const bounds = appState.geoJsonLayer.getBounds();
    if (bounds.isValid()) {
        appState.map.fitBounds(bounds);
    }
}

function normalizeZip(z) {
    if (!z) return null;
    return z.toString().trim().padStart(5, '0');
}

// Map Styling & Interaction
function styleFeature(feature) {
    return {
        fillColor: '#64748b',
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.2
    };
}

function highlightFeature(e) {
    const layer = e.target;
    layer.setStyle({
        weight: 3,
        color: '#2563eb',
        dashArray: '',
        fillOpacity: 0.4
    });
    layer.bringToFront();

    // Show tooltip
    const zip = normalizeZip(layer.feature.properties.ZIP);
    layer.bindTooltip(`ZIP ${zip}`, { sticky: true }).openTooltip();
}

function resetHighlight(e) {
    if (appState.selectedZip === normalizeZip(e.target.feature.properties.ZIP)) return; // Don't reset if selected

    appState.geoJsonLayer.resetStyle(e.target);

    // Re-apply category highlight if needed
    if (appState.selectedCategory) {
        updateMapHighlights();
    }
}

function selectZip(e) {
    const layer = e.target;
    const zip = normalizeZip(layer.feature.properties.ZIP);

    // Reset previous selection style
    appState.geoJsonLayer.eachLayer(l => {
        appState.geoJsonLayer.resetStyle(l);
    });

    // Re-apply category highlights
    if (appState.selectedCategory) updateMapHighlights();

    // Set new selection
    appState.selectedZip = zip;

    // Style selected
    layer.setStyle({
        weight: 3,
        color: '#1e40af', // Darker blue
        fillOpacity: 0.5,
        fillColor: '#bfdbfe'
    });

    renderSidePanel(zip);
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: selectZip
    });
}

// Logic Updates
function updateFilters() {
    const cat = appState.selectedCategory;
    const hasFilter = !!cat || !!appState.searchQuery;

    els.clearBtn.disabled = !hasFilter;

    updateGlobalStats();
    updateMapHighlights();

    // Refresh side panel if a ZIP is selected
    if (appState.selectedZip) {
        renderNgoList(appState.selectedZip);
    }
}

function updateGlobalStats() {
    const cat = appState.selectedCategory;
    if (!cat) {
        els.totalCount.textContent = appState.ngos.length;
    } else {
        const count = appState.ngos.filter(n => n.categoriesList.includes(cat)).length;
        els.totalCount.textContent = count;
    }
}

function updateMapHighlights() {
    const cat = appState.selectedCategory;

    appState.geoJsonLayer.eachLayer(layer => {
        const zip = normalizeZip(layer.feature.properties.ZIP);
        if (zip === appState.selectedZip) return; // Skip selected

        // Verify if this ZIP has NGOs of selected category
        const zipNgos = appState.ngosByZip[zip] || [];
        const hasCat = cat && zipNgos.some(n => n.categoriesList.includes(cat));

        if (hasCat) {
            layer.setStyle({
                fillColor: '#f59e0b', // Orange-ish for heat
                fillOpacity: 0.6,
                color: 'white'
            });
        } else {
            // Reset to default if not selected
            // We use resetStyle but need to respect that resetStyle restores to original
            // So we just manually set back to default
            layer.setStyle({
                fillColor: '#64748b',
                fillOpacity: 0.2,
                color: 'white'
            });
        }
    });
}

// Rendering Side Panel
function renderSidePanel(zip) {
    els.emptyState.classList.add('hidden');
    els.panelContent.classList.remove('hidden');
    els.panelTitle.textContent = `ZIP Code ${zip}`;

    // Render SDOH
    const sdoh = appState.zipData[zip] || {};
    els.sdohGrid.innerHTML = '';

    Object.keys(sdoh).forEach(key => {
        if (key === 'zip') return;

        // Format Label
        const label = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

        // Format Value
        let val = sdoh[key];
        if (!isNaN(parseFloat(val))) {
            val = parseFloat(val).toLocaleString();
        }

        const divLabel = document.createElement('div');
        divLabel.className = 'indicator-label';
        divLabel.textContent = label;

        const divVal = document.createElement('div');
        divVal.className = 'indicator-value';
        divVal.textContent = val;

        els.sdohGrid.appendChild(divLabel);
        els.sdohGrid.appendChild(divVal);
    });

    renderNgoList(zip);
}

function renderNgoList(zip) {
    const allZipNgos = appState.ngosByZip[zip] || [];

    // Filter by Category and Search
    const filtered = allZipNgos.filter(n => {
        const matchesCat = !appState.selectedCategory || n.categoriesList.includes(appState.selectedCategory);
        const matchesSearch = !appState.searchQuery || n.name.toLowerCase().includes(appState.searchQuery);
        return matchesCat && matchesSearch;
    });

    els.localCount.textContent = `${filtered.length} found`;
    els.ngoList.innerHTML = '';

    if (filtered.length === 0) {
        els.ngoList.innerHTML = '<p class="text-muted" style="text-align: center; padding: 1rem;">No NGOs found matching criteria.</p>';
        return;
    }

    filtered.forEach(ngo => {
        const card = document.createElement('div');
        card.className = 'ngo-card';

        const catsHtml = ngo.categoriesList.map(c => `<span class="cat-tag">${c}</span>`).join('');

        card.innerHTML = `
      <a href="${ngo.website}" target="_blank" rel="noopener noreferrer" class="ngo-name">${ngo.name} ↗</a>
      <div class="ngo-cats">${catsHtml}</div>
      <p class="ngo-desc">${ngo.description || 'No description available.'}</p>
    `;

        els.ngoList.appendChild(card);
    });
}
