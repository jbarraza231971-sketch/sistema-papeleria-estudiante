const sqlite3 = require('sqlite3').verbose();

const DB_NAME = 'database.db';

const db = new sqlite3.Database(DB_NAME, (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

module.exports = db;