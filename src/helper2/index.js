// import { useContext } from "react"

// import GlobalContext from "../context/GlobalContext"

// const gContext = useContext(GlobalContext);
// export const alertInfo = (info) =>{

//     gContext.toggleAlertBox();
//     gContext.setAlertinfo(info);
   
//     //create a model for alert box and pass alertinfo as props
// }

export const totalJobs = () => {
    return fetch(`https://api.jobstextile.com/no-of-jobs`, {
      method: "GET"
    })
      .then((res) => {
        return res.json();
      })
  
      .catch((err) => {
        console.log(err);
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
        console.log(err);
      });
  }


  // https://github.com/Chandra-mohan31/jobportalfrontend