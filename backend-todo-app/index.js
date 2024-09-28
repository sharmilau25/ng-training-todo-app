//import express from "express";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "enzigma", 
  });

//connect db
  db.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("Connected to MySQL database.");
  });
app.get("/",(req,res)=>{
    res.send("Server is ready")
})

//Display from db
app.get('/api/tasks', (req, res) => {
    const query = 'SELECT * FROM tasks';
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results); // Send task data to the frontend
    });
});


// Route to fetch assigned_to values from the tasks table
app.get('/api/assigned-to', (req, res) => {
  const query = 'SELECT id, assigned_to AS name FROM tasks'; // Assuming 'id' is the primary key

  db.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching data:', err);
          res.status(500).json({ error: 'Failed to fetch assigned_to data' });
      } else {
          res.json(results);
      }
  });
});

//to save data from modal /new task 
// POST route for creating a new task
app.post('/api/tasks', async (req, res) => {
  const { assigned_to, status, due_date, priority, description } = req.body;

  // Validate request body
  if (!assigned_to || !status || !due_date || !priority || !description) {
      return res.status(400).json({ message: 'All fields are required' });
  }

  try {
      // SQL query to insert the task into the database
      const query = `INSERT INTO tasks (assigned_to, status, due_date, priority, description) VALUES (?, ?, "2024-10-20", ?, ?)`;
      await db.query(query, [assigned_to, status, due_date, priority, description]);

      // Return success response
      res.status(201).json({ message: 'Task successfully created' });
  } catch (error) {
      console.error('Error inserting task:', error);
      res.status(500).json({ message: 'Server error' });
  }
});


//Delete task code
app.delete('/api/tasks/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
      const query = `DELETE FROM tasks WHERE id = ?`;
      await db.query(query, [taskId]);

      res.status(200).json({ message: 'Task successfully deleted' });
  } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ message: 'Server error' });
  }
});


const port=process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`Serve at http://localhost:${port}`)
})