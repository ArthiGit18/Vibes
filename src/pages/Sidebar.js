import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaLeaf, FaUtensils, FaDumbbell, FaSmile, FaCog, FaUser, FaAdjust } from "react-icons/fa";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const colors = [
  { bg: "white", text: "black" },
  { bg: "#FFEDFA", text: "black" },
  { bg: "#CDC1FF", text: "black" },
  { bg: "#2A004E", text: "white" },
  { bg: "#092635", text: "white" },
  { bg: "black", text: "white" },
];

const Sidebar = () => {
  // const [isOpen, setIsOpen] = useState(true);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("white");
  const [userName, setUserName] = useState(null);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setUserName(parsedData.fullName || null);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserName(null);
    setLogoutOpen(false);
    navigate("/login");
    window.location.reload();
  };

  const updateBackground = (bgColor) => {
    const selected = colors.find((c) => c.bg === bgColor);
    const textColor = selected ? selected.text : "black";

    document.body.style.backgroundColor = bgColor;
    document.body.style.color = textColor;

    const container = document.querySelector(".container");
    if (container) {
      container.style.backgroundColor = bgColor;
      container.style.color = textColor;
    }

    const sidebarNew = document.querySelector(".sidebar-new");
    if (sidebarNew) {
      sidebarNew.style.backgroundColor = bgColor;
      sidebarNew.style.color = textColor;
    }
  };

  const changeBackground = (bgColor) => {
    setBackdropOpen(true);
    setSelectedColor(bgColor);

    setTimeout(() => {
      updateBackground(bgColor);
      setBackdropOpen(false);
    }, 2000);
  };



  return (
    <div className="sidebar-new">
      {/* <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>☰</div> */}

      <motion.div
        // className={`sidebar ${isOpen ? "open" : ""}`}
        // initial={{ x: "-100%" }}
        // animate={{ x: isOpen ? 0 : "-100%" }}
        // transition={{ duration: 0.3 }}
        className="sidebar open" // always has 'open'
        initial={{ x: 0 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ul className="menu">

          <li>
            <Link to="/" className="link">
              <img src="../../assets/logo/2.png" alt="Logo" className="logo" />
            </Link>
          </li>
          <li><Link to="/" className="link"><FaHome /> Home</Link></li>
          <li><Link to="/my-routine" className="link"><FaLeaf /> My Routine</Link></li>
          <li><Link to="/healthy-food" className="link"><FaUtensils /> Healthy Food</Link></li>
          <li><Link to="/exercise" className="link"><FaDumbbell /> Exercise</Link></li>
          <li><Link to="/faceandhair-massage" className="link"><FaSmile /> Face & Hair Care</Link></li>
          <li><Link to="/beauty-tips" className="link"><FaLeaf /> Body Care Tips</Link></li>
        </ul>

        {/* Color Selector */}


        {/* Bottom Section */}
        <div className="bottom-menu">
          <ul>
            <li><Link to="/settings" ><FaCog /> Settings</Link></li>

            {/* User Login / Logout */}
            <li
              onClick={() => {
                if (userName) {
                  setLogoutOpen(true);
                } else {
                  navigate("/login");
                }
              }}
              style={{ cursor: "pointer" }}
            >
              <FaUser /> {userName ? userName : "User Login"}
            </li>

            <li><FaAdjust />Set Dark / Light Mode</li>
            <div className="color-selector">
              {colors.map(({ bg }) => (
                <div
                  key={bg}
                  className={`color-box ${selectedColor === bg ? "selected" : ""}`}
                  style={{ backgroundColor: bg }}
                  onClick={() => changeBackground(bg)}
                ></div>
              ))}
            </div>
          </ul>
        </div>
      </motion.div>

      {/* MUI Backdrop for Loading */}
      <Backdrop sx={{ color: "#fff", zIndex: 1300 }} open={backdropOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Logout Confirmation Modal */}
      <Modal open={logoutOpen} onClose={() => setLogoutOpen(false)}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "white",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
          textAlign: "center"
        }}>
          <Typography variant="h6" gutterBottom>Are you sure you want to logout?</Typography>
          <Button variant="contained" color="error" onClick={handleLogout} sx={{ m: 1 }}>Logout</Button>
          <Button variant="outlined" onClick={() => setLogoutOpen(false)}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Sidebar;
