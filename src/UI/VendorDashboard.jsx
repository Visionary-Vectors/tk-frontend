import React from "react";
import { useNavigate } from "react-router-dom";

const VendorDashboard = () => {
  const navigate = useNavigate();



  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Vendor Dashboard</h2>
      </div>

      <p>Vendor-specific content goes here...</p>
    </div>
  );
};

export default VendorDashboard;
