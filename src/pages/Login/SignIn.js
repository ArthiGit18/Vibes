import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = ({ setView }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signin", {
        email,
        password,
      });
  
      const { token, user } = response.data; // Extracting token and user object
  
      if (token && user) {
        // Store the token and user details in localStorage
        localStorage.setItem("user", JSON.stringify(user)); // Store user info
        localStorage.setItem("token", token); // Store token separately
  
        console.log("Login Successful:", response.data);
        alert("Login successful!");
  
        // Redirect to home page
        navigate("/");
        window.location.reload();
      } else {
        alert("Invalid login response!");
      }
    } catch (error) {
      console.error("Login Failed:", error.response?.data?.message);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignin}>
        <input 
          type="email" 
          placeholder="Email" 
          required 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          required 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Sign In</button>
      </form>
      <p onClick={() => setView("signup")}>Don't have an account? Sign up</p>
      <p onClick={() => setView("forgot")}>Forgot Password?</p>
    </div>
  );
};

export default Signin;
