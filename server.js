const express = require('express');
const app = express();

app.use(express.json());

// Temporary in-memory storage
let users = [
    { id: 1, name: "Achyut" },
    { id: 2, name: "Akash" }
];


// ================== GET ==================
// Get all users
app.get('/users', (req, res) => {
    res.status(200).json(users);
});


// ================== POST ==================
// Add new user
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (!newUser.id || !newUser.name) {
        return res.status(400).json({ message: "ID and Name are required" });
    }

    users.push(newUser);

    res.status(201).json({
        message: "User added successfully",
        data: newUser
    });
});


// ================== PUT ==================
// Update user by ID
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    user.name = updatedData.name || user.name;

    res.status(200).json({
        message: "User updated successfully",
        data: user
    });
});


// ================== DELETE ==================
// Delete user by ID
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    const deletedUser = users.splice(index, 1);

    res.status(200).json({
        message: "User deleted successfully",
        data: deletedUser
    });
});


// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});