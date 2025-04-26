import express from 'express';
import oracledb from 'oracledb';

import getConnection from '../config/db.js';

const router = express.Router();

// Get all students
router.get('/', async (req, res) => {
  try {
    console.log("here")
    const connection = await getConnection();
    const result = await connection.execute('SELECT * FROM students');
    await connection.close();
    console.log(result.rows)
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get single student by ID
router.get('/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    const connection = await getConnection();
    const result = await connection.execute(
      'SELECT * FROM students WHERE student_id = :id',
      { id: studentId }
    );
    await connection.close();
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new student
router.post('/', async (req, res) => {
  const { name, roll_no, room_no, hostel_name } = req.body;
  console.log(req.body)
  try {
    const connection = await getConnection();
    await connection.execute(
      `INSERT INTO students (name, roll_no, room_no, hostel_name)
       VALUES (:name, :roll_no, :room_no, :hostel_name)`,
      { name, roll_no, room_no, hostel_name },
      { autoCommit: true }
    );
    await connection.close();
    res.status(201).json({ message: 'Student created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update student
router.put('/:id', async (req, res) => {
  const { name, roll_no, room_no, hostel_name } = req.body;
  const studentId = req.params.id;
  try {
    const connection = await getConnection();
    await connection.execute(
      `UPDATE students
       SET name = :name, roll_no = :roll_no, room_no = :room_no, hostel_name = :hostel_name
       WHERE student_id = :id`,
      { name, roll_no, room_no, hostel_name, id: studentId },
      { autoCommit: true }
    );
    await connection.close();
    res.json({ message: 'Student updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete student
router.delete('/:id', async (req, res) => {
  const studentId = req.params.id;
  try {
    const connection = await getConnection();
    await connection.execute(
      'DELETE FROM students WHERE student_id = :id',
      { id: studentId },
      { autoCommit: true }
    );
    await connection.close();
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
