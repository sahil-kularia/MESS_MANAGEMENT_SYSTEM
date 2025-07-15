import React, { useState, useEffect } from "react";

export default function Ngo() {
  const [ngoForm, setNgoForm] = useState({
    name: "",
    location: "",
    phone: "",
    people: "",
    foodQuantity: "",
  });

  const [ngos, setNgos] = useState(() => {
    const saved = localStorage.getItem("ngosList");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("ngosList", JSON.stringify(ngos));
  }, [ngos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNgoForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNGO = {
      ...ngoForm,
      id: Date.now(),
    };

    setNgos((prev) => [...prev, newNGO]);

    setNgoForm({
      name: "",
      location: "",
      phone: "",
      people: "",
      foodQuantity: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-blue-50 to-white p-8 max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-800">MANAGE FOOD IN HOSTEL</h1>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-800 transition"
        >
          Register New NGO
        </button>
      </header>

      {/* NGO Registration Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg max-w-3xl mx-auto p-8 mb-16"
        style={{ fontWeight: "600" }}
      >
        <h2 className="text-2xl text-blue-700 mb-6 border-b border-blue-300 pb-2 font-bold">
          Register New NGO
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col text-gray-700 text-lg">
            NGO Name
            <input
              type="text"
              name="name"
              value={ngoForm.name}
              onChange={handleChange}
              required
              className="mt-2 p-3 border rounded-lg border-blue-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg"
              placeholder="Enter NGO Name"
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
              className="mt-2 p-3 border rounded-lg border-blue-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg"
              placeholder="NGO Location"
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
              className="mt-2 p-3 border rounded-lg border-blue-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg"
              placeholder="Contact Phone"
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
              className="mt-2 p-3 border rounded-lg border-blue-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg"
              placeholder="People in NGO"
            />
          </label>
          <label className="flex flex-col text-gray-700 text-lg md:col-span-2">
            Food Quantity Required (in kg)
            <input
              type="number"
              name="foodQuantity"
              value={ngoForm.foodQuantity}
              onChange={handleChange}
              min="1"
              required
              className="mt-2 p-3 border rounded-lg border-blue-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg"
              placeholder="Quantity needed"
            />
          </label>
        </div>

        <button
          type="submit"
          className="mt-8 w-full bg-green-600 text-white py-4 rounded-xl font-bold text-xl hover:bg-green-700 shadow-lg transition"
        >
          Register NGO
        </button>
      </form>

      {/* NGO Listing */}
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
                key={ngo.id}
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
                <p className="text-lg text-gray-700">
                  <strong>🍽️ Food Needed:</strong> {ngo.foodQuantity} kg
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
