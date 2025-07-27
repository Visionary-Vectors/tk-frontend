import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Navbar from "../UI/Navbar";
import Footer from "../UI/Footer";
import ProductPage from "./ProductPage";
const VendorDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://tk-backend-n9dr.onrender.com/api/raw-materials")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching raw materials:", err));
  }, []);

  return (
    
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-6">
       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">  
          <ProductPage />
        </div>
      </div>
      
    </div>
  );
};

export default VendorDashboard;
