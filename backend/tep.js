// studentRoutes

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

// mealRoutes
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

  //staffRoutes
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

  //menuRoutes

  // Get menu for a specific date and type (more specific route first)
  router.get('/:date/:type', async (req, res) => {
    const { date, type } = req.params;
    try {
      const connection = await getConnection();
      const result = await connection.execute(
        `SELECT * FROM menu WHERE menu_date = TO_DATE(:date, 'YYYY-MM-DD') AND meal_type = :type`,
        { date, type }
      );
      await connection.close();
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Get menu for a specific date
  router.get('/:date', async (req, res) => {
    const { date } = req.params;
    try {
      const connection = await getConnection();
      const result = await connection.execute(
        `SELECT * FROM menu WHERE menu_date = TO_DATE(:date, 'YYYY-MM-DD')`,
        { date }
      );
      await connection.close();
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Get all menu entries
  router.get('/', async (req, res) => {
    try {
      const connection = await getConnection();
      const result = await connection.execute('SELECT * FROM menu');
      await connection.close();
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// feedbackRoutes

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

//leaveRoutes
// Submit leave request
router.post("/", async (req, res) => {
  const { student_id, start_date, end_date, reason } = req.body;
  try {
    const connection = await getConnection();
    await connection.execute(
      `INSERT INTO leave_requests (student_id, start_date, end_date, reason, status)
         VALUES (:student_id, TO_DATE(:start_date, 'YYYY-MM-DD'), TO_DATE(:end_date, 'YYYY-MM-DD'), :reason, 'PENDING')`,
      { student_id, start_date, end_date, reason }
    );
    await connection.commit();
    await connection.close();
    res.json({ message: "Leave request submitted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Approve leave (calls PL/SQL proc approve_leave)
router.put("/:id/approve", async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await getConnection();
    await connection.execute(
      `BEGIN
           approve_leave(:id);
         END;`,
      { id }
    );
    await connection.commit();
    await connection.close();
    res.json({ message: "Leave approved." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all leave requests
router.get("/", async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute("SELECT * FROM leave_requests");
    await connection.close();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get leave requests by student
router.get("/:studentId", async (req, res) => {
  const { studentId } = req.params;
  try {
    const connection = await getConnection();
    const result = await connection.execute(
      "SELECT * FROM leave_requests WHERE student_id = :studentId",
      { studentId }
    );
    await connection.close();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//stockRoutes
// Get all stock items
router.get('/', async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('SELECT * FROM stock');
    await connection.close();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all stock orders
router.get('/orders', async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('SELECT * FROM stock_orders');
    await connection.close();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get stock item by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await getConnection();
    const result = await connection.execute(
      'SELECT * FROM stock WHERE stock_id = :id',
      { id }
    );
    await connection.close();
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Use stock (call PL/SQL proc use_stock)
router.post('/usage', async (req, res) => {
  const { stock_id, quantity } = req.body;
  try {
    const connection = await getConnection();
    await connection.execute(
      `BEGIN
         use_stock(:stock_id, :quantity);
       END;`,
      { stock_id, quantity }
    );
    await connection.commit();
    await connection.close();
    res.json({ message: 'Stock usage recorded.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a stock order (call PL/SQL proc create_stock_order)
router.post('/order', async (req, res) => {
  const { stock_id, supplier_id, quantity } = req.body;
  try {
    const connection = await getConnection();
    await connection.execute(
      `BEGIN
         create_stock_order(:stock_id, :supplier_id, :quantity);
       END;`,
      { stock_id, supplier_id, quantity }
    );
    await connection.commit();
    await connection.close();
    res.json({ message: 'Stock order placed.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//billingRoutes
// Generate monthly bill (calls PL/SQL proc calculate_monthly_bill)
router.post('/generate', async (req, res) => {
  const { student_id, bill_month } = req.body;
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
    res.status(500).json({ error: err.message });
  }
});

// Get bills for a student
router.get('/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    const connection = await getConnection();
    const result = await connection.execute(
      'SELECT * FROM billing WHERE student_id = :studentId',
      { studentId } // <-- FIXED
    );
    await connection.close();
    res.json(result.rows);
  } catch (err) {
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

