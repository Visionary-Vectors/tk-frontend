import React, { useState } from "react";

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const vendorId = localStorage.getItem("user_id");

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = {
      raw_material_id: product.raw_material_id,
      raw_material_name: product.raw_material_name,
      order_quantity: quantity,
      order_unit: product.unit,
      price: product.raw_material_price,
    };

    const updatedCart = [...cart, item];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("✅ Added to cart");
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <img
        src={`https://tk-backend-n9dr.onrender.com/${product.rm_pictures}`}
        alt={product.raw_material_name}
        className="w-full h-40 object-cover mb-2 rounded"
      />
      <h3 className="text-lg font-semibold">{product.raw_material_name}</h3>
      <p className="text-gray-600">
        ₹{product.raw_material_price} / {product.unit}
      </p>
      <input
        type="number"
        value={quantity}
        min="1"
        onChange={(e) => setQuantity(e.target.value)}
        className="mt-2 border w-full px-2 py-1 rounded"
      />
      <button
        onClick={handleAddToCart}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
