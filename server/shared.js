import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loadData = (file) => {
    const dataPath = path.join(__dirname, 'data', file);
    try {
        return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    } catch (error) {
        console.error(`Error loading ${file}:`, error);
        return [];
    }
};

export const saveData = (file, data) => {
    const dataPath = path.join(__dirname, 'data', file);
    try {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 4));
        return true;
    } catch (error) {
        console.error(`Error saving ${file}:`, error);
        return false;
    }
};
