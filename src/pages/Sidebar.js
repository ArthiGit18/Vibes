import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHome, FaLeaf, FaUtensils, FaDumbbell, FaSmile, FaCog, FaUser, FaAdjust } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Sidebar Toggle Button */}
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>

      {/* Sidebar Drawer */}
      <motion.div 
        className={`sidebar ${isOpen ? "open" : ""}`} 
        initial={{ x: "-100%" }} 
        animate={{ x: isOpen ? 0 : "-100%" }} 
        transition={{ duration: 0.3 }}
      >
        <ul className="menu">
          <li><Link to="/" onClick={() => setIsOpen(false)}><FaHome /> Home</Link></li>
          <li><Link to="/my-routine" onClick={() => setIsOpen(false)}><FaLeaf /> My Routine</Link></li>
          <li><Link to="/healthy-food" onClick={() => setIsOpen(false)}><FaUtensils /> Healthy Food</Link></li>
          <li><Link to="/exercise" onClick={() => setIsOpen(false)}><FaDumbbell /> Exercise</Link></li>
          <li><Link to="/faceandhair-massage" onClick={() => setIsOpen(false)}><FaSmile /> Face & Hair Care</Link></li>
          <li><Link to="/beauty-tips" onClick={() => setIsOpen(false)}><FaLeaf /> Body Care Tips</Link></li>
        </ul>

        {/* Bottom Section */}
        <div className="bottom-menu">
          <ul>
            <li><Link to="/settings" onClick={() => setIsOpen(false)}><FaCog /> Settings</Link></li>
            <li><Link to="/login" onClick={() => setIsOpen(false)}><FaUser /> User Login</Link></li>
            <li><FaAdjust /> Dark / Light Mode</li>
          </ul>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
