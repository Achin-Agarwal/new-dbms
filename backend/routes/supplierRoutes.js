import express from 'express';
import oracledb from 'oracledb';

import getConnection from '../config/db.js';

const router = express.Router();
    

// Get all suppliers
router.get('/', async (req, res) => {
    try {
      const connection = await getConnection();
      const result = await connection.execute('SELECT * FROM suppliers');
      await connection.close();
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  export default router;