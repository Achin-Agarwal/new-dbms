import express from 'express';
import oracledb from 'oracledb';

import getConnection from '../config/db.js';

const router = express.Router();

// Get all staff members
router.get('/', async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('SELECT * FROM staff');
    await connection.close();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark attendance (calls PL/SQL proc mark_attendance)
router.post('/attendance', async (req, res) => {
  const { staff_id } = req.body;
  try {
    const connection = await getConnection();
    await connection.execute(
      `BEGIN
         mark_attendance(:staff_id);
       END;`,
      { staff_id }
    );
    await connection.commit();
    await connection.close();
    res.json({ message: 'Attendance marked.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get attendance by staff ID
router.get('/attendance/:staffId', async (req, res) => {
  const { staffId } = req.params;
  try {
    const connection = await getConnection();
    const result = await connection.execute(
      'SELECT * FROM attendance WHERE staff_id = :staffId',
      { staffId }
    );
    await connection.close();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
