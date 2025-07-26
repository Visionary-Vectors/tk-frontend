import React from "react";
import "../index.css";

function Services() {
  return (
    <section id="services" className="py-16 bg-white px-4">
      <h3 className="text-3xl font-semibold text-center mb-8 text-blue-700">Our Services</h3>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
          <button className="text-xl font-bold mb-2">Sell Raw Materials</button>
          <p className="text-gray-600">Easily list your raw materials and reach potential buyers across the country.</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
          <button className="text-xl font-bold mb-2">Buy Raw Materials</button>
          <p className="text-gray-600">Find the best quality raw materials from verified sellers in one place.</p>
        </div>
      </div>
    </section>
  );
}

export default Services;
