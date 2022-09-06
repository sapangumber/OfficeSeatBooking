import React from "react";
import AuthService from "../../services/auth_service";
import DesksPic from "../images/deskspic.jpeg";
import ProfilePic from "../images/profile.jpeg";
import Booking from "../images/bookingimg.jpeg";
import Cancel from "../images/cancel.jpeg";
import "./profileup.css";

const ProfileUp =() =>{

    const currentUser = AuthService.getCurrentUser();

    return  <div className="back">
        <div className="profile-area">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="img1"><img src={DesksPic}></img></div>
                            <div className="img2"><img src={ProfilePic}></img></div>
                            <div className="main-text profile">
                            <h2>Employee ID : {currentUser.empID}</h2>
                                <p>
                                <h6>Email: {currentUser.email}</h6> 
                               
                               
                                </p>
                            </div>
                            
                        </div>

                        </div>
                        <div className="col-md-4">
                        <div className="card">
                            
                        <div className="img1"><img src={Booking}></img></div>
                            <div className="main-text">
                                <h2>Book a seat</h2>
                                <p> Book a seat as per your choice based location!
                                </p>

                                <a href="/user" className="tag">View > </a>
                            </div>

                          </div>  


                        </div>
                        
                        <div className="col-md-4">
                        <div className="card">
                           
                        <div className="img1"><img src={Cancel}></img></div>
                            <div className="main-text">
                                <h2>View or Cancel Bookings</h2>
                                <p> View or Cancel your bookings for this week from here! Click on the button!
                                
                                
                                </p>

                                <a href="/cancel" className="tag">Cancel > </a>
                            </div>
                            


                        </div>


                    </div>

                </div>
            </div>


        </div>
    </div>
    
};

export default ProfileUp;