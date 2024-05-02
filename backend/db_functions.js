const sqlite3 = require('sqlite3').verbose();

const connection = () => {
    return new sqlite3.Database('mydatabase.db', (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
        } else {
            console.log('Connected to the SQLite database.');
        }
    });
}

const getQuery = async (sql, params = []) => {


    const db = connection()
    return new Promise((resolve, reject) => {

        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });

        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('Closed the SQLite database connection.');
            }
        });
    });
}

const mutateQuery = (qry, params) => {


    const db = connection()

    db.run(qry, params, function (err) {
        if (err) {
            console.error('Error inserting data:', err.message);
        } else {
            console.log(`A new task has been inserted with id ${this.lastID}.`);
        }
    });

    // Close the database connection
    db.close();

}


module.exports = { mutateQuery, getQuery, connection }
