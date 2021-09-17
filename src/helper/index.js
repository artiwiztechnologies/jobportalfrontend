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

export const SigninCompany = (user) => {
    return  fetch(`${API}companylogin`,{
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


export const getCompanyWithId = (uid,token) =>{
    return fetch(`${API}company/${uid}`,{
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


export const refreshToken = (ref_token) => {
    return fetch(`${API}refresh`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${ref_token}`
        }
    })
    .then(res =>{
        // let data = isAuthenticated();
        // console.log(data);
        
        // data.access_token=res.access_token;
        // console.log(data)
        return res.json()
    })
    .catch(err => console.log(err));
}


export const updateCompanyDetails = (token,uid,edited_data) => {
    return  fetch(`${API}company/${uid}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
            
        },
        body: JSON.stringify(edited_data)

    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const updateUserDetails = (token,uid,edited_data) => {
    return  fetch(`${API}user/${uid}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
            
        },
        body: JSON.stringify(edited_data)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}


export const imageUpload = (tkn,imgfile) =>{
    const formData = new FormData();
    formData.append('file',imgfile);
    
    return fetch(`${API}uploadcompanyphoto`,{
        method:"POST",
        
        headers:{
            
            
            Authorization: `Bearer ${tkn}`
        },
        body: formData
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>{
        console.log(err)
    })
    
}


export const UserImageUpload = (tkn,imgfile) =>{
    const formData = new FormData();
    formData.append('file',imgfile);
    
    return fetch(`${API}uploaduserphoto`,{
        method:"POST",
        
        headers:{
            
            
            Authorization: `Bearer ${tkn}`
        },
        body: formData
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>{
        console.log(err)
    })
    
}

export const UserResumeUpload = (tkn,resume) =>{
    const formData = new FormData();
    formData.append('file',resume);
    
    return fetch(`${API}user/upload-resume`,{
        method:"POST",
        
        headers:{
            
            
            Authorization: `Bearer ${tkn}`
        },
        body: formData
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>{
        console.log(err)
    })
    
}

