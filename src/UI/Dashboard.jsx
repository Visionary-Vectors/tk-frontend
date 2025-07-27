import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SupplierDashboard from "./SupplierDashboard";
import VendorDashboard from "./VendorDashboard";

const Dashboard = () => {
  const role = localStorage.getItem("role"); // e.g., "SUPPLIER" or "VENDOR"

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 py-10 px-4">
        {role === "SUPPLIER" ? (
          <SupplierDashboard />
        ) : role === "VENDOR" ? (
          <VendorDashboard />
        ) : (
          <div className="text-center text-red-500 font-semibold">
            ❌ No valid role found. Please log in again.
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default Dashboard;
