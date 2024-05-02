const express = require('express');
const bodyParser = require('body-parser');
const { mutateQuery, getQuery, connection } = require('./db_functions')
var cors = require('cors')
const app = express();
const port = 4000;

// Connect to the database
const db = connection()

app.use(cors())

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


// Parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/task', async (req, res) => {
    const data = await getQuery('SELECT * FROM tasks ORDER BY created DESC')
    res.send(data);
});

app.post('/task', (req, res) => {
    const { title, description, due_date } = req.body
    const sql = `INSERT INTO tasks (title, description, due_date) VALUES (?, ?, ?)`;
    const params = [title, description, due_date];

    mutateQuery(sql, params)
    res.send({
        message: 'data inserted successfully'
    });
});

app.put('/task/:id', async (req, res) => {
    const tasks = await getQuery('SELECT * FROM tasks WHERE id = ?', [req.params.id])
    const task = tasks[0]
    if (!task) throw new Error('task not found')
    const updatedTask = { ...task, ...req.body }
    const { title, description, due_date } = updatedTask
    const sql = `UPDATE tasks 
    SET title = ?, description = ?, due_date = ?, updated = CURRENT_TIMESTAMP 
    WHERE id = ?`;
    const params = [title, description, due_date, req.params.id];

    mutateQuery(sql, params)
    res.send({
        message: `Task with ID ${req.params.id} has been updated.`
    });
});



// DELETE endpoint to delete a task by ID
app.delete('/task/:id', async (req, res) => {
    const taskId = req.params.id;

    try {
        await mutateQuery(`DELETE FROM tasks WHERE id = ?`, [taskId]);
        res.send('Task deleted successfully');
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).send('Internal server error');
    }
});











// Define a route for /users endpoint
app.get('/users', (req, res) => {
    // Query the database to retrieve all users
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(rows); // Send the retrieved users as a response
    });
});


// Endpoint for creating a user
app.post('/users', (req, res) => {
    const { first_name, last_name, email, password, role, is_active } = req.body;

    // Insert user into the database
    const insertUserStmt = db.prepare(`INSERT INTO users (first_name, last_name, email, password, role, is_active) VALUES (?, ?, ?, ?, ?, ?)`);
    insertUserStmt.run(first_name, last_name, email, password, role, is_active, function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to create user' });
        }
        res.json({ message: 'User created successfully', id: this.lastID });
    });
    insertUserStmt.finalize();
});

// Endpoint for updating a user
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;

    // Fetch existing user data from the database
    db.get('SELECT * FROM users WHERE id=?', [userId], (err, existingUser) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Merge existing user data with request body
        const updatedUser = { ...existingUser, ...req.body };

        // Update user in the database
        const updateUserStmt = db.prepare(`
            UPDATE users 
            SET 
                first_name = COALESCE(?, first_name), 
                last_name = COALESCE(?, last_name), 
                email = COALESCE(?, email), 
                password = COALESCE(?, password), 
                role = COALESCE(?, role), 
                is_active = COALESCE(?, is_active) 
            WHERE id = ?
        `);

        updateUserStmt.run(
            updatedUser.first_name,
            updatedUser.last_name,
            updatedUser.email,
            updatedUser.password,
            updatedUser.role,
            updatedUser.is_active,
            userId,
            function (err) {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json({ error: 'Failed to update user' });
                }
                res.json({ message: 'User updated successfully' });
            }
        );

        updateUserStmt.finalize();
    });
});

// Endpoint for deleting a user
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    // Delete user from the database
    const deleteUserStmt = db.prepare(`DELETE FROM users WHERE id=?`);
    deleteUserStmt.run(userId, function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to delete user' });
        }
        res.json({ message: 'User deleted successfully' });
    });
    deleteUserStmt.finalize();
});










app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
