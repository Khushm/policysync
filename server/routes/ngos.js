import express from 'express';
import { loadData, saveData } from '../shared.js';

const router = express.Router();
let ngoData = loadData('ngos.json');

// NGOs can View and Modify Services
router.get('/services', (req, res) => {
    res.json(ngoData);
});

router.post('/services', (req, res) => {
    const newService = req.body;
    ngoData.push(newService);
    saveData('ngos.json', ngoData);
    res.status(201).json(newService);
});

export default router;
