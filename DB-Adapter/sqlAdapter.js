const SyncMysql = require('sync-mysql');
const MESSAGES = require('../constants/index');

const connection = new SyncMysql({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'emp_data'
});

function readDataFromMySQL() {
    try {
        const rows = connection.query('SELECT * FROM employees');
        return rows;
    } catch (error) {
        throw new Error(`${MESSAGES.MESSAGE.FILE_PROCESS.READ_ERR}`);
    }
}

function writeDataToMySQL(data) {
    try {
        connection.query('DELETE FROM employees');
        data.forEach(emp => {
            const query = `INSERT INTO employees (id, first_name, last_name, email, gender, job_title, dept) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            const values = [
                emp.id,
                emp.first_name,
                emp.last_name,
                emp.email,
                emp.gender,
                emp.job_title,
                emp.dept
            ];
            console.log('Executing query:', query, 'with parameters:', values);
            connection.query(query, values);
        });
    } catch (error) {
        throw new Error(`${MESSAGES.MESSAGE.FILE_PROCESS.WRITE_ERR}`);
    }
}

module.exports = { readDataFromMySQL, writeDataToMySQL };
