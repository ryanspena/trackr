const express = require('express');
const db = require('../../db/connection.js');
const cTable = require('console.table');
const router = express.Router();

router.get('/departments', (req, res) => {
  const sql = 'SELECT * FROM departments';

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    const table = cTable.getTable(rows);
    console.log(table);
    res.json({
      message: 'Success',
      data: rows,
    });
  });
});

router.post('/department', ({ body }, res) => {
  const sql = 'INSERT INTO departments (name) VALUES (?)';
  const params = [body.name];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      message: 'Success',
      data: body,
      changes: result.affectedRows,
    });
  });
});

module.exports = router;
