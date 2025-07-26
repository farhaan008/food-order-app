const express = require('express')
const router = express.Router()
const db = require('../db/database')

router.get('/', (req, res) => {
  const query = `
    SELECT m.id AS item_id, m.name AS item_name, m.description, m.price, m.available, c.id AS category_id, c.name AS category_name
    FROM menu_items m
    LEFT JOIN categories c ON m.category_id = c.id
    ORDER BY c.name, m.name;`;
    
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Query error:', err.message);
      return res.status(500).json({ error: 'Database query failed' });
    }
    // Optional: group by category in the response
    const menu = {};
    rows.forEach(row => {
      const category = row.category_name || 'Others';
      if (!menu[category]) menu[category] = [];
      menu[category].push({
        id: row.item_id,
        name: row.item_name,
        description: row.description,
        price: row.price,
        available: !!row.available
      });
    });
    res.json(menu);
  });
  // db.all(`SELECT * FROM menu_items`, [], (err, rows) => {
  //   if (err) return res.status(500).json({ error: 'Menu fetch error' })
  //   console.log('Menu items fetched successfully:', rows)
  //   res.json(rows)
  // })
})

router.post('/', (req, res) => {
  const { name, description, price } = req.body
  db.run(`INSERT INTO menu_items (name, description, price) VALUES (?, ?, ?)`, [name, description, price], function (err) {
    if (err) return res.status(500).json({ error: 'Insert error' })
    res.json({ item_id: this.lastID })
  })
})

module.exports = router

// app.get('/menu', (req, res) => {
//   db.all(`SELECT * FROM menu_items WHERE available = 1`, [], (err, rows) => {
//     if (err) return res.status(500).send("Menu fetch error");
//     res.json(rows);
//   });
// });

// app.post('/menu', (req, res) => {
//   const { name, price, description } = req.body;
//   db.run(`INSERT INTO menu_items (name, description, price) VALUES (?, ?, ?)`, [name, description, price], function(err) {
//     if (err) return res.status(500).send("Menu insert error");
//     res.json({ item_id: this.lastID });
//   });
// });
