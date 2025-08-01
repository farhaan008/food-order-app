const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);
const socketIO = require('socket.io');
const socket = require('./socket');
const io = socketIO(server, { cors: { origin: '*' } });
socket.init(io);


app.use(cors());
app.use(express.json());


const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/order');
const orderDashboardRoutes = require('./routes/order-dashboard')
const orderKitchenDashboardRoutes = require('./routes/kitchen-dashboard')

app.use('/api/menu', menuRoutes);
app.use('/api/order', orderRoutes(io));
app.use('/api/order-dashboard', orderDashboardRoutes);
app.use('/api/kitchen-dashboard', orderKitchenDashboardRoutes);

const paymentRoutes = require('./routes/payment');
const generateQr = require('./routes/generate-qr');

app.use('/api/payment-link', paymentRoutes);
app.use('/api/generate-qr', generateQr);


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

