import express from 'express';
import oracledb from 'oracledb';

import getConnection from '../config/db.js';

const router = express.Router();

// Get all meals taken
router.get('/', async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('SELECT * FROM meals_taken');
    await connection.close();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Check if student took a specific meal on a day
router.get('/:studentId/date/:date/type/:mealType', async (req, res) => {
  const { studentId, date, mealType } = req.params;
  try {
    const connection = await getConnection();
    const result = await connection.execute(
      `BEGIN
         :result := has_taken_meal(:student_id, TO_DATE(:meal_date, 'YYYY-MM-DD'), :meal_type);
       END;`,
      {
        result: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        student_id: studentId,
        meal_date: date,
        meal_type: mealType
      }
    );
    await connection.close();
    res.json({ taken: result.outBinds.result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get meals for a student
router.get('/:studentId', async (req, res) => {
  const studentId = req.params.studentId;
  try {
    const connection = await getConnection();
    const result = await connection.execute(
      'SELECT * FROM meals_taken WHERE student_id = :id',
      { id: studentId }
    );
    await connection.close();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Record a new meal
router.post('/', async (req, res) => {
  const { student_id, meal_date, meal_type } = req.body;
  try {
    const connection = await getConnection();
    await connection.execute(
      `INSERT INTO meals_taken (student_id, meal_date, meal_type)
       VALUES (:student_id, TO_DATE(:meal_date, 'YYYY-MM-DD'), :meal_type)`,
      { student_id, meal_date, meal_type },
      { autoCommit: true }
    );
    await connection.close();
    res.status(201).json({ message: 'Meal recorded' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
