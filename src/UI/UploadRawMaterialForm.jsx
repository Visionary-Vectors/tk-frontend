import React, { useState } from "react";

const UploadRawMaterialForm = ({ onUploadSuccess }) => {
  const [formData, setFormData] = useState({
    raw_material_name: "",
    raw_material_quantity: "",
    unit: "",
    raw_material_price: "",
    rm_pictures: null,
  });

  const [message, setMessage] = useState("");
  const supplierId = localStorage.getItem("user_id");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!supplierId) {
      setMessage("❌ Supplier ID not found.");
      return;
    }

    setMessage("Uploading...");

    const uploadData = new FormData();
    for (const key in formData) {
      uploadData.append(key, formData[key]);
    }

    try {
      const res = await fetch(
        `https://tk-backend-n9dr.onrender.com/api/supplier/${supplierId}/uploadRawMaterial`,
        {
          method: "POST",
          body: uploadData,
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Uploaded successfully!");
        onUploadSuccess(data.rawMaterial);
        // Clear the form
        setFormData({
          raw_material_name: "",
          raw_material_quantity: "",
          unit: "",
          raw_material_price: "",
          rm_pictures: null,
        });
      } else {
        setMessage(data.message || "❌ Upload failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("❌ Network error.");
    }
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg max-w-md">
      <h2 className="text-lg font-semibold mb-4">Add Raw Material</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="raw_material_name"
          value={formData.raw_material_name}
          onChange={handleChange}
          placeholder="Material Name"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="raw_material_quantity"
          value={formData.raw_material_quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          placeholder="Unit (e.g., kg)"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="raw_material_price"
          value={formData.raw_material_price}
          onChange={handleChange}
          placeholder="Price (₹)"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="file"
          name="rm_pictures"
          onChange={handleChange}
          accept="image/*"
          className="w-full"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Upload
        </button>
      </form>

      {message && (
        <p className="mt-4 text-sm text-center text-gray-700">{message}</p>
      )}
    </div>
  );
};

export default UploadRawMaterialForm;
