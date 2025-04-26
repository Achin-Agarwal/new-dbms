CREATE TABLE Sailors (
    sid INTEGER PRIMARY KEY,
    sname VARCHAR2(50),
    rating INTEGER,
    age FLOAT
);

CREATE TABLE Boats (
    bid INTEGER PRIMARY KEY,
    bname VARCHAR2(50),
    color VARCHAR2(20)
);

CREATE TABLE Reserves (
    sid INTEGER,
    bid INTEGER,
    day DATE,
    PRIMARY KEY (sid, bid, day),
    FOREIGN KEY (sid) REFERENCES Sailors(sid),
    FOREIGN KEY (bid) REFERENCES Boats(bid)
);


INSERT INTO Sailors (sid, sname, rating, age) VALUES (22, 'Dustin', 7, 45.0);
INSERT INTO Sailors (sid, sname, rating, age) VALUES (29, 'Brutus', 1, 33.0);
INSERT INTO Sailors (sid, sname, rating, age) VALUES (31, 'Lubber', 8, 55.5);
INSERT INTO Sailors (sid, sname, rating, age) VALUES (32, 'Andy', 8, 25.5);
INSERT INTO Sailors (sid, sname, rating, age) VALUES (58, 'Rusty', 10, 35.0);
INSERT INTO Sailors (sid, sname, rating, age) VALUES (64, 'Horatio', 7, 35.0);
INSERT INTO Sailors (sid, sname, rating, age) VALUES (71, 'Zorba', 10, 16.0);
INSERT INTO Sailors (sid, sname, rating, age) VALUES (74, 'Horatio', 9, 35.0);
INSERT INTO Sailors (sid, sname, rating, age) VALUES (85, 'Art', 3, 25.5);
INSERT INTO Sailors (sid, sname, rating, age) VALUES (95, 'Bob', 3, 63.5);

INSERT INTO Boats (bid, bname, color) VALUES (101, 'Interlake', 'blue');
INSERT INTO Boats (bid, bname, color) VALUES (102, 'Interlake', 'red');
INSERT INTO Boats (bid, bname, color) VALUES (103, 'Clipper', 'green');
INSERT INTO Boats (bid, bname, color) VALUES (104, 'Marine', 'red');

INSERT INTO Reserves (sid, bid, day) VALUES (22, 101, TO_DATE('10/10/1998', 'MM/DD/YYYY'));
INSERT INTO Reserves (sid, bid, day) VALUES (22, 102, TO_DATE('10/10/1998', 'MM/DD/YYYY'));
INSERT INTO Reserves (sid, bid, day) VALUES (31, 103, TO_DATE('10/08/1998', 'MM/DD/YYYY'));
INSERT INTO Reserves (sid, bid, day) VALUES (32, 104, TO_DATE('10/07/1998', 'MM/DD/YYYY'));
INSERT INTO Reserves (sid, bid, day) VALUES (58, 102, TO_DATE('11/10/1998', 'MM/DD/YYYY'));
INSERT INTO Reserves (sid, bid, day) VALUES (64, 101, TO_DATE('11/06/1998', 'MM/DD/YYYY'));
INSERT INTO Reserves (sid, bid, day) VALUES (64, 103, TO_DATE('11/12/1998', 'MM/DD/YYYY'));
INSERT INTO Reserves (sid, bid, day) VALUES (74, 103, TO_DATE('09/08/1998', 'MM/DD/YYYY'));
INSERT INTO Reserves (sid, bid, day) VALUES (85, 104, TO_DATE('09/08/1998', 'MM/DD/YYYY'));

Select sname from sailors s
join reserves r on s.sid = r.sid
where r.bid in (select bid from boats where color in ('red', 'green'));

Select sname from sailors s
where s.sid in (Select r.sid from reserves where 
                r.bid in 