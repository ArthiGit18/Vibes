import React, { useState } from "react";
import axios from "axios";

const Signup = ({ setView }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://sweet-appreciation-production.up.railway.app/api/auth/signup", {
        fullName,
        email,
        password,
      });

      const { token, userId } = response.data; // Assuming API returns these fields

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify({ fullName, email, token, userId }));

      console.log("Signup Successful:", response.data);
      alert("Signup successful! Redirecting to home page.");

      setView("signin"); // Redirect to Signin after successful signup
    } catch (error) {
      console.error("Signup Failed:", error.response?.data?.message);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input 
          type="text" 
          placeholder="Full Name" 
          required 
          value={fullName} 
          onChange={(e) => setFullName(e.target.value)} 
        />
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
        <button type="submit">Sign Up</button>
      </form>
      <p onClick={() => setView("signin")}>Already have an account? Sign in</p>
    </div>
  );
};

export default Signup;
