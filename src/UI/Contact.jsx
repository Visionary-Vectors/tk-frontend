import React from "react";
import "../index.css"

function Contact() {
  return (
    <section id="contact" className="py-16 bg-white px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-3xl font-bold text-blue-700 mb-4">Contact Us</h3>
        <p className="text-gray-600 mb-6">Email us at <a href="mailto:info@rawmart.com" className="text-blue-600 underline">info@rawmart.com</a></p>
        <form className="space-y-4">
          <input className="w-full border p-2 rounded" type="text" placeholder="Your Name" />
          <input className="w-full border p-2 rounded" type="email" placeholder="Your Email" />
          <textarea className="w-full border p-2 rounded" rows="4" placeholder="Your Message"></textarea>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Send</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
