import express from 'express';
import { loadData, saveData } from '../shared.js';

const router = express.Router();
let policyData = loadData('policies.json');

// Policymaker can View and Modify Policies
router.get('/policies', (req, res) => {
    res.json(policyData);
});

router.post('/policies', (req, res) => {
    const newPolicy = req.body;
    policyData.push(newPolicy);
    saveData('policies.json', policyData);
    res.status(201).json(newPolicy);
});

export default router;
