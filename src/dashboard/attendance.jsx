import React, { useState, useEffect } from "react";

function getLast30Days() {
  const days = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    days.push(d);
  }
  return days;
}

export default function Attendance() {
  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem("attendance");
    return saved ? JSON.parse(saved) : {};
  });

  const todayStr = new Date().toDateString();

  const meals = ["breakfast", "lunch", "dinner"];

  const hasMarked = (meal) => {
    return attendance[todayStr]?.[meal] ?? false;
  };

  const markMealAttendance = (meal) => {
    if (hasMarked(meal)) {
      alert(`${meal.charAt(0).toUpperCase() + meal.slice(1)} already marked.`);
      return;
    }
    const updatedAttendance = {
      ...attendance,
      [todayStr]: {
        ...attendance[todayStr],
        [meal]: true,
      },
    };
    setAttendance(updatedAttendance);
    localStorage.setItem("attendance", JSON.stringify(updatedAttendance));
  };

  const menu = {
    breakfast: ["Poha", "Tea", "Banana"],
    lunch: ["Rice", "Dal", "Vegetable Curry", "Salad"],
    snacks: ["Samosa", "Chai"],
    dinner: ["Chapati", "Paneer Butter Masala", "Raita"],
  };

  const last30Days = getLast30Days();

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6 text-center">Today's Mess Menu</h1>

      {/* Menu Sections */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {Object.entries(menu).map(([meal, items]) => {
          const bgColors = {
            breakfast: "bg-yellow-100",
            lunch: "bg-red-100",
            snacks: "bg-orange-100",
            dinner: "bg-purple-100",
          };
          return (
            <div
              key={meal}
              className={`${bgColors[meal]} p-4 rounded-lg shadow text-center`}
            >
              <h2 className="text-xl font-semibold mb-3">
                {meal === "snacks"
                  ? "🍪 Snacks"
                  : meal === "breakfast"
                  ? "🌅 Breakfast"
                  : meal === "lunch"
                  ? "🍛 Lunch"
                  : "🌙 Dinner"}
              </h2>
              <ul>
                {items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>

      {/* Attendance Buttons */}
      <div className="text-center mb-8 space-x-4">
        {meals.map((meal) => (
          <button
            key={meal}
            onClick={() => markMealAttendance(meal)}
            className={`${
              hasMarked(meal)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } text-white font-bold py-2 px-4 rounded transition`}
            disabled={hasMarked(meal)}
          >
            {hasMarked(meal)
              ? `${meal.charAt(0).toUpperCase() + meal.slice(1)} ✅`
              : `Mark ${meal.charAt(0).toUpperCase() + meal.slice(1)}`}
          </button>
        ))}
      </div>

      {/* Calendar Attendance */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Attendance Last 30 Days
        </h2>
        <div className="overflow-auto">
          <div className="flex">
            <div className="w-24 flex-shrink-0" />
            {last30Days.map((date) => (
              <div
                key={date.toDateString()}
                className="w-20 text-center text-sm font-medium"
              >
                {date.toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                })}
              </div>
            ))}
          </div>

          {meals.map((meal) => (
            <div key={meal} className="flex items-center">
              <div className="w-24 text-right pr-2 text-sm font-semibold capitalize">
                {meal}
              </div>
              {last30Days.map((date) => {
                const dateStr = date.toDateString();
                const isPresent = attendance[dateStr]?.[meal] ?? false;
                return (
                  <div
                    key={`${dateStr}-${meal}`}
                    className={`w-20 h-10 border border-gray-300 flex items-center justify-center ${
                      isPresent ? "bg-green-500 text-white" : "bg-gray-100"
                    }`}
                  >
                    {isPresent ? "✓" : ""}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
