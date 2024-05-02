const sqlite3 = require('sqlite3').verbose();
const faker = require('faker');

// Connect to the database
const db = new sqlite3.Database('mydatabase.db');

// Function to generate fake task data
function generateFakeTask() {
    return {
        title: faker.lorem.words(),
        description: faker.lorem.sentence(),
        due_date: faker.date.future().toISOString().slice(0, 19).replace('T', ' ')
    };
}

// Generate 20 fake tasks
const tasks = Array.from({ length: 20 }, () => generateFakeTask());

// Insert fake data into the tasks table
db.serialize(() => {
    const insertTaskStmt = db.prepare(`INSERT INTO tasks (title, description, due_date) VALUES (?, ?, ?)`);

    tasks.forEach(task => {
        insertTaskStmt.run(task.title, task.description, task.due_date);
    });

    insertTaskStmt.finalize();

    console.log('Fake task data inserted successfully');
});

// Close the database connection
db.close();
