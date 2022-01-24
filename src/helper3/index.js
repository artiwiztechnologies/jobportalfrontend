let API = "https://api.jobstextile.com/";


export const postCompanyProduct = (fData,tkn) =>{
    return fetch(`${API}new-product`, {
        method: "POST",
        headers: {
          Accept:"application/json",
          Authorization:`Bearer ${tkn}`,
          
          
        },
        body: fData
      })
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          printRes(err);
        });
}

export const getAllProducts = (tkn) =>{
  return fetch(`${API}view-products`, {
    method: "GET",
   headers:{
    Accept:"application/json",

     Authorization:`Bearer ${tkn}`,

   }
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

export const getCompanyProducts = (cid,tkn) =>{
  return fetch(`${API}company-products`, {
    method: "GET",
    headers: {
      // Accept:"application/json",
      Authorization:`Bearer ${tkn}`,
      
      
    }
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

export const toggleProductEnable = (pid,tkn) =>{
  return fetch(`${API}toggle-product/${pid}`, {
    method: "GET",
    headers: {
      // Accept:"application/json",
      Authorization:`Bearer ${tkn}`,
      
      
    }
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

export const deleteProduct = (pid,tkn) =>{
  return fetch(`${API}product/${pid}`, {
    method: "DELETE",
    headers: {
      // Accept:"application/json",
      Authorization:`Bearer ${tkn}`,
      
      
    }
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
}


export const editProduct = (pid,fData,tkn) =>{
  return fetch(`${API}product/${pid}`, {
    method: "PUT",
    headers: {
      Accept:"application/json",
      Authorization:`Bearer ${tkn}`,
      
      
    },
    body: fData
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      printRes(err);
    });
}


export const getProductData = (pid,tkn) =>{
  return fetch(`${API}product/${pid}`, {
    method: "GET",
    headers: {
      // Accept:"application/json",
      Authorization:`Bearer ${tkn}`,
      
      
    }
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
}