const sqlite3 = require('sqlite3').verbose();
const faker = require('faker');

// Connect to the database
const db = new sqlite3.Database('mydatabase.db');

// Function to generate fake user data
function generateFakeUser() {
    return {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: faker.random.arrayElement(['user', 'admin']),
        is_active: faker.random.boolean() ? 1 : 0
    };
}

// Generate 20 fake users
const users = Array.from({ length: 20 }, () => generateFakeUser());

// Insert fake data into the users table
db.serialize(() => {
    const insertUserStmt = db.prepare(`INSERT INTO users (first_name, last_name, email, password, role, is_active) VALUES (?, ?, ?, ?, ?, ?)`);

    users.forEach(user => {
        insertUserStmt.run(user.first_name, user.last_name, user.email, user.password, user.role, user.is_active);
    });

    insertUserStmt.finalize();

    console.log('Fake data inserted successfully');
});

// Close the database connection
db.close();
