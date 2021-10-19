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

export const postJob = (token,j_data) =>{
    // console.log(j_data)


    return fetch(`https://api.jobstextile.com/post-job`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(j_data)
    })
    .then(res=>{
        return res.json();
    })

    .catch(err=>{
        console.log(err)
    })
}

export const getPostedJobByCompanyFromId = (c_id,tkn) =>{
    return fetch(`https://api.jobstextile.com/company-jobs/${c_id}`,{
        method:"GET",
        headers:{
            
            Authorization: `Bearer ${tkn}`
        }
    })
    .then(res=>{
        return res.json();
    })

    .catch(err=>{
        console.log(err);
    })
}

export const getAllJobs = (tkn) =>{
    return fetch(`https://api.jobstextile.com/jobs-list`,{
        method:"GET",
        
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${tkn}`
        }
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>{
        console.log(err)
    })
}

//apply for job
export const applyForJob = (user_id,job_id,tkn) =>{
    return fetch(`https://api.jobstextile.com/apply/${job_id}`,{
        method:"POST",
        
        headers:{
            
            
            Authorization:`Bearer ${tkn}`
        }
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>{
        console.log(err)
    })
}

//application details
export const getApplicationId = (application_id,tkn) =>{
    console.log("to be continued...")
}

//delete appliaction id
export const DelApplication = (application_id,tkn) =>{
    return fetch(`${API}/${application_id}`,{
        method:"DELETE",
        headers:{
            Authorization: `Bearer ${tkn}`
        }
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>{
        console.log(err)
    })
}

//get users applied for a particular job

export const GetAppliedUsers = (job_id,tkn) =>{
    return fetch(`${API}/get-users/${job_id}`,{
        method:"GET",
        headers:{
            Authorization:`Bearer ${tkn}`
        }
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>{
        console.log(err)
    })
}

//get jobs a user applied for
export const GetJobsApplied = (user_id,tkn) =>{
    return fetch(`${API}/get-jobs/${user_id}`,{
        method:"GET",
        headers:{
            Authorization:`Bearer ${tkn}`
        }
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>{
        console.log(err)
    })
}


// payment with razor pay
const paymentServerUrl = 'https://api.jobstextile.com/new-order';

export const fetchOrderData = (orderFetchData) =>{
    return fetch('https://api.jobstextile.com/new-order',{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(orderFetchData)
      })
      .then(res=>{
        return res.json()
        
      })
      
  
      .catch(err=>{
        console.log(err)
      })
}





// export async function displayRazorpay() {
 
//     // const res = await init
    

    
//     const data = await fetch(pay_url, {
//       method: "POST",

//     }).then((t) => t.json());
  
//     console.log(data);
  
//     const options = {
//       key: process.env.RAZORPAY_KEY_ID,
//       currency: data.currency,
//       amount: data.amount,
//       name: "Learn Code Online",
//       description: "Wallet Transaction",
//       image: "http://localhost:1337/logo.png",
//       order_id: data.id,
//       handler: function (response) {
//         alert("PAYMENT ID ::" + response.razorpay_payment_id);
//         alert("ORDER ID :: " + response.razorpay_order_id);
//       },
//       prefill: {
//         name: "Anirudh Jwala",
//         email: "anirudh@gmail.com",
//         contact: "9999999999",
//       },
//     };
  
//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   }


//validate payment in the server

export const ValidatePayment = (req_data) =>{

    return fetch('https://api.jobstextile.com/new-payment',{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
            
        },
        body: JSON.stringify(req_data)

      })
      .then(res=>{
        return res.json()
        
      })
      
  
      .catch(err=>{
        console.log(err)
      })

}


export const getPlans = () =>{
    return fetch(`${API}/plan-list`,{
        method:"GET"
        
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>{
        console.log(err)
    })
}