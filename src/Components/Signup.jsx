import React, { useState } from "react";
import Header from "./Header";

import { Link, useNavigate } from "react-router-dom";
import { CheckSignup } from "../utils/validation";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setvalidationError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault();

    setvalidationError("");

    const message = CheckSignup(name, email, password);

    if (message) {
      setvalidationError(message);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        updateProfile(user, {
          displayName: name,
        })
          .then(() => {
            const { uid, email, displayName } = auth.currentUser;
            console.log(user)
            console.log(auth.currentUser)
            dispatch(
              addUser({ uid: uid, email: email, displayName: displayName })
            );
            setName("");
            setEmail("");
            setPassword("");
            navigate("/browse");
          })
          .catch((error) => {
            setvalidationError(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setvalidationError(errorCode + " " + errorMessage);
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
          <h1 className="text-center text-2xl underline">Sign up</h1>
          <label htmlFor="name">Name</label>
          <input
            className="p-1 w-[250px] text-md border-1 border-white rounded-sm"
            autoComplete="text"
            required
            value={name}
            id="name"
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
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
            Already have an Account?{" "}
            <Link to={"/"} className="text-blue-600 text-md font-bold">
              Login
            </Link>
          </p>
          <p className="text-center text-red-400">{validationError}</p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
