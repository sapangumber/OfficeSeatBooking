import React, { useState,useEffect } from 'react';
import DatePicker from "react-datepicker";
import { addDays, subDays } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import UserService from "../../services/user_service";
import './SearchBar.css';

import Table from 'react-bootstrap/Table';



const containerStyle = {
    // width : "60%",
    display :  "flex",
    flexDirection:"row",
    alignContent : "space-between",
    // border:"2px solid red",
    borderRadius: 10,
    backgroundColor : "#f7f7f7",
    padding : 40,
    // marginBottom:'7px'

    
}

const containerTwoStyle = {
    // width : "60%",
    
    // border:"2px solid red",
   
    backgroundColor : "#f7f7f7",
    marginBottom:'7px',
    color:'red'
    
  

    
}

const dropDownItemStyle = {
    // border:"2px solid red",
    width: "30%",
    alignSelf:"center" ,
    marginBottom:'7px'

}


//current variable value is used in Date Picker element, value is incremented here to store the next day w.r.t current day
const current = new Date();   
console.log(current);


current.setDate(current.getDate() + 1);

console.log(current.toDateString());
const queryDate = current.toDateString();


const SearchBar = () => {


    const [place,setPlace] = useState('Location');
    const [slot,setSlot] = useState('');

    //Date Picker related attributes
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        console.log(startDate);
        setEndDate(end);
      };
    
   
  


    const [codes, setCodes] = useState([]);

  
 
    //funtion to handle click event triggered by search button
    const handleSearch =()=>{
       
        UserService.getLocationData(startDate,place,slot).then(
            (response) => {
                
                const locationData = response.data;
                console.log(locationData);
                setCodes(locationData);
            },
            (error) => {
                const _codes =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message
                    ) ||
                    error.message ||
                    error.toString();
                setCodes(_codes);
            }
            
            );

                
    };
    
    const [book,setBook] =useState('');
    let booked=true;

    const createBooking =(startDate,slot,locationCode)=>{


        UserService.createBooking(startDate,slot,locationCode).then(
        (response) =>{
            booked=true;
            console.log(response.data);
            //alert(response.data);
            setBook(response.data);
        }, (error) => {
           // booked=false;
            console.log(startDate);
            console.log(slot);
            console.log(locationCode);
            const _book =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            setBook(_book);
            }
        )
    }

    const conditionalRender= codes && codes.length>0;
    return (
            <>


            <div className="container" style={containerStyle}>
                {/* Location */}
                <div className="input-group space" style={dropDownItemStyle}>
                    <input type="text" value={place} className="form-control" 
                        aria-label="Text input with dropdown button" required="true"/>
                        
                  
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary dropdown-toggle" 
                        type="button" data-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="false"></button>

                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="#" onClick={()=>setPlace("Gurgaon")}>Gurgaon</a>
                            <a className="dropdown-item" href="#" onClick={()=>setPlace("Noida")}>Noida</a>
                            <a className="dropdown-item" href="#" onClick={()=>setPlace("Hyderabad")}>Hyderabad</a>
                            <a className="dropdown-item" href="#" onClick={()=>setPlace("Bangalore")}>Bangalore</a>
                            
                        </div>

                    </div>
                </div>
                {/* date picker*/}
                <div className="input-group space" style={dropDownItemStyle}>
                    <div style={{ border:"0.01px solid grey", borderRadius:"5px",backgroundColor:"white"}}>
                      
                    <DatePicker className="date-value"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        includeDateIntervals={[
                            { start: new Date(), end: addDays(new Date(), 6) },
                          ]}
                        placeholderText="Click to select a date"
                        
                    />
                    </div>
                </div>
                {/* <div className='input-group' style={dropDownItemStyle}>
                    <input className='date-value' min={startDate} type="date" ></input>
                </div> */}
                {/* Slots */}
                <div className="input-group space" style={dropDownItemStyle}>
                    <input type="text" value={"Slot "+slot} className="form-control" 
                        aria-label="Text input with dropdown button"/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary dropdown-toggle"  
                        type="button" 
                        data-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="false"></button>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="#" onClick={()=>setSlot("I")}>8:30AM-5:00PM</a>
                            <a className="dropdown-item" href="#" onClick={()=>setSlot("II")}>11:00AM-8:30PM</a>
                            
                        </div>
                    </div>
                </div>

                {/* Search button */}
                <div className="input-group space" style={dropDownItemStyle}>
                    <button className="btn btn-primary" type="button" onClick={()=>handleSearch()}   style={{width:'60%',borderRadius:'15px',backgroundImage:'linear-gradient(#e09f3e,#fca311)',borderStyle:'none'}}>Search</button>
                </div>


            </div>

            <div className='container' style={containerTwoStyle}>
            <p>*All fields required</p>
            </div>

            

            

            {/* Table */}

            <div className='container table'>
                <div className='card card-table'>

            <Table responsive stripped="true" size="medium">
            <thead style={{backgroundImage:'linear-gradient(to right,rgb(238, 103, 19),#f48c06'}}>
                <tr>
                    <th>Location Code</th>
                    <th>Seats Available</th>
                    
                    <th>Slot Selected</th>
                    <th>Book</th>

                </tr>
            </thead>
            <tbody>
                {   
                    conditionalRender?
                    codes.map(item => 
                        <tr>
                            <td>{item.code}</td>
                            <td>{item.seatLeft}</td>
                            <td>{slot}</td>
                            <td>{item.book ? <button className='btn btn-primary' onClick={()=>createBooking(startDate,slot,item.code)}

                            data-toggle="modal" data-target="#bookingSuccessModal" style={{borderRadius:'10px',backgroundColor:'#fca311',borderStyle:'none'}}>Book</button>: <button className='btn btn-primary' disabled onClick={()=>createBooking(startDate,slot,item.code)}

                            data-toggle="modal" data-target="#bookingSuccessModal" style={{borderRadius:'10px',backgroundColor:'#fca311',borderStyle:'none'}}>Book</button>}</td>
                             {/* Booking Success Modal */}

                             <div class="modal fade" id="bookingSuccessModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                 <div class="modal-dialog modal-dialog-centered" role="document">
                                 <div class="modal-content">
                                
                            <div class="modal-body">
                              {book}
                             </div>
                             <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={()=>handleSearch()}>Close</button>
                           
                             </div>
                            </div>
                            
                        </div>
                        </div>


                        
                        </tr>
                        ):'Fill all fields to get data'
                }
            </tbody>
            </Table>
            </div>
            </div>
            </>
        );
    
};

export default SearchBar;
