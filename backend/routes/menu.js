const express = require('express')
const router = express.Router()
const db = require('../db/database')

router.get('/', (_, res) => {
  // const query = `
  //   SELECT m.id AS item_id, m.name AS item_name, m.description, m.image_url, m.price, m.available, c.id AS category_id, c.name AS category_name
  //   FROM menu_items m
  //   LEFT JOIN categories c ON m.category_id = c.id
  //   ORDER BY c.name, m.name;`;
  
  const query = `SELECT
    m.id AS item_id,
    m.name AS item_name,
    m.description,
    m.image_url,
    m.available,
    c.id AS category_id,
    c.name AS category_name,
    sz.id AS size_id,
    sz.size,
    COALESCE(sz.price, m.price) AS price
  FROM menu_items m
  LEFT JOIN categories c ON m.category_id = c.id
  LEFT JOIN item_sizes sz ON sz.menu_item_id = m.id
  ORDER BY c.name, m.name, sz.size;`
    
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
        imageUrl: row.image_url,
        available: !!row.available,
        categoryId: row.category_id,
        categoryName: row.category_name,
        sizeId: row.size_id,
        size: row.size,
        price: row.price,
        // sizePrice: row.size_price
      });
    });
    const sortedMenu = {};
    Object.keys(menu).sort((a, b) => a.localeCompare(b)).forEach(category => {
        sortedMenu[category] = menu[category];
    });
    res.json({ status: 'success', data: sortedMenu, statusCode: 200 });
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
