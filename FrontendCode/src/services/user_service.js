import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/test/";
const BOOK_URL="http://localhost:8080/api/test/user/book/";
const LOC_URL="http://localhost:8080/api/test/user/seatleftbydateslot/";
const CODE_URL= "http://localhost:8080/api/test/user/availableoffice/";
const CANCEL_URL="http://localhost:8080/api/test/user/cancel/";

const MAIN_URL="http://localhost:8080/api/test/user/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};
const getAvailableSlotDetail = async (dateOfTransaction="2022-08-29",slotTime,code) =>{
  //return axios.get(API_URL + "user", { headers: authHeader() });
  
  return await axios.post(LOC_URL + code , {
    dateOfTransaction,
    slotTime
  },{
    headers: authHeader()
  })
  
};

const getLocationData =(date,place, slot)=>{
  const formatYmd = date.toLocaleDateString('en-CA').toString();

  return axios.get(CODE_URL + place +"?", {
    params: {
      date: formatYmd,
      slot:slot
    },
    
      headers:  authHeader() 
    
    });
};

const createBooking=(dateOfTransaction,slotTime,code)=>{
  dateOfTransaction = dateOfTransaction.toLocaleDateString('en-CA').toString();
  return axios.post(BOOK_URL + code , {
    dateOfTransaction,
    slotTime
  },{
    headers: authHeader()
  })

}

const getBooking=()=>{
  return axios.get(MAIN_URL+"lastbooking",{ headers: authHeader() });
}

const cancelBooking =(dateOfTransaction,slotTime,bookingId) =>{
  // dateOfTransaction = dateOfTransaction.toISOString().split('T')[0];
  return axios.post(CANCEL_URL+ bookingId, {
    dateOfTransaction,
    slotTime
  },{
    headers: authHeader()
  })

}
const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};
const UserService = {
  getPublicContent,
  getUserBoard,
  getAvailableSlotDetail,
  getLocationData,
  createBooking,
  getBooking,
  cancelBooking,
  getAdminBoard
  
};
export default UserService;