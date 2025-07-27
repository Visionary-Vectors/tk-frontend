import React from "react";
import Hero from "./Hero";
import Services from "./Services";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <>
    <Navbar />
      <Hero />
      <Services />
      <About />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
