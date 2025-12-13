import express from 'express';
import { loadData } from '../shared.js';

const router = express.Router();
let policyData = loadData('policies.json');
let ngoData = loadData('ngos.json');

// Community can View Policies (Read Only)
router.get('/policies', (req, res) => {
    res.json(policyData);
});

// Community can View NGO Services (Read Only)
router.get('/ngo-services', (req, res) => {
    res.json(ngoData);
});

export default router;
