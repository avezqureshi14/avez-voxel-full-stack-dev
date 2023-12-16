import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import StartupForm from "./pages/Create";
import Update from "./pages/Update";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
const App = () => {
  return (
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/new" element={<StartupForm />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
  );
};

export default App;
