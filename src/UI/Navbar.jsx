import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem("user_id");

  const handleAuth = () => {
    navigate("/auth");
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <h1
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          RawMart
        </h1>
        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li>
            <a href="#services" className="hover:text-blue-600">
              Services
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-blue-600">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-blue-600">
              Contact
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-600">
              🛒 Cart
            </a>
          </li>
          <li>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="hover:text-red-600">
                Logout
              </button>
            ) : (
              <button onClick={handleAuth} className="hover:text-blue-600">
                Sign up | Log in
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
