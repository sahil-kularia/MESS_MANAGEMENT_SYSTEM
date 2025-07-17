import React, { useEffect, useState } from "react";

export default function StudentMealDashboard() {
  const [data, setData] = useState(null);
  const [showTotals, setShowTotals] = useState(false);
  const [dailyTotals, setDailyTotals] = useState({}); // totals per day

  useEffect(() => {
    async function fetchData() {
      try {
        // ✅ Direct URL (simple setup)
        const res = await fetch("https://mess-backend-q6hcrpe00-sahil-kularias-projects.vercel.app/student/all");

        // ✅ Recommended for deployment: use this instead (set VITE_API_URL in Netlify env variables)
        // const res = await fetch(`${import.meta.env.VITE_API_URL}/student/all`);

        if (!res.ok || !res.headers.get("content-type")?.includes("application/json")) {
          throw new Error("Invalid response from server");
        }

        const json = await res.json();
        setData(json);

        // ✅ Calculate daily totals
        const daily = {};
        json.students.forEach((student) => {
          const dateStr = new Date(student.date).toISOString().slice(0, 10);
          if (!daily[dateStr]) {
            daily[dateStr] = { breakfast: 0, lunch: 0, dinner: 0 };
          }
          if (student.breakfast) daily[dateStr].breakfast++;
          if (student.lunch) daily[dateStr].lunch++;
          if (student.dinner) daily[dateStr].dinner++;
        });

        setDailyTotals(daily);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }

    fetchData();
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const todayCounts = dailyTotals[today] || { breakfast: 0, lunch: 0, dinner: 0 };

  if (!data) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center p-8">
      <h1 className="text-4xl font-extrabold mb-10 text-indigo-700">
        🍽️ Student Meal Counts
      </h1>

      {/* Today's meal counts */}
      <div className="flex gap-8 mb-10">
        <MealCard title="Breakfast" count={todayCounts.breakfast} />
        <MealCard title="Lunch" count={todayCounts.lunch} />
        <MealCard title="Dinner" count={todayCounts.dinner} />
      </div>

      <button
        onClick={() => setShowTotals(!showTotals)}
        className="mb-8 bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition"
      >
        {showTotals ? "Hide" : "Show"} Total Students per Day
      </button>

      {showTotals && (
        <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg overflow-x-auto">
          <h3 className="text-2xl font-bold mb-6 text-indigo-900 text-center">
            Total Students per Day (Breakfast / Lunch / Dinner)
          </h3>
          <table className="w-full text-indigo-800 border-collapse">
            <thead>
              <tr>
                <th className="border-b border-indigo-300 py-2 px-4 text-left">Date</th>
                <th className="border-b border-indigo-300 py-2 px-4 text-center">Breakfast</th>
                <th className="border-b border-indigo-300 py-2 px-4 text-center">Lunch</th>
                <th className="border-b border-indigo-300 py-2 px-4 text-center">Dinner</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(dailyTotals).map(([date, counts]) => (
                <tr key={date} className="even:bg-indigo-50">
                  <td className="border-b border-indigo-200 py-2 px-4 font-semibold">{date}</td>
                  <td className="border-b border-indigo-200 py-2 px-4 text-center">{counts.breakfast}</td>
                  <td className="border-b border-indigo-200 py-2 px-4 text-center">{counts.lunch}</td>
                  <td className="border-b border-indigo-200 py-2 px-4 text-center">{counts.dinner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ✅ Reusable MealCard Component
function MealCard({ title, count }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg text-center w-40">
      <h2 className="text-2xl font-bold text-indigo-900 mb-2">{title}</h2>
      <p className="text-indigo-700 text-3xl font-extrabold">{count}</p>
    </div>
  );
}
