-- PL/SQL Functions & Procedures for Mess Management System

-- 1. Calculate Monthly Bill for a Student
define meal_cost = 35;
CREATE OR REPLACE PROCEDURE calculate_monthly_bill(
  p_student_id IN NUMBER,
  p_month IN VARCHAR2
) IS
  v_meal_count NUMBER;
  v_total_amount NUMBER;
BEGIN
  SELECT COUNT(*)
  INTO v_meal_count
  FROM meals_taken
  WHERE student_id = p_student_id
    AND TO_CHAR(meal_date, 'YYYY-MM') = p_month;

  v_total_amount := v_meal_count * &meal_cost;

  INSERT INTO monthly_bill(student_id, month, total_meals, cost_per_meal, total_amount, is_paid)
  VALUES (p_student_id, p_month, v_meal_count, &meal_cost, v_total_amount, 'N');

  COMMIT;
END;
/

-- 2. Approve Leave Request
CREATE OR REPLACE PROCEDURE approve_leave(
  p_leave_id IN NUMBER
) IS
BEGIN
  UPDATE leave_requests
  SET status = 'Approved'
  WHERE leave_id = p_leave_id;
  COMMIT;
END;
/

-- 3. Mark Attendance
CREATE OR REPLACE PROCEDURE mark_attendance(
  p_staff_id IN NUMBER,
  p_date_day IN DATE,
  p_present IN CHAR
) IS
BEGIN
  INSERT INTO attendance(staff_id, date_day, is_present)
  VALUES (p_staff_id, p_date_day, p_present);
  COMMIT;
END;
/

-- 4. Submit Feedback
CREATE OR REPLACE PROCEDURE submit_feedback(
  p_student_id IN NUMBER,
  p_meal_date IN DATE,
  p_meal_type_id IN NUMBER,
  p_rating IN NUMBER,
  p_feed_text IN VARCHAR2
) IS
BEGIN
  INSERT INTO food_feedback(student_id, meal_date, meal_type_id, rating, feed_text)
  VALUES (p_student_id, p_meal_date, p_meal_type_id, p_rating, p_feed_text);
  COMMIT;
END;
/

-- 5. Create Stock Order
CREATE OR REPLACE PROCEDURE create_stock_order(
  p_item_id IN NUMBER,
  p_supplier_id IN NUMBER,
  p_quantity IN NUMBER
) IS
BEGIN
  INSERT INTO stock_orders(item_id, supplier_id, order_date, quantity_ordered, status)
  VALUES (p_item_id, p_supplier_id, SYSDATE, p_quantity, 'Pending');
  COMMIT;
END;
/

-- 6. Record Stock Usage
CREATE OR REPLACE PROCEDURE use_stock(
  p_item_id IN NUMBER,
  p_quantity_used IN NUMBER
) IS
BEGIN
  INSERT INTO stock_usage(item_id, used_on, quantity_used)
  VALUES (p_item_id, SYSDATE, p_quantity_used);

  UPDATE stock_items
  SET quantity_available = quantity_available - p_quantity_used
  WHERE item_id = p_item_id;
  COMMIT;
END;
/

-- 7. Pay Monthly Bill
CREATE OR REPLACE PROCEDURE pay_bill(
  p_bill_id IN NUMBER,
  p_amount IN NUMBER,
  p_method IN VARCHAR2
) IS
BEGIN
  INSERT INTO payments(bill_id, payment_date, amount_paid, payment_method)
  VALUES (p_bill_id, SYSDATE, p_amount, p_method);

  UPDATE monthly_bill
  SET is_paid = 'Y'
  WHERE bill_id = p_bill_id;
  COMMIT;
END;
/

-- 8. Get Student Balance (returns unpaid bills)
CREATE OR REPLACE FUNCTION get_student_balance(
  p_student_id IN NUMBER
) RETURN NUMBER IS
  v_balance NUMBER;
BEGIN
  SELECT SUM(total_amount)
  INTO v_balance
  FROM monthly_bill
  WHERE student_id = p_student_id
    AND is_paid = 'N';

  RETURN NVL(v_balance, 0);
END;
/

-- 9. Check Meal Attendance for Student on a Day
CREATE OR REPLACE FUNCTION has_taken_meal(
  p_student_id IN NUMBER,
  p_date IN DATE,
  p_meal_type IN VARCHAR2
) RETURN CHAR IS
  v_count NUMBER;
BEGIN
  SELECT COUNT(*)
  INTO v_count
  FROM meals_taken mt
  JOIN meal_types mtp ON mt.meal_type_id = mtp.meal_type_id
  WHERE mt.student_id = p_student_id
    AND mt.meal_date = p_date
    AND mtp.name = p_meal_type;

  IF v_count > 0 THEN
    RETURN 'Y';
  ELSE
    RETURN 'N';
  END IF;
END;
/


-- More can be added for auto-generate menu, notify students, etc.
