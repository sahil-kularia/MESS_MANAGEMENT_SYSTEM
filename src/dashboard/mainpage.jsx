import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MessDashboard() {
  const navigate = useNavigate();

  const navtotal = () => {
    navigate("/total");
  }
  const [menu, setMenu] = useState({
    date: new Date().toLocaleDateString(),
    breakfast: ["Poha", "Tea", "Banana"],
    lunch: ["Rice", "Dal", "Vegetable Curry", "Salad"],
    snacks: ["Samosa", "Chai"],
    dinner: ["Chapati", "Paneer Butter Masala", "Raita"],
  });

  const [editMode, setEditMode] = useState(false);
  const [newBreakfast, setNewBreakfast] = useState(menu.breakfast.join(", "));
  const [newLunch, setNewLunch] = useState(menu.lunch.join(", "));
  const [newDinner, setNewDinner] = useState(menu.dinner.join(", "));

  const [waste, setWaste] = useState(4.5);
  const [leftoverFood] = useState(3.2);

  const saveMenu = () => {
    const format = (str) =>
      str
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item);
    const updatedMenu = {
      ...menu,
      breakfast: format(newBreakfast),
      lunch: format(newLunch),
      dinner: format(newDinner),
    };
    setMenu(updatedMenu);
    setEditMode(false);
  };

  const cancelEdit = () => {
    setNewBreakfast(menu.breakfast.join(", "));
    setNewLunch(menu.lunch.join(", "));
    setNewDinner(menu.dinner.join(", "));
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col max-w-6xl mx-auto p-8">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-blue-800 mb-3 drop-shadow-md">
          🍽️ Mess Member Dashboard
        </h1>
        <p className="text-blue-600 font-semibold text-lg">
          Menu & Food Waste Tracker - {menu.date}
        </p>
      </header>

      {/* Edit Button */}
      <div className="text-center mb-10">
        {editMode ? (
          <>
            <button
              onClick={saveMenu}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold mr-4 hover:bg-green-700 transition"
            >
              ✅ Save Changes
            </button>
            <button
              onClick={cancelEdit}
              className="bg-gray-400 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-500 transition"
            >
              ❌ Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 transition"
          >
            ✏️ Edit Today's Menu
          </button>
        )}
      </div>

      <section className="bg-white rounded-3xl shadow-xl p-10 mb-14">
        <h2 className="text-4xl font-bold text-blue-700 mb-10 border-b-4 border-blue-300 pb-3 text-center drop-shadow">
          Today's Menu
        </h2>

        {editMode ? (
          <div className="space-y-10">
            {/* Breakfast Edit */}
            <div>
              <label className="text-xl font-semibold text-yellow-700 block mb-2">
                🌅 Breakfast
              </label>
              <textarea
                rows={3}
                value={newBreakfast}
                onChange={(e) => setNewBreakfast(e.target.value)}
                className="w-full border-2 border-yellow-400 p-4 rounded-lg text-lg font-semibold"
                placeholder="Enter breakfast items separated by commas"
              />
            </div>

            {/* Lunch Edit */}
            <div>
              <label className="text-xl font-semibold text-red-700 block mb-2">
                🍛 Lunch
              </label>
              <textarea
                rows={3}
                value={newLunch}
                onChange={(e) => setNewLunch(e.target.value)}
                className="w-full border-2 border-red-400 p-4 rounded-lg text-lg font-semibold"
                placeholder="Enter lunch items separated by commas"
              />
            </div>

            {/* Dinner Edit */}
            <div>
              <label className="text-xl font-semibold text-purple-700 block mb-2">
                🌙 Dinner
              </label>
              <textarea
                rows={3}
                value={newDinner}
                onChange={(e) => setNewDinner(e.target.value)}
                className="w-full border-2 border-purple-400 p-4 rounded-lg text-lg font-semibold"
                placeholder="Enter dinner items separated by commas"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {/* Breakfast */}
            <div className="bg-yellow-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition">
              <h3 className="text-3xl font-semibold text-yellow-600 mb-4 drop-shadow">
                🌅 Breakfast
              </h3>
              <ul className="list-disc list-inside text-lg font-semibold text-yellow-700 space-y-1 text-left">
                {menu.breakfast.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Lunch */}
            <div className="bg-red-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition">
              <h3 className="text-3xl font-semibold text-red-600 mb-4 drop-shadow">
                🍛 Lunch
              </h3>
              <ul className="list-disc list-inside text-lg font-semibold text-red-700 space-y-1 text-left">
                {menu.lunch.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Dinner */}
            <div className="bg-purple-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition">
              <h3 className="text-3xl font-semibold text-purple-600 mb-4 drop-shadow">
                🌙 Dinner
              </h3>
              <ul className="list-disc list-inside text-lg font-semibold text-purple-700 space-y-1 text-left">
                {menu.dinner.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* Footer Section */}
      <footer className="mt-auto flex flex-col md:flex-row gap-8 justify-center">
        {/* Food Waste */}
        <div className="bg-red-600 hover:bg-red-700 cursor-pointer rounded-3xl shadow-xl p-10 flex-1 text-center text-white font-extrabold text-4xl select-none transition">
          <div className="mb-3 flex justify-center items-center gap-3">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10h3l3 8 4-16 3 8h4"
              ></path>
            </svg>
            <span>Food Wastage Today</span>
          </div>
          <p>{waste} kg</p>
        </div>

        {/* People Fed */}
        <div className="bg-green-700 hover:bg-green-800 cursor-pointer rounded-3xl shadow-xl p-10 flex-1 text-center text-white font-extrabold text-4xl select-none transition">
          <div className="mb-3 flex justify-center items-center gap-3">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c-1.657 0-3 1.567-3 3.5S10.343 15 12 15s3-1.567 3-3.5S13.657 8 12 8z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 21v-2a4 4 0 00-8 0v2"
              ></path>
            </svg>
            <span>People It Could Feed</span>
          </div>
          <p>{Math.floor(leftoverFood * 2.5)} persons</p>
        </div>

         <div className="bg-green-700 hover:bg-green-800 cursor-pointer rounded-3xl shadow-xl p-10 flex-1 text-center text-white font-extrabold text-4xl select-none transition">
          <div className="mb-3 flex justify-center items-center gap-3">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c-1.657 0-3 1.567-3 3.5S10.343 15 12 15s3-1.567 3-3.5S13.657 8 12 8z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 21v-2a4 4 0 00-8 0v2"
              ></path>
            </svg>
            <span onClick={navtotal}>TOTAL STUDENTS</span>
          </div>
          <p></p>
        </div>
      </footer>
    </div>
  );
}
