import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    display_name: "",
    phone_number: "",
    email: "",
    role: "",
    work: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleUnload = () => localStorage.removeItem("user_id");
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone_number" ? value.replace(/\D/g, "") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Processing...");

    const endpoint = isSignup
      ? "https://tk-backend-n9dr.onrender.com/api/create_user"
      : "https://tk-backend-n9dr.onrender.com/api/login";

    const payload = isSignup
      ? formData
      : {
          email: formData.email,
          password: formData.password,
        };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("🧾 Server response:", data);

      const userId = data.user_id || data.userId;
      const role = data.user?.role || data.role;

      if (res.ok && userId) {
        console.log("✅ Saving user_id:", userId);
        localStorage.setItem("user_id", userId);
        if (role) {
          localStorage.setItem("role", role);
          console.log("✅ Role saved:", role);
        }

        setMessage(isSignup ? "✅ User created!" : "✅ Logged in!");
        setTimeout(() => navigate("/dashboard", { replace: true }), 500);
      } else {
        console.warn("❌ Login/signup failed:", data);
        setMessage(data.message || "❌ Something went wrong.");
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      setMessage("❌ Network error.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <>
              <input
                type="text"
                name="display_name"
                placeholder="Full Name"
                value={formData.display_name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              >
                <option value="">Select Role</option>
                <option value="VENDOR">Vendor</option>
                <option value="SUPPLIER">Supplier</option>
              </select>
              {formData.role === "SUPPLIER" && (
                <input
                  type="text"
                  name="work"
                  placeholder="Work (e.g., Vegetable Supplier)"
                  value={formData.work}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              )}
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignup((prev) => !prev)}
            className="text-blue-500 underline"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>

        {message && (
          <p className="text-center mt-4 text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
