import React from "react";
import { Logo } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";


const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
 
  function signoutHandler() {

    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  }
  return (
    <div className="absolute px-10 top-0 left-0 p-4 z-10 items-center  w-full flex justify-between">
      <img className="w-[140px]" src={Logo} alt="" />
     {
      user? <button
      onClick={signoutHandler}
      className="text-white rounded-lg py-2 px-4 bg-red-500"
    >
      Sign out
    </button>:<div></div>
     }
    </div>
  );
};

export default Header;
