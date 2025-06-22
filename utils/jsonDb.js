const fs = require('fs');
const path = require('path');

function getFilePath(filename) {
    return path.join(__dirname, '..', filename);
}

function readJson(filename) {
    const filePath = getFilePath(filename);
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data || '[]');
}

function writeJson(filename, data) {
    const filePath = getFilePath(filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = { readJson, writeJson };