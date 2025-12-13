import express from 'express';
import cors from 'cors';
import policymakerRoutes from './routes/policymaker.js';
import communityRoutes from './routes/community.js';
import ngoRoutes from './routes/ngos.js';
import { loadData } from './shared.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Modular Routes
app.use('/api/policymaker', policymakerRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/ngos', ngoRoutes);

// Legacy/Shared SDOH logic (keeping as global for now or could move to shared)
let sdohData = loadData('sdoh.json');

app.get('/api/sdoh', (req, res) => res.json(sdohData));
app.get('/api/sdoh/:zip', (req, res) => {
    const data = sdohData[req.params.zip];
    if (data) res.json(data);
    else res.status(404).json({ error: "ZIP not found in dataset" });
});

app.get('/api/risk_score_by_zip', (req, res) => {
    const zip = req.query.zip;
    const data = sdohData[zip] || { median_income: 45000, poverty_rate: 15, uninsured: 8 };
    let score = 0;
    if (data.median_income < 40000) score += 40;
    if (data.poverty_rate > 20) score += 30;
    if (data.uninsured > 10) score += 20;
    const finalScore = Math.min(100, Math.max(0, score));
    res.json({ zip, score: finalScore, details: "Calculated based on local SDOH indicators" });
});

app.listen(port, () => {
    console.log(`Unified Modular API Server running at http://localhost:${port}`);
    console.log(`- Policymaker Routes: /api/policymaker`);
    console.log(`- Community Routes: /api/community`);
    console.log(`- NGO Routes: /api/ngos`);
});
