import React, { useEffect, useState } from "react";
import UploadRawMaterialForm from "./UploadRawMaterialForm";
import RawMaterialsTable from "./RawMaterialsTable";

const SupplierDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    fetchRawMaterials();
  }, []);

  const fetchRawMaterials = async () => {
    try {
      const res = await fetch("https://tk-backend-n9dr.onrender.com/api/raw-materials");
      const data = await res.json();
      setMaterials(data);
    } catch (err) {
      console.error("❌ Failed to load materials", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Raw Materials</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {showForm ? "Close Form" : "Add Raw Material"}
        </button>
      </div>

      {showForm && (
        <UploadRawMaterialForm onUpload={fetchRawMaterials} />
      )}

      <RawMaterialsTable materials={materials} />
    </div>
  );
};

export default SupplierDashboard;
