const express = require('express');
const router = express.Router();
const db = require('../db/database');


module.exports = function (io) {
  
  router.post('/', (req, res) => {
    console.log(req.body);
    let { name, mobile, items } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Invalid order data' });
    }
  
    if (!name) {
      name = 'Guest_' + Math.floor(1000 + Math.random() * 9000);
    }
  
    db.run(`INSERT INTO users (name, mobile) VALUES (?, ?)`, [name, mobile], function (err) {
      if (err) return res.status(500).json({ error: err });
      const userId = this.lastID;
      db.run(`INSERT INTO orders (user_id) VALUES (?)`, [userId], function (err) {
        if (err) return res.status(500).json({ error: 'Order insert error' });
  
        const orderId = this.lastID;
        const stmt = db.prepare(`INSERT INTO order_items (order_id, item_id, quantity, size_id) VALUES (?, ?, ?, ?)`);
        items.forEach(item => {
          const sizeId = item.sizeId || null;
          stmt.run(orderId, item.id, item.quantity, sizeId);
        });
  
        stmt.finalize(() => {
          res.json({ status: 'success', data: { orderId }, statusCode: 200 });
        });
      });
    });
  });

  router.put('/:orderId/item/:itemId/status', (req, res) => {
    console.log(req.params);
    console.log(req.body);
    const { orderId, itemId } = req.params;
    const { kitchen_status } = req.body;

    if (!['queued', 'preparing', 'ready', 'served'].includes(kitchen_status)) {
      return res.status(400).json({ error: 'Invalid kitchen_status value' });
    }

    const query = `
      UPDATE order_items
      SET kitchen_status = ?
      WHERE order_id = ? AND item_id = ?
    `;

    db.run(query, [kitchen_status, orderId, itemId], function (err) {
      if (err) {
        console.error('DB error:', err);
        return res.status(500).json({ error: 'Failed to update kitchen_status' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Order item not found' });
      }

      const data = {
        order_id: orderId,
        item_id: itemId,
        kitchen_status
      };

      io.emit('order_update', data); // ✅ emit only once

      return res.json({
        status: 'success',
        message: 'Kitchen status updated',
        data,
        statusCode: 200
      });
    });
  });

  return router;
};


// router.post('/:orderId', (req, res) => {
//   console.log(req.params, req.body);
//   res.json({ status: 'success', data: 'test', statusCode: 200 });
// });

// router.post('/:orderId/confirm', (req, res) => {
//   const { orderId } = req.params;
//   db.run(`UPDATE orders SET status = 'paid' WHERE id = ?`, [orderId], function (err) {
//     if (err) return res.status(500).json({ error: 'Payment confirmation failed' });
//     res.json({ message: 'Payment confirmed' });
//   });
// });

