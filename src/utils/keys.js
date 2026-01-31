import { readFileSync } from 'fs';
import dotenv from 'dotenv';

// Lade .env Datei zuerst
dotenv.config();

let keys = {};
try {
    const data = readFileSync('./keys.json', 'utf8');
    keys = JSON.parse(data);
} catch (err) {
    console.warn('keys.json not found. Using environment variables instead.'); // still works with local models
}

export function getKey(name) {
    let key = keys[name];
    if (!key) {
        key = process.env[name];
    }
    if (!key) {
        throw new Error(`API key "${name}" not found in keys.json, .env or environment variables!`);
    }
    return key;
}

export function hasKey(name) {
    return keys[name] || process.env[name];
}
