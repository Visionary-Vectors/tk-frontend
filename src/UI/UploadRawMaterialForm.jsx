import React, { useState } from "react";

const UploadRawMaterialForm = ({ onUpload }) => {
  const supplierId = localStorage.getItem("user_id"); // Get supplier ID from local storage

  const [form, setForm] = useState({
    name: "",
    raw_material_quantity: "",
    unit: "",
    raw_material_price: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("raw_material_quantity", form.raw_material_quantity);
    formData.append("unit", form.unit);
    formData.append("raw_material_price", form.raw_material_price);
    formData.append("image", form.image);

    try {
      console.log(formData);
      const res = await fetch(
        `https://tk-backend-n9dr.onrender.com/api/supplier/${supplierId}/uploadRawMaterials`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const text = await res.text(); // to debug non-JSON error responses
        throw new Error(text || "Upload failed");
      }

      const result = await res.json();
      console.log("✅ Upload success:", result);
      
      setForm({
        name: "",
        raw_material_quantity: "",
        unit: "",
        raw_material_price: "",
        image: null,
      });
      onUpload(); 
      // refresh materials
    } catch (err) {
      console.error("❌ Upload error:", err);
      setError("Failed to upload material. Check inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded shadow-sm bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Raw Material Name"
          value={form.name}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          name="raw_material_quantity"
          placeholder="Quantity"
          value={form.raw_material_quantity}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="unit"
          placeholder="Unit (e.g. kg, lts)"
          value={form.unit}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          name="raw_material_price"
          placeholder="Price"
          value={form.raw_material_price}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          required
          className="border p-2 rounded w-full"
        />
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Uploading..." : "Upload Material"}
      </button>
    </form>
  );
};

export default UploadRawMaterialForm;
