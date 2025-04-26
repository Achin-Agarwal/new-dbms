
INSERT INTO students (name, roll_no, room_no, hostel_name) VALUES
('Alice Johnson', 'BTECH001', 'A101', 'Aryabhatt'),
('Bob Smith', 'BTECH002', 'B202', 'Raman'),
('Charlie Lee', 'BTECH003', 'C303', 'Bose'),
('Diana Prince', 'BTECH004', 'D404', 'Curie'),
('Ethan Ray', 'BTECH005', 'E505', 'Newton');


INSERT INTO meal_types (name) VALUES
('Breakfast'), ('Lunch'), ('Dinner');


INSERT INTO mess_menu (meal_date, meal_type_id) VALUES
(TO_DATE('2025-04-10', 'YYYY-MM-DD'), 1),
(TO_DATE('2025-04-10', 'YYYY-MM-DD'), 2),
(TO_DATE('2025-04-10', 'YYYY-MM-DD'), 3);


INSERT INTO menu_items (menu_id, item_name) VALUES
(1, 'Idli'), (1, 'Sambar'),
(2, 'Rice'), (2, 'Dal'),
(3, 'Chapati'), (3, 'Paneer Curry');


INSERT INTO meals_taken (student_id, meal_date, meal_type_id) VALUES
(1, TO_DATE('2025-04-10', 'YYYY-MM-DD'), 1),
(1, TO_DATE('2025-04-10', 'YYYY-MM-DD'), 2),
(2, TO_DATE('2025-04-10', 'YYYY-MM-DD'), 2);


INSERT INTO monthly_bill (student_id, month, total_meals, cost_per_meal, total_amount) VALUES
(1, '2025-04', 60, 30.00, 1800.00),
(2, '2025-04', 55, 30.00, 1650.00);

-- 7. Payments

INSERT INTO payments (bill_id, amount_paid, payment_method) VALUES
(1, 1800.00, 'online');


INSERT INTO food_feedback (student_id, meal_date, meal_type_id, rating, comment) VALUES
(1, TO_DATE('2025-04-10', 'YYYY-MM-DD'), 2, 4, 'Tasty and fresh.'),
(2, TO_DATE('2025-04-10', 'YYYY-MM-DD'), 1, 3, 'Could be hotter.');

INSERT INTO leave_requests (student_id, from_date, to_date, reason) VALUES
(3, TO_DATE('2025-04-12', 'YYYY-MM-DD'), TO_DATE('2025-04-15', 'YYYY-MM-DD'), 'Out of town');


INSERT INTO mess_staff (name, role, contact) VALUES
('Ravi Kumar', 'Cook', '9876543210'),
('Sunita Devi', 'Cleaner', '9876543211');


INSERT INTO attendance (staff_id, date, is_present) VALUES
(1, TO_DATE('2025-04-10', 'YYYY-MM-DD'), 'Y'),
(2, TO_DATE('2025-04-10', 'YYYY-MM-DD'), 'N');

INSERT INTO stock_items (name, unit, quantity_available) VALUES
('Rice', 'kg', 200),
('Dal', 'kg', 100),
('Oil', 'litre', 50);

INSERT INTO suppliers (name, contact, address) VALUES
('Agro Supplies Co.', '9123456789', '12 Market Street'),
('DailyFresh Traders', '9234567890', '23 Bazaar Road');

INSERT INTO stock_orders (item_id, supplier_id, order_date, quantity_ordered, status) VALUES
(1, 1, TO_DATE('2025-04-11', 'YYYY-MM-DD'), 100, 'Delivered'),
(2, 2, TO_DATE('2025-04-11', 'YYYY-MM-DD'), 50, 'Pending');
