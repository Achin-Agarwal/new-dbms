import React, { useEffect, useState } from "react";

const mealTypeMap = {
  1: "Breakfast",
  2: "Lunch",
  3: "Dinner",
};

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [studentsCache, setStudentsCache] = useState({});
  const [formData, setFormData] = useState({
    student_id: "",
    meal_date: "",
    meal_type: "",
  });

  const fetchMeals = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/meals");
      const data = await res.json();
      setMeals(data);

      // Get unique student IDs to fetch names
      const uniqueIds = [...new Set(data.map((m) => m.STUDENT_ID))];
      const newCache = { ...studentsCache };

      for (const id of uniqueIds) {
        if (!newCache[id]) {
          const res = await fetch(`http://localhost:3000/api/students/${id}`);
          const student = await res.json();
          newCache[id] = student;
        }
      }

      setStudentsCache(newCache);
    } catch (err) {
      console.error("Error fetching meals or students:", err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/api/meals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setFormData({ student_id: "", meal_date: "", meal_type: "" });
      fetchMeals();
    } catch (err) {
      console.error("Error recording meal:", err);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Record a Meal</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <input
              type="number"
              name="student_id"
              placeholder="Student ID"
              value={formData.student_id}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="date"
              name="meal_date"
              value={formData.meal_date}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              required
            />
            <select
              name="meal_type"
              value={formData.meal_type}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              required
            >
              <option value="">Select Meal Type</option>
              <option value="1">Breakfast</option>
              <option value="2">Lunch</option>
              <option value="3">Dinner</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Record Meal
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Meals Taken</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Meal ID</th>
              <th className="border px-4 py-2">Student Name</th>
              <th className="border px-4 py-2">Roll No</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Meal Type</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal) => {
              const student = studentsCache[meal.STUDENT_ID] || {};
              return (
                <tr key={meal.MEAL_ID}>
                  <td className="border px-4 py-2">{meal.MEAL_ID}</td>
                  <td className="border px-4 py-2">{student.NAME || "Loading..."}</td>
                  <td className="border px-4 py-2">{student.ROLL_NO || "-"}</td>
                  <td className="border px-4 py-2">
                    {new Date(meal.MEAL_DATE).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    {mealTypeMap[meal.MEAL_TYPE_ID] || meal.MEAL_TYPE_ID}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Meals;
