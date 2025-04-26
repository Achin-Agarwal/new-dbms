import express from 'express';
import oracledb from 'oracledb';
import getConnection from '../config/db.js';

const router = express.Router();

// Generate monthly bill (calls PL/SQL proc calculate_monthly_bill)
router.post('/generate', async (req, res) => {
  const { student_id, bill_month } = req.body;
  console.log('Generating bill for student:', student_id, 'for month:', bill_month);
  try {
    const connection = await getConnection();
    await connection.execute(
      `BEGIN
         calculate_monthly_bill(:student_id, TO_DATE(:bill_month, 'YYYY-MM'));
       END;`,
      { student_id, bill_month }
    );
    await connection.commit();
    await connection.close();
    res.json({ message: 'Bill generated.' });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
});

// Get bills for a student
router.get('/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    const connection = await getConnection();
    const result = await connection.execute(
      'SELECT * FROM monthly_bill WHERE student_id = :studentId',
      { studentId } // <-- FIXED
    );
    await connection.close();
    res.json(result.rows);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
});

// Get unpaid balance (calls PL/SQL func get_student_balance)
router.get('/balance/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    const connection = await getConnection();
    const result = await connection.execute(
      'SELECT get_student_balance(:studentId) AS balance FROM dual',
      { studentId } // <-- FIXED
    );
    await connection.close();
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Pay bill (calls PL/SQL proc pay_bill)
router.post('/pay', async (req, res) => {
  const { bill_id, amount } = req.body;
  try {
    const connection = await getConnection();
    await connection.execute(
      `BEGIN
         pay_bill(:bill_id, :amount);
       END;`,
      { bill_id, amount }
    );
    await connection.commit();
    await connection.close();
    res.json({ message: 'Payment successful.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
