drop table dept;
drop table emp;

create table dept(
deptno Number primary key,
deptname varchar2(100)
);

create table emp(
empno number primary key,
empname varchar2(100) constraint emp_name_unique unique,
job varchar2(100),
salary Number constraint sal_null NOT Null,
deptno Number,
Constraint dept_foreign FOREIGN key (deptno) references dept(deptno)
);

INSERT INTO DEPT (DEPTNO, DEPTNAME) VALUES (10, 'Accounting');
INSERT INTO DEPT (DEPTNO, DEPTNAME) VALUES (20, 'Research');
INSERT INTO DEPT (DEPTNO, DEPTNAME) VALUES (30, 'Sales');
INSERT INTO DEPT (DEPTNO, DEPTNAME) VALUES (40, 'Operations');
INSERT INTO DEPT (DEPTNO, DEPTNAME) VALUES (50, 'IT');
INSERT INTO DEPT (DEPTNO, DEPTNAME) VALUES (60, 'me');

INSERT INTO EMP (EMPNO, EMPNAME, DEPTNO, JOB, SALARY) VALUES (1001, 'Alice', 10, 'Manager', 60000);
INSERT INTO EMP (EMPNO, EMPNAME, DEPTNO, JOB, SALARY) VALUES (1002, 'Bob', 20, 'Analyst', 50000);
INSERT INTO EMP (EMPNO, EMPNAME, DEPTNO, JOB, SALARY) VALUES (1003, 'Charlie', 30, 'Salesman', 45000);
INSERT INTO EMP (EMPNO, EMPNAME, DEPTNO, JOB, SALARY) VALUES (1004, 'Diana', 40, 'Clerk', 30000);
INSERT INTO EMP (EMPNO, EMPNAME, DEPTNO, JOB, SALARY) VALUES (1005, 'Eve', 50, 'Developer', 55000);
INSERT INTO EMP (EMPNO, EMPNAME, DEPTNO, JOB, SALARY) VALUES (1006, 'Frank', 10, 'Accountant', 38000);
INSERT INTO EMP (EMPNO, EMPNAME, DEPTNO, JOB, SALARY) VALUES (1007, 'Grace', 20, 'Researcher', 47000);
INSERT INTO EMP (EMPNO, EMPNAME, DEPTNO, JOB, SALARY) VALUES (1008, 'Henry', 30, 'Sales Lead', 52000);
INSERT INTO EMP (EMPNO, EMPNAME, DEPTNO, JOB, SALARY) VALUES (1009, 'Ivy', 40, 'Operations Manager', 62000);
INSERT INTO EMP (EMPNO, EMPNAME, DEPTNO, JOB, SALARY) VALUES (1010, 'Jack', 50, 'IT Specialist', 75000);
INSERT INTO EMP (EMPNO, EMPNAME, DEPTNO, JOB, SALARY) VALUES (1011, 'someone', null, 'dunno', 6900);
--2
Select count(*) from emp;

--3
Select count(*) from dept;

--4
--5
Select e.deptno, max(salary), min(salary), sum(salary) from emp e
join dept d on d.deptno = e.deptno where e.deptno = 30 group by e.deptno;

--6
Select empname from emp
where salary = (select max(salary) from emp);

--7
select deptno, sum(salary) from emp
group by deptno;

--8
select job, sum(salary) from emp
group by job;

--9
select deptno, job, sum(salary) from emp
group by deptno, job;

--10
select deptno, job, avg(salary) from emp
where deptno = 20 group by deptno, job;

--11
Select job, sum(salary) from emp
where job not in ('manager', 'salesman')
group by job;

--12
select deptno, job, avg(salary) as avg_sal from emp
where deptno = 20
group by deptno, job
having avg(salary) > 47000
order by avg(salary) desc;

--13
select deptno, count(*) from emp
where deptno <> 10
group by deptno
having count(*) > 1
order by count(*) desc;

--14
select d.deptname, count(*) from emp e
join dept d on e.deptno = d.deptno 
where d.deptname <> 'IT'
group by d.deptname
having count(*) > 1
order by count(*) desc;

--16
Select e.empname, d.deptname from emp e
right outer join dept d on e.deptno = d.deptno;

--17
Select e.empname, d.deptname from emp e
left outer join dept d on e.deptno = d.deptno;

--18
Select e.empname, d.deptname from emp e
full outer join dept d on d.deptno = e.deptno;