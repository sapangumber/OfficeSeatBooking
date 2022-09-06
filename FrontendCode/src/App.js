import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth_service";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/LandingPage/Home";
import Profile from "./components/UserProfile/UserProfile";
import BoardUser from "./components/BookingBoard/BoardUser";
import BoardAdmin from "./components/BoardAdmin";
import CancelSite from "./components/Cancel/CancelSite";

import EventBus from "./common/EventBus";


const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    
    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
        <span className="text">Optum</span>  
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
            <h3 className="links">Home</h3>  
            </Link>
          </li>


          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
              <h3 className="links">Admin Board</h3>  
              </Link>
            </li>
          )}

          {/* {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
              <h3 className="links">Book</h3>  
              </Link>
            </li>
          )} */}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/Profile"} className="nav-link emp-code-css">
               <h3 className="links">My Profile</h3>
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
              <h3 className="links">Logout</h3>  
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
              <h3 className="links">Login</h3>  
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
              <h3 className="links">Sign Up</h3>  
              </Link>
            </li>
          </div>
        )}
      </nav>

      
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />

          </Routes>
         
          <Routes>
          <Route path="/user" element={<BoardUser/>} />
          <Route path="/admin" element={<BoardAdmin/>} />
          <Route path="/cancel" element={<CancelSite/>} />
        </Routes>
       
     

    </div>
  );
};

export default App;