const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.post('/', (req, res) => {
  let { name, mobile, items } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Invalid order data' });
  }
  if (!name) {
    name = 'Guest_' + Math.floor(1000 + Math.random() * 9000);
  }
  console.log(name, mobile);
  db.run(`INSERT INTO users (name, mobile) VALUES (?, ?)`, [name, mobile], function (err) {
    if (err) return res.status(500).json({ error: err });

    const userId = this.lastID;
    db.run(`INSERT INTO orders (user_id, status) VALUES (?)`, [userId], function (err) {
      if (err) return res.status(500).json({ error: 'Order insert error' });

      const orderId = this.lastID;
      const stmt = db.prepare(`INSERT INTO order_items (order_id, item_id, quantity) VALUES (?, ?, ?)`);
      if(err) return res.status(500).json({ error: err });
      items.forEach(item => {
        stmt.run(orderId, item.id, item.quantity);
      });
      stmt.finalize(() => {
        res.json({ order_id: orderId });
      });
    });
  });
});

router.post('/:orderId/confirm', (req, res) => {
  const { orderId } = req.params;
  db.run(`UPDATE orders SET status = 'paid' WHERE id = ?`, [orderId], function (err) {
    if (err) return res.status(500).json({ error: 'Payment confirmation failed' });
    res.json({ message: 'Payment confirmed' });
  });
});

module.exports = router;
