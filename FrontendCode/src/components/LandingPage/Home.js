import React, { useState, useEffect } from "react";
import UserService from "../../services/user_service";
import homepage from '../images/homepage.png';
import './Home.css';

const Home = () => {
 
  return (
    <div className="homepage">
      <div className="my-container">
        <div className="card1" >
         
          <div className="card-body" >
                <div className="one texxt">
                  <h1 className="card-title1">Seat Booking Portal</h1>
                </div>
                {/* <div className="one two">
                  <a href="/register" className="btn btn1">Sign Up</a>
                  <a href="/login" className="btn btn1">Login</a>
                </div> */}
          </div>
        </div>
        
          <img className="card-img-1" src={homepage} alt="Card image cap"/>
         
        
      </div>
    </div>
  );
};
export default Home;