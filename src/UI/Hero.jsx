import React from "react";
import "../index.css";

function Hero() {
  return (
    <section className="text-center bg-blue-100 py-20 px-4">
      <h2 className="text-4xl font-bold text-blue-800">Welcome to RawMart</h2>
      <p className="mt-4 text-gray-700 max-w-xl mx-auto">
        Your trusted platform to buy and sell raw materials at competitive prices.
      </p>
    </section>
  );
}

export default Hero;
