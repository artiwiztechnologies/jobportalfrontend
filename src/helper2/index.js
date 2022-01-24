// import { useContext } from "react"

import Notiflix from "notiflix";



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
let dev = true;//change to false on production
//try window.location.hostname === "localhost" instead of checking if dev is true or not
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
      position: "center-top",
      showOnlyTheLastOne: true

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
      position: "center-top",
      showOnlyTheLastOne: true

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




export const checkSubscription = (tkn) =>{
  return fetch(`${API}check-user`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tkn}`,
    },
  })
    .then((res) => {
      return res.json();
    })

    .catch((err) => {
      console.log(err);
    });
}

//support

export const support = (issue, tkn) => {
  return fetch(`${API}/raise-issue`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tkn}`,
    },
    body: JSON.stringify(issue),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//reset password

export const resetPasswordUser = (reset_data) => {
  return fetch(`${API}user/reset-password`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      
    },
    body: JSON.stringify(reset_data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const forgotPass = (data) =>{
  return fetch(`${API}user/forgot-password`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
}


export const RejectApplication = (application_id, tkn) => {
  return fetch(
    `https://api.jobstextile.com/reject-application/${application_id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tkn}`,
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};


export const jobsList = (tkn) => {
  return fetch(`https://api.jobstextile.com/job-titles`, {
    method: "GET",
    headers: {
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


export const startFreeTrial = (tkn,plan_data) =>{
  return fetch(`https://api.jobstextile.com/freeTrial-paytm`,{
    method:"POST",
    headers:{
      Authorization:`Bearer ${tkn}`,
      Accept: "application/json",
      "Content-Type": "application/json"
      
    },
    body:JSON.stringify(plan_data)
  })
  .then(res=>{
    return res.json()
  })
  .catch(err=>{
    alertWarning(err)
  })
}


export const forgotPassCompany = (data) =>{
  return fetch(`${API}company/forgot-password`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
}


export const resetPasswordCompany = (reset_data) => {
  return fetch(`${API}company/reset-password`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      
    },
    body: JSON.stringify(reset_data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const postQuestion = (ques_data,tkn) =>{
  return fetch(`${API}post-question`, {
    method: "POST",
    headers: {
      Authorization:`Bearer ${tkn}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      
      
    },
    body: JSON.stringify(ques_data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
}

export const getPostedQuestionsSelf = (tkn,user_type) =>{
  return fetch(`${API}posted-questions/${user_type}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tkn}`,
      
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
}


export const getQuestions = (tkn,user_type) =>{
  return fetch(`${API}question-list`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tkn}`,
      
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
}


export const postComment = (tkn,comment_data) =>{
  return fetch(`${API}post-comment`,{
    method:"POST",
    headers:{
      Authorization: `Bearer ${tkn}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      
    },
    body:JSON.stringify(comment_data)
  })
  .then(res=>{
    return res.json();
  })
  .catch(err=>{
    alertWarning(err);
  })
}


export const getQuestionCommentsData = (tkn,ques_id) =>{
  return fetch(`${API}question/${ques_id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tkn}`,
      
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
}


export const newOrderPaytm = (tkn,user_type,plan_id) =>{
  const order_data = {
    "user_type":user_type,
    "plan_id":plan_id
  }
  return fetch(`${API}newOrder-paytm`,{
    method:"POST",
    headers:{
      Authorization: `Bearer ${tkn}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body:JSON.stringify(order_data)
  })
  .then(res =>{
    return res.json();
  })
  .catch(err=>{
    alertWarning(err);
  })

}


// export const validatePaytmPayment = (tkn,paytmresponsedata) =>{
  
//   console.log(paytmresponsedata)

    
//   return fetch(`${API}newPayment-paytm`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${tkn}`,
      
     

//       // "Content-Type":"application/x-www-form-urlencoded"
      
      
//     },
    
//     body: paytmresponsedata
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => console.log(err));
  
// }  

export const validatePaytmPayment = (tkn,fdata) => {
  return fetch(`${API}newPayment-paytm`,{
      method:"POST",
      headers:{
          
          "Content-Type": "application/json",
          Authorization: `Bearer ${tkn}`
      },
      body: JSON.stringify(fdata)
  })
   .then(response => {
       return response.json();
   })
   .catch(err => {
       console.log(err)
   })
}


export const getBlogList = (token) => {
  return fetch(`${API}blogs`, {
    method: "GET",
    headers: {
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

export const getBlogById = (token, blog_id) => {
  return fetch(`${API}blog/${blog_id}`, {
    method: "GET",
    headers: {
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

export const postCommentBlog = (tkn, commentData) => {
  return fetch(`${API}post-blog-comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tkn}`,
    },
    body: JSON.stringify(commentData),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};