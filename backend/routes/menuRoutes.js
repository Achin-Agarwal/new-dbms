import express from 'express';
import oracledb from 'oracledb';

import getConnection from '../config/db.js';

const router = express.Router();

// /api/menu/:date/:type
router.get('/:date/:type', async (req, res) => {
  const { date, type } = req.params;
  try {
    const connection = await getConnection();

    const result = await connection.execute(
      `SELECT mm.menu_id, TO_CHAR(mm.meal_date, 'YYYY-MM-DD') AS meal_date, mt.name AS meal_type, mi.item_name
       FROM mess_menu mm
       JOIN meal_types mt ON mm.meal_type_id = mt.meal_type_id
       LEFT JOIN menu_items mi ON mm.menu_id = mi.menu_id
       WHERE mm.meal_date = TO_DATE(:date, 'YYYY-MM-DD') AND mt.name = :type`,
      { date, type }
    );

    await connection.close();

    // Group items by menu_id
    const grouped = {};
    result.rows.forEach(row => {
      const key = `${row.MENU_ID}`;
      if (!grouped[key]) {
        grouped[key] = {
          menu_id: row.MENU_ID,
          meal_date: row.MEAL_DATE,
          meal_type: row.MEAL_TYPE,
          items: [],
        };
      }
      if (row.ITEM_NAME) grouped[key].items.push(row.ITEM_NAME);
    });

    res.json(Object.values(grouped));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// /api/menu/:date
router.get('/:date', async (req, res) => {
  const { date } = req.params;
  try {
    const connection = await getConnection();

    const result = await connection.execute(
      `SELECT mm.menu_id, TO_CHAR(mm.meal_date, 'YYYY-MM-DD') AS meal_date, mt.name AS meal_type, mi.item_name
       FROM mess_menu mm
       JOIN meal_types mt ON mm.meal_type_id = mt.meal_type_id
       LEFT JOIN menu_items mi ON mm.menu_id = mi.menu_id
       WHERE mm.meal_date = TO_DATE(:date, 'YYYY-MM-DD')`,
      { date }
    );

    await connection.close();

    // Group by menu_id
    const grouped = {};
    result.rows.forEach(row => {
      const key = `${row.MENU_ID}`;
      if (!grouped[key]) {
        grouped[key] = {
          menu_id: row.MENU_ID,
          meal_date: row.MEAL_DATE,
          meal_type: row.MEAL_TYPE,
          items: [],
        };
      }
      if (row.ITEM_NAME) grouped[key].items.push(row.ITEM_NAME);
    });

    res.json(Object.values(grouped));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// /api/menu
router.get('/', async (req, res) => {
  try {
    const connection = await getConnection();

    const result = await connection.execute(
      `SELECT mm.menu_id, TO_CHAR(mm.meal_date, 'YYYY-MM-DD') AS meal_date, mt.name AS meal_type, mi.item_name
       FROM mess_menu mm
       JOIN meal_types mt ON mm.meal_type_id = mt.meal_type_id
       LEFT JOIN menu_items mi ON mm.menu_id = mi.menu_id
       ORDER BY mm.meal_date DESC`
    );

    await connection.close();

    const grouped = {};
    result.rows.forEach(row => {
      const key = `${row.MENU_ID}`;
      if (!grouped[key]) {
        grouped[key] = {
          menu_id: row.MENU_ID,
          meal_date: row.MEAL_DATE,
          meal_type: row.MEAL_TYPE,
          items: [],
        };
      }
      if (row.ITEM_NAME) grouped[key].items.push(row.ITEM_NAME);
    });

    res.json(Object.values(grouped));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
