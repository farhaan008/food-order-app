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
    // console.log(req.params);
    // console.log(req.body);
    const { orderId, itemId } = req.params;
    const { kitchen_status } = req.body;

    if (!['queued', 'preparing', 'ready', 'served'].includes(kitchen_status)) {
      return res.status(400).json({ error: 'Invalid kitchen_status value' });
    }

    const query = `UPDATE order_items SET kitchen_status = ? WHERE order_id = ? AND id = ?`;

    db.run(query, [kitchen_status, orderId, itemId], function (err) {
      if (err) {
        console.error('DB error:', err);
        return res.status(500).json({ error: 'Failed to update kitchen_status' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Order item not found' });
      }

      const data = { order_id: orderId, item_id: itemId, kitchen_status };
      io.emit('order_update', data);
      return res.json({ status: 'success', message: 'Kitchen status updated', data, statusCode: 200 });

    });
  });


  router.put('/:orderId/item/status', (req, res) => {
    const { orderId } = req.params;
    const { kitchen_status } = req.body;

    const validStatuses = ['queued', 'preparing', 'ready', 'served'];
    if (!validStatuses.includes(kitchen_status)) {
      return res.status(400).json({ error: 'Invalid kitchen_status value' });
    }

    const updateItemsQuery = `UPDATE order_items SET kitchen_status = ? WHERE order_id = ?`;

    db.run(updateItemsQuery, [kitchen_status, orderId], function (err) {
      if (err) {
        console.error('DB error (order_items):', err.message);
        return res.status(500).json({ error: 'Failed to update kitchen_status' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'No order_items found for the given order_id' });
      }

      let newOrderStatus;
      switch (kitchen_status) {
        case 'preparing':
          newOrderStatus = 'preparing';
          break;
        case 'ready':
          newOrderStatus = 'ready';
          break;
        case 'served':
          newOrderStatus = 'served';
          break;
        default:
          newOrderStatus = 'confirmed';
      }

      const updateOrderQuery = `UPDATE orders SET status = ? WHERE id = ?`;

      db.run(updateOrderQuery, [newOrderStatus, orderId], function (orderErr) {
        if (orderErr) {
          console.error('DB error (orders):', orderErr.message);
          return res.status(500).json({
            error: 'Kitchen status updated, but failed to update order status'
          });
        }

        const data = {
          order_id: orderId,
          kitchen_status,
          order_status: newOrderStatus,
        };

        if (io && io.emit) {
          io.emit('order_update', data);
        }

        return res.status(200).json({
          status: 'success',
          message: 'Kitchen and order status updated successfully',
          data,
        });
      });
    });
  });

  // router.put('/:orderId/item/status', (req, res) => {
  //   const { orderId } = req.params;
  //   const { kitchen_status } = req.body;

  //   console.log('Params:', req.params);
  //   console.log('Body:', req.body);

  //   const validStatuses = ['queued', 'preparing', 'ready', 'served'];
  //   if (!validStatuses.includes(kitchen_status)) {
  //     return res.status(400).json({ error: 'Invalid kitchen_status value' });
  //   }

  //   const query = `UPDATE order_items SET kitchen_status = ? WHERE order_id = ?`;
  //   db.run(query, [kitchen_status, orderId], function (err) {
  //     if (err) {
  //       console.error('DB error:', err.message);
  //       return res.status(500).json({ error: 'Failed to update kitchen_status' });
  //     }

  //     if (this.changes === 0) {
  //       return res.status(404).json({ error: 'No order_items found for the given order_id' });
  //     }

  //     let newOrderStatus = null;
  //     switch (kitchen_status) {
  //       case 'preparing':
  //         newOrderStatus = 'in_progress';
  //         break;
  //       case 'ready':
  //         newOrderStatus = 'ready';
  //         break;
  //       case 'served':
  //         newOrderStatus = 'delivered';
  //         break;
  //       default:
  //         newOrderStatus = 'confirmed';
  //     }
  //     const updateOrderQuery = `UPDATE orders SET status = ? WHERE id = ?`;
  //     db.run(updateOrderQuery, [newOrderStatus, orderId], function (orderErr) {
  //       if (orderErr) {
  //         console.error('Failed to update order status:', orderErr.message);
  //         return res.status(500).json({ error: 'Kitchen status updated, but failed to update order status' });
  //       }
  //       const data = { order_id: orderId, kitchen_status, order_status: newOrderStatus };
  //       if (io && io.emit) {
  //         io.emit('order_update', data);
  //       }
  //       return res.status(200).json({ status: 'success', message: 'Kitchen and order status updated successfully', data });
  //     });

  //     const data = { order_id: orderId, kitchen_status };
  //     if (io && io.emit) {
  //       io.emit('order_update', data);
  //     }
  //     return res.status(200).json({ status: 'success', message: 'Kitchen status updated successfully', data });

  //   });
  // });

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

