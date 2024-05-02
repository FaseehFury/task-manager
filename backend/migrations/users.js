const sqlite3 = require('sqlite3').verbose();

// Connect to the database (if it doesn't exist, it will be created)
const db = new sqlite3.Database('mydatabase.db');

// Create user table
const sql = `CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        email TEXT UNIQUE,
        password TEXT,
        role TEXT,
        is_active INTEGER,
        created DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated DATETIME DEFAULT CURRENT_TIMESTAMP
    )`

db.run(sql, [], function (err) {
    if (err) {
        console.error('Error inserting data:', err.message);
    } else {
        console.log(`Tasks table created successfully.`);
    }
});

// Close the database connection
db.close((err) => {
    if (err) {
        console.error('Error closing database:', err.message);
    } else {
        console.log('Closed the SQLite database connection.');
    }
});

