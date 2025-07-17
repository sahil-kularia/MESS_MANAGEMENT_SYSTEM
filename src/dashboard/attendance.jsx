import React, { useState } from "react";
import axios from "axios";

export default function Attendance() {
  const [fooddata, setFooddata] = useState({
    rollno: "",
    breakfast: false,
    lunch: false,
    dinner: false,
  });

  async function submitrollno(e) {
    e.preventDefault();
    try {
      const response = await axios.post("https://thaparmess.netlify.app/student/food", fooddata);
      // const response = await axios.post("https://locahost:3000/student/food", fooddata);

      localStorage.setItem("student", JSON.stringify(response.data));
      setFooddata({
        rollno: "",
        breakfast: false,
        lunch: false,
        dinner: false,
      });
    } catch (error) {
      console.log("Error:", error);
    }
  }

  function toggleMeal(meal) {
    setFooddata((prev) => ({
      ...prev,
      [meal]: !prev[meal],
    }));
  }

  const menu = {
    breakfast: ["Poha", "Tea", "Banana"],
    lunch: ["Rice", "Dal", "Vegetable Curry", "Salad"],
    dinner: ["Chapati", "Paneer Butter Masala", "Raita"],
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6 text-center">Today's Mess Menu</h1>

      {/* Menu Sections */}
      <section className="grid ml-10 grid-cols-1 md:grid-cols-4 gap-6 mb-8 justify-center">
        {Object.entries(menu).map(([meal, items]) => {
          const bgColors = {
            breakfast: "bg-yellow-100",
            lunch: "bg-red-100",
            dinner: "bg-purple-100",
          };
          return (
            <div
              key={meal}
              className={`${bgColors[meal]} p-4 rounded-lg shadow text-center`}
            >
              <h2 className="text-xl font-semibold mb-3 capitalize">
                {meal === "breakfast"
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
        <h3 className="text-[1.2rem] font-semibold mb-4">MARK ATTENDANCE</h3>
        <form onSubmit={submitrollno} className="">
          <input
            onChange={(e) =>
              setFooddata((prev) => ({ ...prev, rollno: e.target.value }))
            }
            name="rollno"
            value={fooddata.rollno}
            className="bg-yellow-200 rounded-xl m-1 p-2"
            type="text"
            placeholder="student roll no"
            required
          />
          <button
            type="submit"
            className="ml-10 bg-blue-300 m-1 p-2 rounded-xl font-bold w-[7rem]"
          >
            Submit
          </button>
        </form>

        <div className="flex justify-center space-x-6 mt-5">
          {["breakfast", "lunch", "dinner"].map((meal) => (
            <button
              key={meal}
              onClick={() => toggleMeal(meal)}
              className={`w-[10rem] h-[5rem] rounded-2xl text-[1.5rem] font-mono 
                ${
                  fooddata[meal]
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
            >
              {meal.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
