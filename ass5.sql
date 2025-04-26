-- Assignment 5

--1
create table dept(
deptno Number primary key,
dept_name varchar2(5) constraint dept_name_check check( dept_name in ('Acc', 'comp', 'elect'))
);

drop table dept;

--2
create table emp(
empno number primary key,
emp_name varchar2(100) constraint emp_name_unique unique,
job varchar2(10) constraint job_check check (job in ('Prof', 'AP', 'Lect')),
sal Number constraint sal_null NOT Null,
deptno Number,
mgr_no Number,
Constraint dept_foreign FOREIGN key (deptno) references dept(deptno),
constraint mgr_foreign foreign key (mgr_no) references emp(empno)
)

--3
create table S(
sno number primary key,
sname varchar2(100),
city varchar2(100)
)

--4
create table p(
pno number primary key,
pname varchar2 (100),
color varchar2(50)
)

--5
create table j(
jno number primary key,
jname varchar2 (100),
city varchar2 (100)
)

--6
create table spj(
sno number,
pno number,
jno number,
qty number,
Constraint p_key primary key(sno, pno, jno),
Constraint s_f foreign key(sno) references s(sno),
constraint p_f foreign key(pno) references p(pno),
constraint j_f foreign key(jno) references j(jno)
)

--7
-- Insert into DEPT
INSERT INTO dept (deptno, dept_name) VALUES (10, 'Acc');
INSERT INTO dept (deptno, dept_name) VALUES (20, 'comp');
INSERT INTO dept (deptno, dept_name) VALUES (30, 'elect');
INSERT INTO dept (deptno, dept_name) VALUES (40, 'Acc');
INSERT INTO dept (deptno, dept_name) VALUES (50, 'comp');

Delete from dept;

select * from dept;
-- Insert into EMP
INSERT INTO emp (empno, emp_name, job, sal, deptno, mgr_no) VALUES (1001, 'Alice', 'Prof', 70000, 10, NULL);
INSERT INTO emp (empno, emp_name, job, sal, deptno, mgr_no) VALUES (1002, 'Bob', 'AP', 50000, 20, 1001);
INSERT INTO emp (empno, emp_name, job, sal, deptno, mgr_no) VALUES (1003, 'Charlie', 'Lect', 40000, 30, 1002);
INSERT INTO emp (empno, emp_name, job, sal, deptno, mgr_no) VALUES (1004, 'Diana', 'Prof', 75000, 20, NULL);
INSERT INTO emp (empno, emp_name, job, sal, deptno, mgr_no) VALUES (1005, 'Evan', 'Lect', 42000, 10, 1001);

-- Insert into S
INSERT INTO s (sno, sname, city) VALUES (1, 'John', 'New York');
INSERT INTO s (sno, sname, city) VALUES (2, 'Sarah', 'Chicago');
INSERT INTO s (sno, sname, city) VALUES (3, 'Mike', 'Los Angeles');
INSERT INTO s (sno, sname, city) VALUES (4, 'Emma', 'Houston');
INSERT INTO s (sno, sname, city) VALUES (5, 'Tom', 'Phoenix');

-- Insert into P
INSERT INTO p (pno, pname, color) VALUES (101, 'Bolt', 'Red');
INSERT INTO p (pno, pname, color) VALUES (102, 'Nut', 'Blue');
INSERT INTO p (pno, pname, color) VALUES (103, 'Screw', 'Green');
INSERT INTO p (pno, pname, color) VALUES (104, 'Wheel', 'Black');
INSERT INTO p (pno, pname, color) VALUES (105, 'Gear', 'Silver');

-- Insert into J
INSERT INTO j (jno, jname, city) VALUES (201, 'Alpha', 'New York');
INSERT INTO j (jno, jname, city) VALUES (202, 'Beta', 'Chicago');
INSERT INTO j (jno, jname, city) VALUES (203, 'Gamma', 'Los Angeles');
INSERT INTO j (jno, jname, city) VALUES (204, 'Delta', 'Houston');
INSERT INTO j (jno, jname, city) VALUES (205, 'Epsilon', 'Phoenix');

-- Insert into SPJ
INSERT INTO spj (sno, pno, jno, qty) VALUES (1, 101, 201, 50);
INSERT INTO spj (sno, pno, jno, qty) VALUES (2, 102, 202, 30);
INSERT INTO spj (sno, pno, jno, qty) VALUES (3, 103, 203, 70);
INSERT INTO spj (sno, pno, jno, qty) VALUES (4, 104, 204, 60);
INSERT INTO spj (sno, pno, jno, qty) VALUES (5, 105, 205, 40);

Desc emp;

--8
Alter table emp
drop constraint sal_null;

--9
Select * from user_constraints;
select * from user_cons_columns;

--10
Alter table emp
drop constraint emp_name_unique;

--11
Alter table emp
drop constraint dept_foreign;

Alter table emp
drop constraint mgr_foreign;

--12
Alter table emp
Add constraint
dept_foreign foreign key(deptno) references dept(deptno);

Alter table emp
Add constraint
mgr_foreign foreign key(mgr_no) references emp(empno) on delete cascade;
--13
Alter table dept
drop constraint dept_name_check;

--14
Alter table emp
add COMM Number DEFAULT 0;

--15
Alter table emp
modify Comm default null;

--16
Create table emp_copy as
Select * from emp where 1 = 0;

Desc emp_copy;

--17 --18
--we know

--19
Update emp
set emp_name = 'Parth', job = 'AP'
where empno = 1001;

--20
Delete from emp e where e.deptno in (
Select deptno from dept d where d.dept_name = 'comp');

Delete from emp e
where exists (
select 1 from dept d 
where d.deptno = e.deptno 
AND dept_name = 'comp');

--23
