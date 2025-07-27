import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const vendorId = localStorage.getItem("user_id");
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const handlePlaceOrder = async () => {
    if (!vendorId || cart.length === 0) return alert("Cart is empty!");

    const payload = {
      orders: cart.map(({ raw_material_id, order_quantity, order_unit }) => ({
        raw_material_id,
        order_quantity,
        order_unit,
      })),
    };

    try {
      const res = await fetch(
        `https://tk-backend-n9dr.onrender.com/api/vendor/${vendorId}/createOrder`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert("✅ Order placed!");
        localStorage.removeItem("cart");
        setCart([]);
        navigate("/vendor-dashboard");
      } else {
        alert("❌ Order failed");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("❌ Server error");
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.order_quantity,
    0
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-6">
        <h2 className="text-2xl font-semibold mb-4">🛒 Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between bg-gray-100 p-4 rounded">
                <div>
                  <p className="font-semibold">{item.raw_material_name}</p>
                  <p>
                    {item.order_quantity} {item.order_unit}
                  </p>
                </div>
                <div className="text-right">
                  ₹{item.price * item.order_quantity}
                </div>
              </div>
            ))}
            <div className="text-right text-xl font-bold mt-4">Total: ₹{total}</div>
            <button
              onClick={handlePlaceOrder}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Place Order
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
