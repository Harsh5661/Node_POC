const jsonAdapter = require('../DB-Adapter/jsonAdapter');
const sqlAdapter = require('../DB-Adapter/sqlAdapter');
const MESSAGES = require('../constants/index');

let useJson = true; // flag to determine the data source

function setDataSource(source) {
    useJson = (source === 'json');
}

function readData() {
    try {
        if (useJson) {
            return jsonAdapter.readJsonFile();
        } else {
            return sqlAdapter.readDataFromMySQL();
        }
    } catch (error) {
        throw new Error(`${MESSAGES.MESSAGE.FILE_PROCESS.READ_ERR}`);
    }
}

function writeData(data) {
    try {
        if (useJson) {
            jsonAdapter.writeJsonFile(data);
        } else {
            sqlAdapter.writeDataToMySQL(data);
        }
    } catch (error) {
        throw new Error(`${MESSAGES.MESSAGE.FILE_PROCESS.WRITE_ERR}`);
    }
}

module.exports = { readData, writeData, setDataSource };