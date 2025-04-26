import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MessMenuPage() {
  const [menus, setMenus] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const MEAL_TYPES = ['All', 'Breakfast', 'Lunch', 'Dinner'];

  const fetchMenus = async () => {
    try {
      let url = 'http://localhost:3000/api/menu';
      if (selectedDate && selectedType !== 'All') {
        url = `http://localhost:3000/api/menu/${selectedDate}/${selectedType}`;
      } else if (selectedDate) {
        url = `http://localhost:3000/api/menu/${selectedDate}`;
      }
      const res = await axios.get(url);
      setMenus(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, [selectedDate, selectedType]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Mess Menu</h2>

      <div className="flex gap-4 mb-6 items-center">
        <input
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          className="p-2 border rounded-md"
        />

        <select
          value={selectedType}
          onChange={e => setSelectedType(e.target.value)}
          className="p-2 border rounded-md"
        >
          {MEAL_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {menus.length === 0 ? (
        <p className="text-gray-600">No menu available for selected filter.</p>
      ) : (
        <div className="space-y-4">
          {menus.map(menu => (
            <div key={menu.menu_id} className="bg-white shadow-md rounded-lg p-4">
              <div className="text-lg font-medium">
                {menu.meal_date} — {menu.meal_type}
              </div>
              <ul className="list-disc list-inside mt-2">
                {menu.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
