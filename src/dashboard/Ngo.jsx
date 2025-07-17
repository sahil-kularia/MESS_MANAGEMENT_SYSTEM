import React, { useState } from "react";

export default function Ngo() {
  const [ngoForm, setNgoForm] = useState({
    name: "",
    location: "",
    phone: "",
    people: "",
    foodRequired: {
      rice: "",
      dal: "",
      wheat: "",
    },
  });

  const [ngos, setNgos] = useState([]);
  const [availableFood, setAvailableFood] = useState({
    rice: 8,
    dal: 3,
    wheat: 5,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNgoForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFoodRequiredChange = (e) => {
    const { name, value } = e.target;
    setNgoForm((prev) => ({
      ...prev,
      foodRequired: {
        ...prev.foodRequired,
        [name]: value,
      },
    }));
  };

  const handleFoodChange = (e) => {
    const { name, value } = e.target;
    setAvailableFood((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const newNGO = {
      ...ngoForm,
      people: Number(ngoForm.people),
      foodRequired: {
        rice: Number(ngoForm.foodRequired.rice),
        dal: Number(ngoForm.foodRequired.dal),
        wheat: Number(ngoForm.foodRequired.wheat),
      },
      _id: Date.now(), // temporary unique ID
    };

    setNgos((prev) => [newNGO, ...prev]);

    // Reset form
    setNgoForm({
      name: "",
      location: "",
      phone: "",
      people: "",
      foodRequired: { rice: "", dal: "", wheat: "" },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-blue-50 to-white p-8 max-w-6xl mx-auto">
      <section className="bg-white rounded-xl shadow-lg p-6 mb-10">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Available Food Stock (kg)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(availableFood).map(([food, quantity]) => (
            <label key={food} className="flex flex-col text-gray-700 text-lg">
              {food.charAt(0).toUpperCase() + food.slice(1)}
              <input
                type="number"
                name={food}
                value={quantity}
                onChange={handleFoodChange}
                min="0"
                className="mt-2 p-3 border rounded-lg border-blue-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg"
              />
            </label>
          ))}
        </div>
      </section>

      <header className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-800">MANAGE FOOD IN HOSTEL</h1>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-800 transition"
        >
          Register New NGO
        </button>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg max-w-3xl mx-auto p-8 mb-16"
        style={{ fontWeight: "600" }}
      >
        <h2 className="text-2xl text-blue-700 mb-6 border-b border-blue-300 pb-2 font-bold">
          Register New NGO
        </h2>

        {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col text-gray-700 text-lg">
            NGO Name
            <input
              type="text"
              name="name"
              value={ngoForm.name}
              onChange={handleChange}
              required
              className="mt-2 p-3 border rounded-lg border-blue-300 text-lg"
            />
          </label>
          <label className="flex flex-col text-gray-700 text-lg">
            Location
            <input
              type="text"
              name="location"
              value={ngoForm.location}
              onChange={handleChange}
              required
              className="mt-2 p-3 border rounded-lg border-blue-300 text-lg"
            />
          </label>
          <label className="flex flex-col text-gray-700 text-lg">
            Phone Number
            <input
              type="tel"
              name="phone"
              value={ngoForm.phone}
              onChange={handleChange}
              required
              className="mt-2 p-3 border rounded-lg border-blue-300 text-lg"
            />
          </label>
          <label className="flex flex-col text-gray-700 text-lg">
            Number of People
            <input
              type="number"
              name="people"
              value={ngoForm.people}
              onChange={handleChange}
              min="1"
              required
              className="mt-2 p-3 border rounded-lg border-blue-300 text-lg"
            />
          </label>

          {["rice", "dal", "wheat"].map((item) => (
            <label key={item} className="flex flex-col text-gray-700 text-lg">
              {item.charAt(0).toUpperCase() + item.slice(1)} Required (kg)
              <input
                type="number"
                name={item}
                value={ngoForm.foodRequired[item]}
                onChange={handleFoodRequiredChange}
                min="0"
                required
                className="mt-2 p-3 border rounded-lg border-blue-300 text-lg"
              />
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="mt-8 w-full bg-green-600 text-white py-4 rounded-xl font-bold text-xl hover:bg-green-700 shadow-lg transition"
        >
          Register NGO
        </button>
      </form>

      <section>
        <h2 className="text-3xl font-extrabold text-blue-800 mb-8 text-center">
          Registered NGOs
        </h2>
        {ngos.length === 0 ? (
          <p className="text-center text-gray-600 text-lg font-semibold">
            No NGOs registered yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {ngos.map((ngo) => (
              <div
                key={ngo._id}
                className="bg-white rounded-2xl shadow-lg p-8 border border-blue-200 hover:shadow-2xl transition"
              >
                <h3 className="text-2xl font-bold text-blue-900 mb-4">{ngo.name}</h3>
                <p className="text-lg text-gray-700 mb-1">
                  <strong>📍 Location:</strong> {ngo.location}
                </p>
                <p className="text-lg text-gray-700 mb-1">
                  <strong>📞 Phone:</strong> {ngo.phone}
                </p>
                <p className="text-lg text-gray-700 mb-1">
                  <strong>👥 People:</strong> {ngo.people}
                </p>
                <div className="text-lg text-gray-700">
                  <strong>🍽️ Food Needed:</strong>
                  <ul className="list-disc list-inside mt-1">
                    <li>Rice: {ngo.foodRequired.rice} kg</li>
                    <li>Dal: {ngo.foodRequired.dal} kg</li>
                    <li>Wheat: {ngo.foodRequired.wheat} kg</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
