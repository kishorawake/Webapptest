const express = require('express');
const axios = require('axios');  // For pulling data from external APIs
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Dynamic greeting based on time of day
function getGreeting() {
  const hours = new Date().getHours();
  if (hours < 12) {
    return "Good morning!";
  } else if (hours < 18) {
    return "Good afternoon!";
  } else {
    return "Good evening!";
  }
}

// Root route
app.get('/', (req, res) => {
  const greeting = getGreeting();
  const randomBg = `https://picsum.photos/1920/1080?random=${Math.floor(Math.random() * 1000)}`;

  res.send(`
    <html>
      <head>
        <title>Dynamic Node.js App</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #fff;
            background-image: url('${randomBg}');
            background-size: cover;
            background-position: center;
            text-align: center;
            padding: 50px;
            animation: fadeIn 2s ease-in-out;
          }
          h1 {
            color: #FF5722;
            text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
            font-size: 3em;
          }
          a {
            color: #2196F3;
            font-weight: bold;
            font-size: 1.2em;
            text-decoration: none;
            margin: 10px;
            transition: color 0.3s ease;
          }
          a:hover {
            color: #FF5722;
          }
          p {
            font-size: 1.5em;
          }
          .greeting {
            font-size: 2em;
            margin-bottom: 30px;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        </style>
      </head>
      <body>
        <h1>🚀 Hello from Node.js on Docker!</h1>
        <p class="greeting">${greeting} Welcome to your dynamic containerized web app! 🎉</p>
        <p>
          <a href="/joke">Random Joke</a> | 
          <a href="/quote">Quote of the Day</a> | 
          <a href="/image">Random Image</a> | 
          <a href="/status">App Status</a> | 
          <a href="/time">Server Time</a>
        </p>
      </body>
    </html>
  `);
});

// Joke route (Fetch from Joke API for more randomness)
app.get('/joke', async (req, res) => {
  try {
    const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
    const joke = `${response.data.setup} - ${response.data.punchline}`;
    res.send(`
      <h2 style="color: #FF5722; text-align: center;">😂 Here's a Joke:</h2>
      <p style="font-size: 20px; text-align: center; font-style: italic;">${joke}</p>
      <p style="text-align: center;"><a href="/">Back to Home</a></p>
    `);
  } catch (error) {
    res.send("Failed to fetch joke. Please try again later.");
  }
});

// Quote of the Day route
app.get('/quote', (req, res) => {
  const quotes = [
    "“Talk is cheap. Show me the code.” – Linus Torvalds",
    "“Programs must be written for people to read, and only incidentally for machines to execute.” – Harold Abelson",
    "“Code is like humor. When you have to explain it, it’s bad.” – Cory House",
    "“First, solve the problem. Then, write the code.” – John Johnson",
    "“Experience is the name everyone gives to their mistakes.” – Oscar Wilde"
  ];
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  res.send(`
    <h2 style="color: #673AB7; text-align: center;">📜 Quote of the Day</h2>
    <p style="font-size: 22px; text-align: center; font-style: italic;">${random}</p>
    <p style="text-align: center;"><a href="/">Back to Home</a></p>
  `);
});

// Random image route
app.get('/image', (req, res) => {
  const images = [
    "https://picsum.photos/seed/dev1/600/400",
    "https://picsum.photos/seed/code2/600/400",
    "https://picsum.photos/seed/docker3/600/400",
    "https://picsum.photos/seed/k8s4/600/400",
    "https://picsum.photos/seed/tech5/600/400"
  ];
  const randomImage = images[Math.floor(Math.random() * images.length)];
  res.send(`
    <html>
      <head><title>Random Image</title></head>
      <body style="text-align: center; background-color: #f0f0f0; font-family: sans-serif;">
        <h2 style="color: #009688;">🖼️ Here's a Random Image</h2>
        <img src="${randomImage}" alt="Random image" style="max-width: 90%; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.2);" />
        <p><a href="/image">🔄 Refresh</a> | <a href="/">🏠 Home</a></p>
      </body>
    </html>
  `);
});

// 404 Route
app.use((req, res) => {
  res.status(404).send(`
    <h1 style="color: #F44336; text-align: center;">😕 Whoops! This page doesn't exist.</h1>
    <p style="text-align: center;"><a href="/">Back to Home</a></p>
  `);
});

// Start the server
app.listen(PORT, () => {
  console.log(`🔥 Server is running on http://localhost:${PORT}`);
});
