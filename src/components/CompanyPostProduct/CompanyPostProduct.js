import React, { useContext, useEffect, useState } from "react";
import {useRouter} from "next/router"
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
import { authenticate, SigninCompany,isAuthenticated, getCompanyWithId, refreshToken, postJob, updateAuthData } from "../../helper";
import { alertInfo, printRes,alertSuccess,alertWarning  } from "../../helper2";
import { editProduct, getProductData, postCompanyProduct } from "../../helper3";


const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;j
  } */
`;
// showPostProductModel,
//         togglePostProductModel




const CompanyPostProduct = (props) => {
  const router = useRouter();
  
  // printRes(window.location.pathname)
  
  const gContext = useContext(GlobalContext);
  
  
  const handleClose = () => {
    gContext.setIsPut(false);
    gContext.setPdata({
      ...gContext.pdata,
      
        name: "",
        description: "",
        photo: null,
        units:0,
        price:""
      
      
    })
    gContext.togglePostProductModel();
  };

  
  const handleChange = name => event =>{
    setValues({
        ...values,[name]:event.target.value
    })
}
   
  const auth_data = isAuthenticated();

  const [p_name,setP_name] = useState("");
  const [photo,setPhoto] = useState();
  const [description,setDescription] = useState("");
  const [enquiryLink,setEnquiryLink] = useState();
  const [units,setUnits] = useState(0);
  const [uploadBtn,setUploadBtn] = useState(false);
  const [price,setPrice] = useState();




  
  


  
  const postanewProduct = () =>{
    const formData = new FormData();
    formData.append("name",p_name);
    formData.append("description",description);
    formData.append("price",price);
    formData.append("units",units);
    formData.append("photo",photo);
    console.log(formData);
    postCompanyProduct(formData,isAuthenticated().access_token)
      .then(data=>{
        console.log(data);
        if(data.message==="Product added successfuly."){
          alertSuccess(data.message);
          setP_name("");
          setDescription("");
          setPrice("");
          setUnits(0);
          setPhoto(null);
        }else{
          alertWarning(data.message);
        }
      })
      .catch(err=>{
        console.log(err);
      })

  }

 

  const updateProduct = () =>{
    const formData = new FormData();
    formData.append("name",p_name);
    formData.append("description",description);
    formData.append("price",price);
    formData.append("units",units);
    formData.append("photo",photo);
    console.log(formData);
    editProduct(gContext.productIdtoUpdate,formData,isAuthenticated().access_token)
      .then(data=>{
        console.log(data);
        if(data.message==="Product updated successfuly."){
          alertSuccess(data.message);
          setP_name("");
          setDescription("");
          setPrice("");
          setUnits(0);
          setPhoto(null);
          gContext.setPdata({
            ...gContext.pdata,
            
              name: "",
              description: "",
              photo: null,
              units:0,
              price:""
            
            
          })
        }else{
          alertWarning(data.message);
        }
      })
      .catch(err=>{
        console.log(err);
      })

  }

  useEffect(()=>{
    console.log("useEffect called on pdata",gContext.pdata,gContext.isPut);
    if(gContext.isPut){
      setP_name(gContext.pdata.name);
          setDescription(gContext.pdata.description);
          setPrice(gContext.pdata.price);
          setUnits(gContext.pdata.units);
          setPhoto(null);
    }else{
      setP_name("");
      setDescription("");
      setPrice("");
      setUnits(0);
      setPhoto(null);
    }
  },[gContext.pdata])
 

  // useEffect(()=>{
  //   // if(gContext.isPut){
  //   //   console.log("do put request",gContext.isPut);
      
  //   //     //get data using get request and store it in the state
  //   //     getProductData(gContext.productIdtoUpdate,isAuthenticated().access_token)
  //   //       .then(data=>{
  //   //         if(data.error==="token_expired"){
  //   //           updateAuthData(isAuthenticated())
  //   //           getProductData(gContext.productIdtoUpdate,isAuthenticated().access_token)
  //   //             .then(d=>{
  //   //               console.log(d);
  //   //               setP_name("test name");
  //   //               setDescription("test description");
  //   //               setPrice("123");
  //   //               setUnits(12);
  //   //               setPhoto(null);
  //   //             })
  //   //         }else{
  //   //           console.log(data);
  //   //           setP_name("test name");
  //   //           setDescription("test description");
  //   //           setPrice("123");
  //   //           setUnits(12);
  //   //           setPhoto(null);
  //   //         }
  //   //       })
        
    
  //   // }
  // },[])
 

  return (
    <ModalStyled
      {...props}
      size="lg"
      centered
      show={gContext.showPostProductModel}
      onHide={gContext.togglePostProductModel}
    >
    <div className="p-6">
    <Modal.Header>
      <p className="m-auto text-center">Post a new Product for <span className="font-weight-bold text-success"> {isAuthenticated().name}</span></p>
      <button
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
          onClick={handleClose}
        >
          <i className="fas fa-times"></i>
        </button>
    </Modal.Header>
      <Modal.Body className="p-0">
        
        <div className="content p-5">
        <form action="/">
                  

                  {/* job_type change it to select option */}


                  


                  
                  <div className="form-group">
                    <label
                      
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                     Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter the name of the product"
                      id="none"
                      value={p_name}
                      onChange={e=>{
                        setP_name(e.target.value)
                      }}

                    />
                  </div>
                  <div className="form-primary d-flex flex-column mb-5">

                  <label
                      
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                     Description
                    </label>
                  
                  <textarea style={{
                    border:"0.2px solid lightgray",
                    outline: "none",
                    padding:"5px"
                  }} value={description} onChange={(e)=>{
                    setDescription(e.target.value);
                  }}
                  placeholder="Give a description about your product"
                  ></textarea>

                  </div>
                  <div className="form-group mb-5">
                    <label
                      
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                     Price
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter the price of the product"
                      id="none"
                      value={price}
                      onChange={e=>{
                        setPrice(e.target.value);
                      }}
                      // onChange={handleChange("career_level")}

                    />
                  </div>
                  <div className="form-group mb-5">
                    <label
                      
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                     No of units
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter the units available"
                      id="none"
                      value={units}
                      onChange={e=>{
                        setUnits(e.target.value);
                      }}
                      // onChange={handleChange("career_level")}

                    />
                  </div>
                  <div className="form-group mb-5">
                    <label
                      
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                     Photo
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => {
                          if (e.target.files) {
                            console.log(e.target.files[0]);

                            setUploadBtn(true);
                            if (e.target.files[0]) {
                              setPhoto(e.target.files[0]);
                            }
                          }
                        }}
                      
                      
                      // onChange={handleChange("career_level")}

                    />
                  </div>

                  



                  <button className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase" onClick={(e)=>{
                      e.preventDefault();
                      if(gContext.isPut){
                        updateProduct();
                        gContext.setIsPut(false);
                      }else{
                        postanewProduct();
                      }
                      
                  }}>{gContext.isPut ? "UPDATE" : "POST"}</button>

                  
                 
                  
                </form>
        </div>
       
        
      </Modal.Body>
      </div>
    </ModalStyled>
  );
};

export default CompanyPostProduct;
