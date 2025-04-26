// src/pages/Students.jsx
import React, { useEffect, useState } from "react";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    roll_no: "",
    room_no: "",
    hostel_name: "",
  });

  const fetchStudents = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/students");
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setFormData({
        name: "",
        roll_no: "",
        room_no: "",
        hostel_name: "",
      });
      fetchStudents();
    } catch (err) {
      console.error("Error adding student:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="space-y-10">
      {/* Add Student Form */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Add New Student</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="text"
              name="roll_no"
              placeholder="Roll Number"
              value={formData.roll_no}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="text"
              name="room_no"
              placeholder="Room Number"
              value={formData.room_no}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="text"
              name="hostel_name"
              placeholder="Hostel Name"
              value={formData.hostel_name}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Student
          </button>
        </form>
      </div>

      {/* Student Table */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">All Students</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Roll No</th>
              <th className="border px-4 py-2">Room No</th>
              <th className="border px-4 py-2">Hostel</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.STUDENT_ID}>
                <td className="border px-4 py-2">{student.STUDENT_ID}</td>
                <td className="border px-4 py-2">{student.NAME}</td>
                <td className="border px-4 py-2">{student.ROLL_NO}</td>
                <td className="border px-4 py-2">{student.ROOM_NO}</td>
                <td className="border px-4 py-2">{student.HOSTEL_NAME}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
