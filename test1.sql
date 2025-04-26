Create table EMP(
EmpNo Number primary key,
Ename Varchar2(100) UNIQUE,
Job varchar2(50),
Salary Number,
Commission Number,
DeptNO Number(4))

Insert into EMP values (1, 'Parth', 'Engineer', 50000, 10000, 101);

Insert into EMP values (7, 'Ishaaa', 'Analyst', 80000, 10000, 104);
Insert into EMP values (8, 'fagah', 'Engineer', 47000, 10000, 105);
Insert into EMP values (9, 'fagAh', 'Manager', 30000, 10000, 105);
Insert all
into emp VALUES (2, 'Anaya', 'Manager', 75000, NULL, 102)
into emp VALUES (3, 'Ravi', 'Developer', 60000, 5000, 101)
into emp VALUES (4, 'Simran', 'Analyst', 55000, NULL, 103)
into emp VALUES (5, 'Arjun', 'Technician', 40000, 2000, 104)
into emp VALUES (6, 'Isha', 'Clerk', 32000, NULL, 101)
Select * from dual;

Select * from emp;

--1
Select empno, ename from emp where deptno = 101;

--2
Select ename from emp where salary > 50000 AND job = 'Manager';

--3
Select ename, job from emp where job in ('Developer', 'Engineer');

--4
Select * from emp where salary between 40000 and 70000;

--5
Select * from emp where deptno in (102, 103);

--6
Select ename from emp where commission IS NULL;

--7
Select deptno, salary from emp order by deptno asc, salary desc;

--8
Select ename from emp where length(ename) - length(Replace(lower(ename), 'a', '')) >= 2;

--9
Select ename from emp where lower(ename) like '_b%';
Drop table emp;

--10
Select ename from emp where Lower(ename) like 'a%'
                        OR Lower(ename) like '%a';
                        
--11
Select max(salary) as max_sal, min(salary) as min_sal, AVG(salary) as avg_sal
from emp where deptno = 101;

--12
Select count(*) from emp where deptno = 105;

--13
select sum(salary) from emp where job = 'Manager';

--14
Select sysdate from dual;

--15
Select (12*12)/13 from dual;

--16
Select * from emp where ename = 'Parth';

Describe emp;

Drop table emp;


-- Assignment 