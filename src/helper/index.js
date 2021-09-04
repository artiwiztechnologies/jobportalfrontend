// let API = "https://menubackend9.herokuapp.com/";
let API = "https://api.jobstextile.com/";
export const signup = (user) => {
    return  fetch(`${API}register`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user)

    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}


export const signUpCompany = (company) => {
    return  fetch(`${API}companyregister`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(company)

    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
    
}

export const SigninUser = (user) => {
    return  fetch(`${API}login`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user)

    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}


export const authenticate = (data,next) =>{
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt",JSON.stringify(data))
        // console.log(data.access_token);
        next();
    }
}

export const isAuthenticated = () => {
    if (typeof window === "undefined") {
      return false;
    }
    if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
    } else {
      return false;
    }
  };

export const signout = (next,token) => {
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt")
        next();
        return fetch(`${API}logout`,{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
            
        })
        .then(response=>{
            console.log("signout success");
            //return response.json();
        })
        .catch(err=>console.log(err))
        // return fetch(`${API}signout`,{
        //     method:"GET"
            
        // })
        // .then(response=>{
        //     console.log("signout success");
        //     //return response.json();
        // })
        // .catch(err=>console.log(err))
    }
}

export const getUserWithId = (uid,token) =>{
    return fetch(`${API}user/${uid}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => {
        return res.json();
    })
    .catch(err =>{
        console.log(err)
    })
}


