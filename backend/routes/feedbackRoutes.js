import express from 'express';
import oracledb from 'oracledb';

import getConnection from '../config/db.js';

const router = express.Router();

// Submit feedback (calls PL/SQL proc submit_feedback)
router.post('/', async (req, res) => {
  const { student_id, feedback_text } = req.body;
  try {
    const connection = await getConnection();
    await connection.execute(
      `BEGIN
         submit_feedback(:student_id, :feedback_text);
       END;`,
      { student_id, feedback_text }
    );
    await connection.commit();
    await connection.close();
    res.json({ message: 'Feedback submitted.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all feedback
router.get('/', async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('SELECT * FROM feedback');
    await connection.close();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get feedback by student
router.get('/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    const connection = await getConnection();
    const result = await connection.execute(
      'SELECT * FROM feedback WHERE student_id = :studentId',
      { studentId }
    );
    await connection.close();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
