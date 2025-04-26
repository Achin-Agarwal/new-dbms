Create table SalesPeople(
Snum Number Primary Key,
Sname varchar2(100) constraint uni_name unique,
city varchar2(100),
Comm Number);

Drop table Salespeople;

Create table Customers(
Cnum Number primary key,
Cname varchar2(100),
City varchar2(100) constraint city_null Not Null,
Snum Number,
Constraint for_num foreign key(snum) references salespeople(snum) on delete set null
);

Drop table customers;

Create table orders(
Onum Number Primary key,
Amt Number,
Odate Date,
Cnum Number,
Snum Number,
Constraint for_cnum foreign key(cnum) references customers(cnum) on delete set null,
Constraint for_snum foreign key(snum) references salespeople(snum) on delete set null
);

Drop table orders;

INSERT INTO SalesPeople (Snum, Sname, City, Comm) VALUES (1001, 'Peel', 'London', 0.12);
INSERT INTO SalesPeople (Snum, Sname, City, Comm) VALUES (1002, 'Serres', 'Sanjose', 0.13);
INSERT INTO SalesPeople (Snum, Sname, City, Comm) VALUES (1004, 'Motika', 'London', 0.11);
INSERT INTO SalesPeople (Snum, Sname, City, Comm) VALUES (1007, 'Rifkin', 'Barcelona', 0.15);
INSERT INTO SalesPeople (Snum, Sname, City, Comm) VALUES (1003, 'Axelrod', 'New York', 0.10);
INSERT INTO SalesPeople (Snum, Sname, City, Comm) VALUES (10010, 'Parth', 'Kanpur', 0.9);

INSERT INTO Customers (Cnum, Cname, City, Snum) VALUES (2001, 'Hoffman', 'London', 1001);
INSERT INTO Customers (Cnum, Cname, City, Snum) VALUES (2002, 'Giovanni', 'Rome', 1003);
INSERT INTO Customers (Cnum, Cname, City, Snum) VALUES (2003, 'Liu', 'Sanjose', 1002);
INSERT INTO Customers (Cnum, Cname, City, Snum) VALUES (2004, 'Grass', 'Berlin', 1002);
INSERT INTO Customers (Cnum, Cname, City, Snum) VALUES (2006, 'Clemens', 'London', 1001);
INSERT INTO Customers (Cnum, Cname, City, Snum) VALUES (2008, 'Cisneros', 'Sanjose', 1007);
INSERT INTO Customers (Cnum, Cname, City, Snum) VALUES (2007, 'Pereira', 'Rome', 1004);

INSERT INTO Orders (Onum, Amt, Odate, Cnum, Snum) VALUES (3001, 18.69, TO_DATE('3-10-1990', 'DD-MM-YYYY'), 2008, 1007);
INSERT INTO Orders (Onum, Amt, Odate, Cnum, Snum) VALUES (3003, 767.19, TO_DATE('3-10-1990', 'DD-MM-YYYY'), 2001, 1001);
INSERT INTO Orders (Onum, Amt, Odate, Cnum, Snum) VALUES (3002, 1900.10, TO_DATE('3-10-1990', 'DD-MM-YYYY'), 2007, 1004);
INSERT INTO Orders (Onum, Amt, Odate, Cnum, Snum) VALUES (3005, 5160.45, TO_DATE('3-10-1990', 'DD-MM-YYYY'), 2003, 1002);
INSERT INTO Orders (Onum, Amt, Odate, Cnum, Snum) VALUES (3006, 1098.16, TO_DATE('3-10-1990', 'DD-MM-YYYY'), 2008, 1007);
INSERT INTO Orders (Onum, Amt, Odate, Cnum, Snum) VALUES (3009, 1713.23, TO_DATE('4-10-1990', 'DD-MM-YYYY'), 2002, 1003);
INSERT INTO Orders (Onum, Amt, Odate, Cnum, Snum) VALUES (3007, 75.75, TO_DATE('4-10-1990', 'DD-MM-YYYY'), 2004, 1002);
INSERT INTO Orders (Onum, Amt, Odate, Cnum, Snum) VALUES (3008, 4273.00, TO_DATE('5-10-1990', 'DD-MM-YYYY'), 2006, 1001);
INSERT INTO Orders (Onum, Amt, Odate, Cnum, Snum) VALUES (3010, 1309.95, TO_DATE('6-10-1990', 'DD-MM-YYYY'), 2004, 1002);
INSERT INTO Orders (Onum, Amt, Odate, Cnum, Snum) VALUES (3011, 9891.88, TO_DATE('6-10-1990', 'DD-MM-YYYY'), 2006, 1001);

--2
Select s.sname, o.snum, sum(o.Amt) as tot from orders o join
salespeople s on o.snum = s.snum
group by o.snum, s.sname
having sum(o.amt) > 2000;

--3
Select snum, count(*) from customers
group by snum
having count(*) >= 2;

--4
Select c.snum, s.sname from customers c
join salespeople s on s.snum = c.snum
group by c.snum, s.sname
having count(*) >=2;

Select sname from salespeople
where snum in (
                Select snum from customers
                group by snum
                having count(8) >=2
                );

--5
Select city, count(*) from salespeople
where city in ('London', 'Paris')
group by city;

--6
Select cname from customers 
where snum in (Select snum from salespeople where
                city in ('London', 'Paris'));
                
--7
Select cname from customers 
where cnum in (Select cnum from orders
                where amt = 1200);
                
--8
Select c.cname from customers c
where c.snum in (Select s.snum from salespeople s
                    where c.city = s.city);

--9
Select s.sname from salespeople s
where s.snum in (Select c.snum from customers c
                    group by c.snum
                    having count(*) > 2)
And s.comm > 0.10;

--10
Select c.cname, s.sname from Customers c 
Join salespeople s on c.snum = s.snum
where cnum in (select cnum from orders o
                group by cnum
                having count(*) = 1);
                
--11
Select * from salespeople where
snum not in (select snum from customers);

--12
Select odate, count(snum) from orders
group by odate;

--13
Select city, comm, count(snum) from salespeople
group by city, comm;