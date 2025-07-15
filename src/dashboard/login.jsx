import React, { useEffect, useState, useRef } from "react";

export default function Dashboard() {
  // Shared state
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem("inventoryItems");
    return stored ? JSON.parse(stored) : [];
  });

  // Current tab state: "entry", "use", "inventory"
  const [activeTab, setActiveTab] = useState("entry");

  // -------- Data Entry State --------
  const [manualEntry, setManualEntry] = useState({
    batch_name: "",
    manufacturing_date: "",
    expiry_date: "",
    scan_name: "",
    quantity: 1,
  });
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const streamRef = useRef(null);

  // -------- Use Item State --------
  const [scanNameToUse, setScanNameToUse] = useState("");
  const [bestItem, setBestItem] = useState(null);

  useEffect(() => {
    return () => stopCamera();
  }, []);

  useEffect(() => {
    // Remove zero qty items, update localStorage
    const filtered = items.filter((item) => item.quantity > 0);
    if (filtered.length !== items.length) setItems(filtered);
    localStorage.setItem("inventoryItems", JSON.stringify(filtered));
  }, [items]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCameraActive(true);
    } catch {
      alert("Cannot access camera.");
    }
  };
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraActive(false);
  };

  const handleCapture = () => {
    if (!cameraActive || !videoRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    const dataUrl = canvas.toDataURL("image/png");
    setCapturedImage(dataUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      ...manualEntry,
      id: Date.now(),
      manufacturing_date: new Date(manualEntry.manufacturing_date),
      expiry_date: new Date(manualEntry.expiry_date),
      image: capturedImage,
    };
    setItems((prev) => [...prev, newItem]);
    setManualEntry({
      batch_name: "",
      manufacturing_date: "",
      expiry_date: "",
      scan_name: "",
      quantity: 1,
    });
    setCapturedImage(null);
    alert("Item added!");
  };

  const findBestItem = () => {
    const matchingItems = items
      .filter(
        (item) =>
          item.scan_name.toLowerCase() === scanNameToUse.toLowerCase() &&
          item.quantity > 0
      )
      .sort((a, b) => new Date(a.expiry_date) - new Date(b.expiry_date));

    if (matchingItems.length > 0) {
      setBestItem({ ...matchingItems[0], useQty: "" });
    } else {
      setBestItem(null);
      alert("No item found for this name.");
    }
  };

  const useItemQuantity = () => {
    if (!bestItem || !bestItem.useQty || bestItem.useQty < 1) {
      alert("Enter a valid quantity to use.");
      return;
    }
    if (bestItem.useQty > bestItem.quantity) {
      alert("Not enough quantity.");
      return;
    }
    const updated = items
      .map((item) =>
        item.id === bestItem.id
          ? { ...item, quantity: item.quantity - bestItem.useQty }
          : item
      )
      .filter((item) => item.quantity > 0);
    setItems(updated);
    setBestItem(null);
    alert("Quantity used!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-50 via-white to-yellow-50 p-8 flex flex-col items-center">
      <h2 className="text-5xl font-extrabold mb-12 text-center text-indigo-700 drop-shadow-lg">
        📦 Inventory Dashboard
      </h2>

      {/* Tab buttons with fixed large size like landing page */}
      <div className="flex justify-center gap-8 mb-14 flex-wrap max-w-xl w-full">
        {["entry", "use", "inventory"].map((tab) => {
          const labels = {
            entry: "Data Entry",
            use: "Use Item Scanning",
            inventory: "Inventory Items",
          };
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-[150px] max-w-[250px] text-lg font-bold rounded-lg shadow-md py-4
                transition
                ${
                  isActive
                    ? "bg-indigo-700 text-white"
                    : "bg-indigo-100 text-indigo-700 hover:bg-indigo-300"
                }`}
            >
              {labels[tab]}
            </button>
          );
        })}
      </div>

      {/* Content container centered with max width */}
      <div className="w-full max-w-3xl">
        {/* Data Entry */}
        {activeTab === "entry" && (
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-indigo-300 rounded-xl p-10 shadow-lg space-y-8 mx-auto"
          >
            <h3 className="text-3xl font-extrabold text-indigo-900 mb-6 text-center">
              ➕ Add New Item
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label
                  htmlFor="batch_name"
                  className="block text-indigo-800 font-semibold mb-2 text-lg"
                >
                  Batch Number
                </label>
                <input
                  id="batch_name"
                  type="text"
                  className="w-full p-4 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg font-semibold"
                  placeholder="Enter batch number"
                  value={manualEntry.batch_name}
                  onChange={(e) =>
                    setManualEntry({ ...manualEntry, batch_name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="scan_name"
                  className="block text-indigo-800 font-semibold mb-2 text-lg"
                >
                  Item Name
                </label>
                <input
                  id="scan_name"
                  type="text"
                  className="w-full p-4 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg font-semibold"
                  placeholder="Enter item name"
                  value={manualEntry.scan_name}
                  onChange={(e) =>
                    setManualEntry({ ...manualEntry, scan_name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="manufacturing_date"
                  className="block text-indigo-800 font-semibold mb-2 text-lg"
                >
                  Manufacturing Date
                </label>
                <input
                  id="manufacturing_date"
                  type="date"
                  className="w-full p-4 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg font-semibold"
                  value={manualEntry.manufacturing_date}
                  onChange={(e) =>
                    setManualEntry({
                      ...manualEntry,
                      manufacturing_date: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="expiry_date"
                  className="block text-indigo-800 font-semibold mb-2 text-lg"
                >
                  Expiry Date
                </label>
                <input
                  id="expiry_date"
                  type="date"
                  className="w-full p-4 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg font-semibold"
                  value={manualEntry.expiry_date}
                  onChange={(e) =>
                    setManualEntry({ ...manualEntry, expiry_date: e.target.value })
                  }
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="quantity"
                  className="block text-indigo-800 font-semibold mb-2 text-lg"
                >
                  Quantity
                </label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  className="w-full p-4 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg font-semibold"
                  placeholder="Enter quantity"
                  value={manualEntry.quantity}
                  onChange={(e) =>
                    setManualEntry({ ...manualEntry, quantity: Number(e.target.value) })
                  }
                  required
                />
              </div>
            </div>

            {/* Camera Section */}
            <div className="mt-6">
              <h4 className="font-extrabold text-indigo-700 mb-4 text-xl">
                📸 Camera View
              </h4>

              {!cameraActive ? (
                <button
                  type="button"
                  onClick={startCamera}
                  className="px-8 py-3 bg-green-600 text-white font-extrabold rounded-lg hover:bg-green-700 transition"
                >
                  Start Scan
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopCamera}
                  className="px-8 py-3 bg-red-600 text-white font-extrabold rounded-lg hover:bg-red-700 transition"
                >
                  Stop Scan
                </button>
              )}

              {cameraActive && (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="border border-indigo-400 rounded-lg w-full max-w-md mt-6 shadow-md"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                  <button
                    type="button"
                    onClick={handleCapture}
                    className="mt-6 px-8 py-3 bg-blue-600 text-white font-extrabold rounded-lg hover:bg-blue-700 transition"
                  >
                    Capture Image
                  </button>
                </>
              )}
            </div>

            {capturedImage && (
              <div className="mt-8 text-center">
                <p className="font-semibold text-indigo-800 mb-3 text-lg">
                  Preview:
                </p>
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="w-full max-w-sm border border-indigo-300 rounded-lg shadow-lg mx-auto"
                />
              </div>
            )}

            <button
              type="submit"
              className="mt-12 w-full bg-indigo-700 text-white py-4 font-extrabold rounded-lg shadow-lg hover:bg-indigo-800 transition"
            >
              Add Item to Inventory
            </button>
          </form>
        )}

        {/* Use Item Scanning */}
        {activeTab === "use" && (
          <div className="bg-white border border-indigo-300 rounded-xl p-10 shadow-lg mx-auto">
            <h3 className="text-3xl font-extrabold mb-8 text-indigo-900 text-center">
              🔍 Find & Use Item
            </h3>
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
              <input
                className="border border-indigo-300 p-4 rounded-lg w-full max-w-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter Item Name"
                value={scanNameToUse}
                onChange={(e) => setScanNameToUse(e.target.value)}
              />
              <button
                onClick={findBestItem}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-extrabold hover:bg-indigo-700 transition min-w-[140px]"
              >
                Find Best Item
              </button>
            </div>

            {bestItem && (
              <div className="mt-10 bg-indigo-50 p-8 rounded-lg border border-indigo-400 shadow-inner max-w-xl mx-auto">
                <p className="text-indigo-700 font-extrabold text-lg">
                  <span className="font-extrabold">Batch:</span> {bestItem.batch_name}
                </p>
                <p className="text-indigo-700 font-extrabold text-lg mt-3">
                  <span className="font-extrabold">Expiry:</span>{" "}
                  {new Date(bestItem.expiry_date).toLocaleDateString()}
                </p>
                <p className="text-indigo-700 font-extrabold text-lg mt-3">
                  <span className="font-extrabold">Available:</span> {bestItem.quantity}
                </p>
                {bestItem.image && (
                  <img
                    src={bestItem.image}
                    alt="Item"
                    className="w-48 mt-6 rounded-lg shadow-md border border-indigo-300 mx-auto"
                  />
                )}

                <div className="mt-8 flex flex-col sm:flex-row gap-6 items-center justify-center">
                  <input
                    type="number"
                    min="1"
                    max={bestItem.quantity}
                    value={bestItem.useQty}
                    placeholder="Qty to use"
                    onChange={(e) =>
                      setBestItem({ ...bestItem, useQty: Number(e.target.value) })
                    }
                    className="border border-indigo-300 p-4 rounded-lg w-40 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={useItemQuantity}
                    className="bg-red-600 text-white px-8 py-3 rounded-lg font-extrabold hover:bg-red-700 transition min-w-[140px]"
                  >
                    Use Quantity
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Inventory Items */}
        {activeTab === "inventory" && (
          <div className="bg-white border border-indigo-300 rounded-xl p-10 shadow-lg mx-auto">
            <h3 className="text-3xl font-extrabold mb-8 text-indigo-900 text-center">
              📋 All Inventory Items
            </h3>
            {items.length === 0 ? (
              <p className="text-indigo-400 italic text-center text-lg">
                No items added yet.
              </p>
            ) : (
              <ul className="space-y-8 max-h-[400px] overflow-y-auto px-2">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="border-b border-indigo-200 pb-6 flex flex-col sm:flex-row items-center justify-between gap-6"
                  >
                    <div>
                      <p className="font-extrabold text-indigo-800 text-xl">
                        {item.batch_name} | {item.scan_name}
                      </p>
                      <p className="text-indigo-600 mt-2 text-lg">
                        Qty: {item.quantity} | Exp:{" "}
                        {new Date(item.expiry_date).toLocaleDateString()}
                      </p>
                    </div>
                    {item.image && (
                      <img
                        src={item.image}
                        alt="Item"
                        className="w-36 rounded-lg shadow-md border border-indigo-300"
                      />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}







