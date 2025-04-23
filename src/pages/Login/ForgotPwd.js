import React, { useState } from "react";
import axios from "axios";

const ForgotPwd = ({ setView }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://sweet-appreciation-production.up.railway.app/api/auth/forgot-password", { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleForgotPassword}>
        <input 
          type="email" 
          placeholder="Enter your email" 
          required 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <button type="submit">Reset Password</button>
      </form>
      <p onClick={() => setView("signin")}>Back to Sign In</p>
    </div>
  );
};

export default ForgotPwd;
