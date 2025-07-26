import { useState } from "react";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone_number" ? value.replace(/\D/, "") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Processing...");
    
    if (isSignup) {
      if (!formData.role) return setMessage("Please select a role.");
      if (formData.role === "VENDOR" && !formData.work)
        return setMessage("Please enter your work.");

      try {
        const res = await fetch(
          "https://tk-backend-czpvl5zxx-codebyjsas-projects.vercel.app/api/create_user",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );
        const data = await res.json();
        setMessage(res.ok ? "✅ User created successfully!" : data.message || "Signup failed.");
        console.log(formdata);
      } catch (err) {
        console.error(err);
        setMessage("❌ Network error.");
        console.log(formdata);
        
      }
    } else {
      // Dummy login flow for now
      if (!formData.email || !formData.password) {
        setMessage("Please fill in email and password.");
        return;
      }
      setMessage("🔒 Login functionality is not yet implemented.");
    }
  };

  const toggleForm = () => {
    setIsSignup((prev) => !prev);
    setMessage("");
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
                <option value="" disabled>
                  Select Role
                </option>
                <option value="VENDOR">Vendor</option>
                <option value="BUYER">Buyer</option>
              </select>

              {formData.role === "VENDOR" && (
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
          <button onClick={toggleForm} className="text-blue-500 underline">
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
