import React, { useState } from "react";
import Signin from "./SignIn";
import Signup from "./SignUp";
import ForgotPwd from "./ForgotPwd";

const Login = () => {
  const [view, setView] = useState("signin");

  return (
    <div
      className="login-wrapper"
      // style={{
      //   backgroundImage: `url("/assets/pngss/1.jpg")`, 
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   height: "100vh",
      //   width: "100%",
      // }}
    >
      {view === "signin" && <Signin setView={setView} />}
      {view === "signup" && <Signup setView={setView} />}
      {view === "forgot" && <ForgotPwd setView={setView} />}
    </div>
  );
};

export default Login;
