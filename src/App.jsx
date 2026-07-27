import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Coinpage from "./pages/Coinpage";
import "./App.css";

const App = () => {
  return (
    
      <div
        style={{
          backgroundColor: "#14161a",
          color: "white",
          minHeight: "100vh",
        }}
      >
        <Header />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/coins/:id" element={<Coinpage />} />
        </Routes>
        
      </div>
    
  );
};

export default App;
