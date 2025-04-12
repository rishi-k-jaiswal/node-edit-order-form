// server.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// GET route for the form
app.get('/', (req, res) => {
  res.render('form');
});

app.post('/api/shipping', (req, res) => {
    const { address, pickup, productvariant } = req.body;
  
    if (!address || !pickup || !productvariant) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    // In a real app, you could save to a DB here
    console.log('🚚 Shipping API Data:', { address, pickup, productvariant });
  
    res.json({
      message: 'Shipping info received successfully!',
      data: { address, pickup, productvariant }
    });
  });
  

// POST route to handle submission
app.post('/submit', (req, res) => {
  const { address, pincode, variant } = req.body;

  if (!address || !pincode || !variant) {
    return res.status(400).send('All fields are required.');
  }

  // Render result page with submitted data
  res.render('result', { address, pincode, variant });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
