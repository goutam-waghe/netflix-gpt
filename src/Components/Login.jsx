import React, { useState } from "react";
import Header from "./Header";

import { Link, useNavigate } from "react-router-dom";
import { checkLogin } from "../utils/validation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setvalidationError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function submitHandler(e) {
    setvalidationError("");
    e.preventDefault();
    const message = checkLogin(email);

    if (message) {
      setvalidationError(message);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        navigate("/browse");

        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setvalidationError(errorMessage);
      });
  }

  return (
    <div
      className={`h-screen w-full bg-[url("https://assets.nflxext.com/ffe/siteui/vlv3/fa4630b1-ca1e-4788-94a9-eccef9f7af86/web/IN-en-20250407-TRIFECTA-perspective_43f6a235-9f3d-47ef-87e0-46185ab6a7e0_large.jpg")] bg-cover`}
    >
      <Header />
      <div className="w-full h-full flex justify-center items-center bg-[rgb(0,0,0,0.3)]">
        <form
          onSubmit={(e) => submitHandler(e)}
          action=""
          className="z-10 flex flex-col rounded-3xl gap-4 p-20 bg-[rgb(0,0,0,0.5)] text-white w-[400px]"
        >
          <h1 className="text-center text-2xl underline">Login</h1>
          <label htmlFor="email">email</label>
          <input
            className="p-1 w-[250px] text-md border-1 border-white rounded-sm"
            autoComplete="email"
            required
            value={email}
            id="email"
            type="email"
            placeholder="Example@gmail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">password</label>
          <div className="relative">
            <input
              className="p-1  w-[250px] text-md border-1 border-white  rounded-sm"
              autoComplete="current-password"
              id="password"
              value={password}
              required
              type={showPassword ? "text" : "password"}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute top-1 cursor-pointer right-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙉" : "🙈"}
            </span>
          </div>

          <button
            className="bg-red-600 p-2 cursor-pointer w-[250px] rounded-sm"
            type="submit"
          >
            Submit
          </button>
          <p className="text-center text-md">
            Don't have an Account?{" "}
            <Link to={"/signup"} className="text-blue-600 text-md font-bold">
              Sign up
            </Link>
          </p>
          <p className="text-center text-red-400">{validationError}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
