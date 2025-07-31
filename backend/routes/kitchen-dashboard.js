const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
  const query = `
    SELECT
        o.id AS order_id,
        o.created_at,
        mi.name AS item_name,
        isz.size AS item_size,
        oi.quantity,
        oi.kitchen_status
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN menu_items mi ON oi.item_id = mi.id
    LEFT JOIN item_sizes isz ON oi.size_id = isz.id
    WHERE o.status != 'cancelled' -- optional: exclude cancelled
    ORDER BY o.created_at ASC, o.id, oi.id;
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
        console.error('Database error:', err.message);
        return res.status(500).json({ error: 'Internal server error' });
    }

    const ordersMap = {};
    rows.forEach(row => {
      if (!ordersMap[row.order_id]) {
          ordersMap[row.order_id] = {
              order_id: row.order_id,
              created_at: row.created_at,
              items: []
          };
      }
      ordersMap[row.order_id].items.push({
          item_name: row.item_name,
          item_size: row.item_size,
          quantity: row.quantity,
          kitchen_status: row.kitchen_status
      });
    });

    const result = Object.values(ordersMap);
    res.json({ data: result, status: 'success', statusCode: 200 });

  });

});

module.exports = router;




// app.get('/api/kitchen-dashboard', (req, res) => {
//     const query = `
//         SELECT
//             o.id AS order_id,
//             o.created_at,
//             mi.name AS item_name,
//             isz.size AS item_size,
//             oi.quantity,
//             oi.kitchen_status
//         FROM orders o
//         JOIN order_items oi ON o.id = oi.order_id
//         JOIN menu_items mi ON oi.item_id = mi.id
//         LEFT JOIN item_sizes isz ON oi.size_id = isz.id
//         WHERE o.status != 'cancelled' -- optional: exclude cancelled
//         ORDER BY o.created_at ASC, o.id, oi.id;
//     `;

//     db.all(query, [], (err, rows) => {
//         if (err) {
//             console.error('Database error:', err.message);
//             return res.status(500).json({ error: 'Internal server error' });
//         }

//         const ordersMap = {};

//         rows.forEach(row => {
//             if (!ordersMap[row.order_id]) {
//                 ordersMap[row.order_id] = {
//                     order_id: row.order_id,
//                     created_at: row.created_at,
//                     items: []
//                 };
//             }

//             ordersMap[row.order_id].items.push({
//                 item_name: row.item_name,
//                 item_size: row.item_size,
//                 quantity: row.quantity,
//                 kitchen_status: row.kitchen_status
//             });
//         });

//         res.json(Object.values(ordersMap));
//     });
// });
