
const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to SQLite database
const db = new Database("student.db");

// Create students table
db.exec(`
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        course TEXT NOT NULL
    )
`);

console.log("SQLite Database Connected Successfully!");

// Test API
app.get("/", (req, res) => {
    res.send("Student Management API is running!");
});

// Get all students
app.get("/students", (req, res) => {
    const students = db.prepare(
        "SELECT * FROM students"
    ).all();

    res.json(students);
});

// Add a student
app.post("/students", (req, res) => {
    const { name, email, course } = req.body;

    if (!name || !email || !course) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const result = db.prepare(`
        INSERT INTO students (name, email, course)
        VALUES (?, ?, ?)
    `).run(name, email, course);

    res.status(201).json({
        message: "Student added successfully",
        id: result.lastInsertRowid
    });
});

// Start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});

