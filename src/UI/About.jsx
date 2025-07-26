import React from "react";
import "../index.css";

function About() {
  return (
    <section id="about" className="py-16 bg-blue-50 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-3xl font-bold text-blue-800 mb-4">About Us</h3>
        <p className="text-gray-700">
          RawMart is a platform built by professionals to simplify the process of raw material trading.
          Whether you're a supplier or buyer, our aim is to provide a transparent and secure experience.
        </p>
      </div>
    </section>
  );
}

export default About;
