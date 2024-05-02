const sqlite3 = require('sqlite3').verbose();

// Open a database connection
const db = new sqlite3.Database('mydatabase.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Insert data into the tasks table
const sql = `CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_date TIMESTAMP
);`;

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
