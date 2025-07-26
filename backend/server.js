const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route Imports
const orderRoutes = require('./routes/order');
const paymentRoutes = require('./routes/payment');
const menuRoutes = require('./routes/menu');

// Route Usage
app.use('/order', orderRoutes);
app.use('/payment-link', paymentRoutes);
app.use('/menu', menuRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
