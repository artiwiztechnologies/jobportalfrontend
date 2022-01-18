import React, { useContext, useEffect, useState } from "react";
import {useRouter} from "next/router"
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
import { authenticate, SigninCompany,isAuthenticated, getCompanyWithId, refreshToken, postJob, updateAuthData } from "../../helper";
import { alertInfo, printRes,alertSuccess,alertWarning  } from "../../helper2";


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

  const [price,setPrice] = useState();


  
  




 

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
                      
                      
                      // onChange={handleChange("career_level")}

                    />
                  </div>

                  



                  <button className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase" onClick={(e)=>{
                      e.preventDefault();
                      
                  }}>POST</button>

                  
                 
                  
                </form>
        </div>
       
        
      </Modal.Body>
      </div>
    </ModalStyled>
  );
};

export default CompanyPostProduct;
