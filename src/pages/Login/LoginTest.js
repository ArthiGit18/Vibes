import { useState } from "react";
import axios from "axios";

const EmailTest = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/send-email", {
        email,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Failed to send email. Check console for errors.");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Test Email Sending</h2>
      <input
        type="email"
        placeholder="Enter recipient email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={sendEmail}>Send Email</button>
      <p>{message}</p>
    </div>
  );
};

export default EmailTest;
