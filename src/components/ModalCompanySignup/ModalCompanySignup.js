import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
// 211
import signUpStyles from "../../styles/SignupCompany.module.css";
import {signup, signUpCompany} from "../../helper/index.js";
import { printRes,alertInfo,alertSuccess,alertWarning, totalJobs,totalCompanies } from "../../helper2";


const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const ModalCompanySignUp = (props) => {
  const [showPassFirst, setShowPassFirst] = useState(true);
  const [showPassSecond, setShowPassSecond] = useState(true);
  const [email,setEmail] = useState("");
  const [phonenumber,setPhonenumber] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPass,setConfirmPass] = useState("");
  const [companyname,setCompanyname] = useState("");
  const [tcompanies,setTcompanies] = useState();
  const [tjobs,setTjobs] = useState();

  useEffect(()=>{
    totalJobs().then(data => setTjobs(data.total));
    totalCompanies().then(data => setTcompanies(data.total));
  },[])
  
  const [address,setAddress] = useState("");
  const [agreed,setAgreed] = useState(false);
    const [photo,setPhoto] = useState();
  const gContext = useContext(GlobalContext);
  const handleClose = () => {
    gContext.toggleSignupCompanyModal();
  };

  const togglePasswordFirst = () => {
    setShowPassFirst(!showPassFirst);
  };

  const togglePasswordSecond = () => {
    setShowPassSecond(!showPassSecond);
  };

  const validateFields = () =>{
    // let valid = false;
    var phoneno = /^\d{10}$/;
    
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    printRes("valid email!");
  }else{
    alertWarning("Please enter a valid email id!");
    return false;
  }

  if(!phonenumber.match(phoneno)){
    alertWarning("Enter a valid phonenumber!");
    printRes("invalud phonenumber!");
    return false;
  }

  if(password.length < 5){
    alertWarning("Please enter a strong password,it must contain more than 5 letters!")
    return false;
  }

  return true;
  }

  const signUpUser = () =>{
    if(confirmPass === password && companyname.length != 0 && email && password && phonenumber ){
      // let user = {
      //   email:email,
      //   password:password,
      //   phonenumber:phonenumber,
      //   status:"2"
  
      // }
      let company = {
        "name": companyname,
        "phonenumber": phonenumber,
        "email": email,
        
        "password": password,
        
        "active": false,
        "status":1//in production 1 ,for test 2
    }
    if(agreed){
      if(validateFields())
        signUpCompany(company)
          .then(data => {
            printRes(data);
            if(data.message === "Company created successfully."){
              // alertSuccess("signup success");
                setCompanyname("");
                setAddress("");
                setConfirmPass("");
                setPassword("");
                setEmail("");
                setPhonenumber("");
                gContext.toggleSignupCompanyModal();
                gContext.toggleConfirmEmail()

                // gContext.toggleSignInModal();

                
            }else{
              alertWarning(data.message);
            }
        })
      }else{
        alertInfo("Please agree to the terms and conditions!")
      }
    }
    else{
      alertInfo("Please check the fields you entered!");
    }
    
  }
  

  return (
    <ModalStyled
      {...props}
      size="lg"
      centered
      show={gContext.signupCompanyModal}
      onHide={gContext.toggleSignupCompanyModal}
    >
      <Modal.Body className="p-0">
        <button
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-n6 mr-lg-n6 focus-reset shadow-10"
          onClick={handleClose}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="login-modal-main bg-white rounded-8 overflow-hidden">
          <div className="row no-gutters">
            <div className="col-lg-5 col-md-6">
              <div className="pt-10 pb-6 pl-11 pr-12 bg-black-2 h-100 d-flex flex-column dark-mode-texts">
                <div className="pb-9">
                  <h3 className="font-size-8 text-white line-height-reset pb-4 line-height-1p4">
                    Create a free account today
                  </h3>
                  <p className="mb-0 font-size-4 text-white">
                    Create your account to continue and explore new jobs.
                  </p>
                </div>
                <div className="border-top border-default-color-2 mt-auto">
                  <div className="d-flex mx-n9 pt-6 flex-xs-row flex-column">
                    <div className="pt-5 px-9">
                      <h3 className="font-size-7 text-white">{tjobs}</h3>
                      <p className="font-size-3 text-white gr-opacity-5 line-height-1p4">
                        Total Jobs posted 
                      </p>

                    </div>
                    <div className="pt-5 px-9">
                      <h3 className="font-size-7 text-white">{tcompanies}</h3>
                      <p className="font-size-3 text-white gr-opacity-5 line-height-1p4">
                        Total Companies registered
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-6">
              <div className="bg-white-2 h-100 px-11 pt-11 pb-7">
         
         
                
              <div className="form-group">
                    <label
                      htmlFor="name"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Company Name
                    </label>
                    <input
                      type="email"
                      placeholder="enter the name of your company"
                      className="form-control"
                      value={companyname}
                      onChange={e => setCompanyname(e.target.value)}
                      
                      id="c_name"
                    />
                  </div>
                <form action="/">
                  <div className="form-group">
                    <label
                      htmlFor="email2"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="example@gmail.com"
                      id="email2"
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="phonenumber"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                     Phone-Number
                    </label>
                    <input
                      
                      className="form-control"
                      value={phonenumber}
                      onChange={e => setPhonenumber(e.target.value)}
                      placeholder="1234567899"
                      id="number"
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="password"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Password <span className="text-danger font-size-3">*should be atleast 5 characters long</span>
                    </label>
                    <div className="position-relative">
                      <input
                        type={showPassFirst ? "password" : "text"}
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                      <a
                        href="/#"
                        className="show-password pos-abs-cr fas mr-6 text-black-2"
                        onClick={(e) => {
                          e.preventDefault();
                          togglePasswordFirst();
                        }}
                      >
                        <span className="d-none">none</span>
                      </a>
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="password2"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Confirm Password
                    </label>
                    <div className="position-relative">
                      <input
                        type={showPassSecond ? "password" : "text"}
                        className="form-control"
                        id="password2"
                        placeholder="Enter password"
                        value={confirmPass}
                        onChange={e => setConfirmPass(e.target.value)}
                      />
                      <a
                        href="/#"
                        className="show-password pos-abs-cr fas mr-6 text-black-2"
                        onClick={(e) => {
                          e.preventDefault();
                          togglePasswordSecond();
                        }}
                      >
                        <span className="d-none">none</span>
                      </a>
                    </div>

                  </div>

                  {/* <div className="form-group">
                    <label
                      htmlFor="address"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Company Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      placeholder="enter company address"
                      id="address"
                    />
                  </div> */}


                  
                  
                  <div className="form-group d-flex flex-wrap justify-content-between mb-1">
                    <label
                      htmlFor="terms-check2"
                      className="gr-check-input d-flex  mr-3"
                    >
                      <input
                        className="d-none"
                        type="checkbox"
                        id="terms-check2"
                        checked={agreed}
                        onChange={()=>{
                          setAgreed(!agreed);
                        }}
                      />
                      <span className="checkbox mr-5"></span>
                      <span className="font-size-3 mb-0 line-height-reset d-block">
                        Agree to the{" "}
                        <a href="/terms-and-conditions" className="text-primary">
                          Terms &amp; Conditions
                        </a>
                      </span>
                    </label>
                   
                  </div>
                  <div className="form-group mb-8">
                    <button className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase" onClick={(e)=>{
                      e.preventDefault();
                      printRes("signup");
                      signUpUser();
                      
                      
                      
                    }}>
                      Sign Up{" "}as Company
                    </button>
                  </div>
                  <p className="text-center">(or)</p>
                  <div className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase" onClick={(e)=>{
                      e.preventDefault();
                      gContext.toggleSignupCompanyModal();
                      gContext.toggleSignUpModal();

                      
                    //   printRes(gContext.signupCompanyModal);
                      
                  }}>Signup as a user</div>
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </ModalStyled>
  );
};

export default ModalCompanySignUp;
