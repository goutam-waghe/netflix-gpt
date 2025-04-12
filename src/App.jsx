import "./App.css";


import { useDispatch } from "react-redux";
;
import { auth } from "./utils/firebase";
import { addUser, removeUser } from "./utils/userSlice";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Browse from "./Components/Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React,{ useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
      } else {
        dispatch(removeUser());
      }
    });
  }, []);


  const appRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);
  return (
    <div>
      
        <RouterProvider router={appRoutes} />

    </div>
  );
}

export default App;
