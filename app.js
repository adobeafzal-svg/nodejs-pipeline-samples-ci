const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Calculator endpoint - add two numbers
app.post('/calculate/add', (req, res) => {
  const { a, b } = req.body;
  
  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({ error: 'Both a and b must be numbers' });
  }
  
  const result = add(a, b);
  res.json({ result });
});

// Calculator endpoint - multiply two numbers
app.post('/calculate/multiply', (req, res) => {
  const { a, b } = req.body;
  
  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({ error: 'Both a and b must be numbers' });
  }
  
  const result = multiply(a, b);
  res.json({ result });
});

// Utility functions
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

// Start server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = { app, add, multiply };
