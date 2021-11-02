// import { useContext } from "react"

import Notiflix from "notiflix";

// import GlobalContext from "../context/GlobalContext"

// const gContext = useContext(GlobalContext);
// export const alertInfo = (info) =>{

//     gContext.toggleAlertBox();
//     gContext.setAlertinfo(info);
   
//     //create a model for alert box and pass alertinfo as props
// }

let API = "https://api.jobstextile.com/";

export const totalJobs = () => {
    return fetch(`https://api.jobstextile.com/no-of-jobs`, {
      method: "GET"
    })
      .then((res) => {
        return res.json();
      })
  
      .catch((err) => {
        printRes(err);
      });
  }

  export const totalCompanies = () => {
    return fetch(`https://api.jobstextile.com/no-of-companies`, {
      method: "GET"
    })
      .then((res) => {
        return res.json();
      })
  
      .catch((err) => {
        printRes(err);
      });
  }
let dev = true;
  export const printRes = (res) =>{
    if(dev){
    console.log(res)
    }
  }


  // export const alertDetails = (info) =>{
  //   Notiflix.Notify.info(info,{
  //     position: "center-top"
  //   })
  // }

  export const alertSuccess = (info) =>{
    Notiflix.Notify.success(info,{
      position: "center-top"
    })
  }

  export const alertInfo = (info) =>{
    Notiflix.Notify.info(info,{
      position: "center-top",
      timeout: "3000",
      showOnlyTheLastOne: true
    })
  }

  export const alertWarning = (info) =>{
    Notiflix.Notify.warning(info,{
      position: "center-top"
    })
  }



  export const getApplicantsList = (token) => {
    return fetch(`${API}applicants`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  export const getUser = (u_id, tkn) => {
    return fetch(`${API}user/${u_id}`, {
      method: "GET",
      headers: {
        // Accept: "application/json",
        // "Content-Type": "application/json",
        Authorization: `Bearer ${tkn}`,
      },
    })
      .then((res) => {
        return res.json();
      })
  
      .catch((err) => {
        console.log(err);
      });
  };




