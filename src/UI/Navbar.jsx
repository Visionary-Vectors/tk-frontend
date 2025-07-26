import React from "react";
import '../index.css'

function Navbar() {
  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-blue-600">RawMart</h1>
        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li><a href="#services" className="hover:text-blue-600">Services</a></li>
          <li><a href="#about" className="hover:text-blue-600">About</a></li>
          <li><a href="#contact" className="hover:text-blue-600">Contact</a></li>
          <li><i class="fa-regular fa-cart-shopping"></i>
            <a href="" className="hover:text-blue-600">Add to cart</a></li>
          <li><button className="hover:text-blue-600">Sign up | log in</button></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
