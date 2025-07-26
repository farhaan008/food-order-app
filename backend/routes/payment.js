const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/:orderId', (req, res) => {
  const { orderId } = req.params;

  db.all(
    `SELECT mi.price, oi.quantity FROM order_items oi JOIN menu_items mi ON mi.id = oi.item_id WHERE oi.order_id = ?`,
    [orderId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: 'Failed to calculate total' });

      const total = rows.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const upiId = "restaurant@upi";
      const upiLink = `upi://pay?pa=${upiId}&pn=MyCafe&am=${total}&cu=INR`;
      const qrLink = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(upiLink)}&size=200x200`;

      res.json({ amount: total, upi_link: upiLink, qr_image: qrLink });
    }
  );
});

module.exports = router;

// Confirm Payment Manually (Offline or via Callback/Webhook)
// app.post('/order/:orderId/confirm', (req, res) => {
//   const { orderId } = req.params;

//   db.run(`UPDATE orders SET status = 'paid' WHERE id = ?`, [orderId], function(err) {
//     if (err) return res.status(500).send("Update failed");
//     res.json({ message: "Payment confirmed" });
//   });
// });
