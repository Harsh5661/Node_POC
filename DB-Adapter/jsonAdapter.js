const fs = require("fs");
const path = require('path');
const empDataPath = path.join(__dirname, './../data/emp_data.json');

function readJsonFile() {
    return JSON.parse(fs.readFileSync(empDataPath, 'utf-8'));
}

function writeJsonFile(data) {
    fs.writeFileSync(empDataPath, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = { readJsonFile, writeJsonFile };
