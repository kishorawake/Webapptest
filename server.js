const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Incoming request: ${req.method} ${req.url}`);
  next();
});

// Root route
app.get('/', (req, res) => {
  res.send(`
    <h1 style="color: #4CAF50; text-align: center;">🚀 Hello from Node.js on Docker!</h1>
    <p style="font-size: 18px; text-align: center;">Welcome to your containerized web app! 🎉</p>
    <p style="text-align: center;">
      Try <a href="/joke" style="color: #2196F3; font-weight: bold;">/joke</a> or 
      <a href="/status" style="color: #2196F3; font-weight: bold;">/status</a>
    </p>
  `);
});

// A fun joke route
app.get('/joke', (req, res) => {
  const jokes = [
    "Why do Java developers wear glasses? Because they don’t C#! 🤓",
    "Why did the dev go broke? Because he used up all his cache. 💸",
    "To understand what recursion is, you must first understand recursion. 🔁",
    "I would tell you a UDP joke, but you might not get it. 📡"
  ];
  const random = jokes[Math.floor(Math.random() * jokes.length)];
  res.send(`
    <h2 style="color: #FF5722; text-align: center;">😂 Here's a joke:</h2>
    <p style="font-size: 20px; text-align: center; font-style: italic;">${random}</p>
  `);
});

// A simple status check
app.get('/status', (req, res) => {
  res.json({ 
    status: "🟢 All systems go!", 
    uptime: process.uptime().toFixed(2) + " seconds" 
  });
});

// 404 route
app.use((req, res) => {
  res.status(404).send(`
    <h1 style="color: #F44336; text-align: center;">😕 Whoops! This page doesn't exist.</h1>
  `);
});

// Start the server
app.listen(PORT, () => {
  console.log(`🔥 Server is running on http://localhost:${PORT}`);
});
