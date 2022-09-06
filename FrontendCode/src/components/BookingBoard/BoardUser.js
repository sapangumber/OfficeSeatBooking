import React, { useState, useEffect } from "react";
import UserService from "../../services/user_service";
import SearchBar from "./SearchBar";
import "./BoardUser.css";


const BoardUser = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);
  return (
   <div className="dashboard-css">
     <div className="container">
     <div className="container title-book-css">
     
     <span className="title-book">Book a seat</span>
    
       </div>

       <div className="card">

       <SearchBar/>
       </div>
    
   
     
   </div>
   </div>
     
  
  );
};
export default BoardUser;