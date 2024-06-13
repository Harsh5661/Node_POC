const fs = require("fs");
const path = require('path');
const empDataPath = path.join(__dirname, '../emp_data.json');
const MESSAGES = require('../constants/index');

function readJsonFile() {
    try {
        const empData = JSON.parse(fs.readFileSync(empDataPath, 'utf-8'));
        return empData;
    } catch (error) {
        throw new Error(`${MESSAGES.MESSAGE.FILE_PROCESS.READ_ERR}`);
    }
}

function writeJsonFile(data) {
    try {
        fs.writeFileSync(empDataPath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        throw new Error(`${MESSAGES.MESSAGE.FILE_PROCESS.WRITE_ERR}`);
    }
}

module.exports = { readJsonFile, writeJsonFile };