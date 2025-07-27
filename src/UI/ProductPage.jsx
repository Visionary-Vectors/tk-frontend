import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [supplierFilter, setSupplierFilter] = useState("");
  const [unitFilter, setUnitFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://tk-backend-n9dr.onrender.com/api/raw-materials")
      .then((res) => res.json())
      .then((data) => {
        setMaterials(data);
        setFilteredMaterials(data);
        console.log("🧾 Fetched raw materials:", data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    let results = materials;

    if (searchTerm) {
      results = results.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (supplierFilter) {
      results = results.filter((item) => item.supplier_id === supplierFilter);
    }

    if (unitFilter) {
      results = results.filter((item) => item.unit === unitFilter);
    }

    if (sortOption === "price-asc") {
      results = [...results].sort((a, b) => a.raw_material_price - b.raw_material_price);
    } else if (sortOption === "price-desc") {
      results = [...results].sort((a, b) => b.raw_material_price - a.raw_material_price);
    } else if (sortOption === "quantity-desc") {
      results = [...results].sort((a, b) => b.raw_material_quantity - a.raw_material_quantity);
    } else if (sortOption === "quantity-asc") {
      results = [...results].sort((a, b) => a.raw_material_quantity - b.raw_material_quantity);
    }

    setFilteredMaterials(results);
  }, [searchTerm, supplierFilter, unitFilter, sortOption, materials]);

  const addToCart = (material) => {
    const exists = cart.find(item => item.raw_material_id === material.raw_material_id);
    if (exists) {
      alert("Already in cart");
      return;
    }
    const newCart = [...cart, { ...material, order_quantity: 1 }];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSupplierFilter("");
    setUnitFilter("");
    setSortOption("");
  };

  const uniqueSuppliers = [...new Set(materials.map(m => m.supplier_id))];
  const uniqueUnits = [...new Set(materials.map(m => m.unit))];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Raw Materials</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search by name"
          className="border p-2 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={supplierFilter}
          onChange={(e) => setSupplierFilter(e.target.value)}
        >
          <option value="">Filter by Supplier</option>
          {uniqueSuppliers.map((id) => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={unitFilter}
          onChange={(e) => setUnitFilter(e.target.value)}
        >
          <option value="">Filter by Unit</option>
          {uniqueUnits.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="quantity-asc">Quantity ↑</option>
          <option value="quantity-desc">Quantity ↓</option>
        </select>
      </div>

      <div className="mb-4">
        <button
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>

      {/* Raw Materials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredMaterials.length === 0 ? (
          <p>No raw materials match the filters.</p>
        ) : (
          filteredMaterials.map((item) => (
            <div key={item.raw_material_id} className="border rounded-lg p-4 shadow-md">
              <img
                src={`https://tk-backend-n9dr.onrender.com/${item.image}`}
                alt={item.name}
                className="w-full h-40 object-cover mb-2"
              />
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p>{item.raw_material_quantity} {item.unit} available</p>
              <p>Price: ₹{item.raw_material_price}</p>
              <button
                onClick={() => addToCart(item)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>

      {/* Go to Cart */}
      <div className="mt-6 text-right">
        <button
          onClick={() => navigate("/cart")}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          🛒 Go to Cart ({cart.length})
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
