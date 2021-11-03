import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import ModalSignIn from "../ModalSignIn/ModalSignIn";
import GlobalContext from "../../context/GlobalContext";

// 211
import {signup} from "../../helper/index.js";
// import AlertModal from "../AlertModal/AlertModal";

import {printRes, totalCompanies,totalJobs,alertInfo,alertSuccess,alertWarning} from "../../helper2/index.js";


const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const ModalSignUp = (props) => {
  const [showPassFirst, setShowPassFirst] = useState(true);
  const [showPassSecond, setShowPassSecond] = useState(true);
  const [email,setEmail] = useState("");
  const [photourl,setPhotourl] = useState("");
  const [name,setName] = useState("");
  const [address,setAddress] = useState("");
  const [phonenumber,setPhonenumber] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPass,setConfirmPass] = useState("");
  const [agreed,setAgreed] = useState(false);

  

  const gContext = useContext(GlobalContext);
  const handleClose = () => {
    gContext.toggleSignUpModal();
  };

  const togglePasswordFirst = () => {
    setShowPassFirst(!showPassFirst);
  };

  const togglePasswordSecond = () => {
    setShowPassSecond(!showPassSecond);
  };

  const signUpUser = () =>{
    if(confirmPass === password && name.length != 0 && email && password ){
      // let user = {
      //   email:email,
      //   password:password,
      //   phonenumber:phonenumber,
      //   status:"2"
  
      // }
      let user = {
        "name": name,
        "phonenumber": phonenumber,
        "email": email,
        
        "password": password,
        
        "active": false,
        "status":1//change to 1 on moving production 
    }

    if(agreed){
      signup(user)
        .then(data => {
          if(data.message==="User created successfully."){
          printRes(data);
          alertSuccess("success")
          // <AlertModal info={data.message} show={true}   />

          setName("");
          setEmail("");
          setAddress("");
          setPhonenumber("");
          setPhotourl("");
          setPassword("");
          setConfirmPass("");
          gContext.toggleSignUpModal()
          gContext.toggleConfirmEmail()
          }else{
            alertWarning(data.message)
            // <AlertModal info={data.message} show={true}   />
            // alertInfo(data.message)
          }
          
        })
    }else{
      alertInfo("Please agree to terms and conditions!");
    }
   
  }
  else{
    alertInfo("Please check the fields you entered!");
  }
    
  }

  const [totalJob , setTotalJob] = useState();
  const [totalComp , setTotalComp] = useState();

  

  useEffect(() => {
    totalJobs().then(data => setTotalJob(data.total));
    totalCompanies().then(data => setTotalComp(data.total));

  }, [])

  return (
    <ModalStyled
      {...props}
      size="lg"
      centered
      show={gContext.signUpModalVisible}
      onHide={gContext.toggleSignUpModal}
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
                      <h3 className="font-size-7 text-white">{totalJob}</h3>
                      <p className="font-size-3 text-white gr-opacity-5 line-height-1p4">
                        Total Jobs posted 
                      </p>
                    </div>
                    <div className="pt-5 px-9">
                      <h3 className="font-size-7 text-white">{totalComp}</h3>
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
                {/* <div className="row">
                  <div className="col-4 col-xs-12">
                    <a
                      href="/#"
                      className="font-size-4 font-weight-semibold position-relative text-white bg-allports h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4"
                    >
                      <i className="fab fa-linkedin pos-xs-abs-cl font-size-7 ml-xs-4"></i>{" "}
                      <span className="d-none d-xs-block">
                        Import from LinkedIn
                      </span>
                    </a>
                  </div>
                  <div className="col-4 col-xs-12">
                    <a
                      href="/#"
                      className="font-size-4 font-weight-semibold position-relative text-white bg-poppy h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4"
                    >
                      <i className="fab fa-google pos-xs-abs-cl font-size-7 ml-xs-4"></i>{" "}
                      <span className="d-none d-xs-block">
                        Import from Google
                      </span>
                    </a>
                  </div>
                  <div className="col-4 col-xs-12">
                    <a
                      href="/#"
                      className="font-size-4 font-weight-semibold position-relative text-white bg-marino h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4"
                    >
                      <i className="fab fa-facebook-square pos-xs-abs-cl font-size-7 ml-xs-4"></i>{" "}
                      <span className="d-none d-xs-block">
                        Import from Facebook
                      </span>
                    </a>
                  </div> 
                </div> */}
                {/* <div className="or-devider">
                  <span className="font-size-3 line-height-reset">Or</span>
                </div> */}
                <form action="/">
                <div className="form-group">
                    <label
                      htmlFor="email2"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Name
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="your Name"
                      id="email2"
                    />
                  </div>
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
                      required

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
                      required

                      value={phonenumber}
                      onChange={e => setPhonenumber(e.target.value)}
                      placeholder="1234567899"
                      id="number"
                    />
                  </div>
                  {/* <div className="form-group">
                    <label
                      htmlFor="phonenumber"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                     Address
                    </label>
                    <input
                      
                      className="form-control"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      placeholder="Enter your address"
                      id="number"
                    />
                  </div> */}
                  <div className="form-group">
                    <label
                      htmlFor="password"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Password
                    </label>
                    <div className="position-relative">
                      <input
                        type={showPassFirst ? "password" : "text"}
                      required

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
                      required

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
                      htmlFor="phonenumber"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                     Photo
                    </label>
                    <input type="file" value={photourl} onChange={e => setPhotourl(e.target.value)} id="inputGroupFile01"></input>
                    {/* <label class="custom-file-label" for="inputGroupFile01">Choose file</label> */}
                    {/* <input
                      type="file"
                      className="form-control"
                      value={phonenumber}
                      onChange={e => setPhonenumber(e.target.value)}
                      placeholder="1234567899"
                      id="number"
                    /> */}
                  {/* </div>  */}
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
                          setAgreed(!agreed)
                        }}
                      />
                      <span className="checkbox mr-5"></span>
                      <span className="font-size-3 mb-0 line-height-reset d-block">
                        Agree to the{" "}
                        <a href="/terms-and-conditions" target="_blank" className="text-primary">
                          Terms &amp; Conditions
                        </a>
                      </span>
                    </label>
                   
                  </div>
                  {/* <div className="form-group mb-8">
                    <button className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase" onClick={(e)=>{
                      e.preventDefault();
                      printRes("signup");
                      signUpUser();
                      
                      
                    }}>
                      Sign Up{" "}
                    </button>
                  </div> */}
                  <div className="form-group mb-8">
                    <button className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase" onClick={(e)=>{
                      e.preventDefault();
                      printRes("signup");
                      signUpUser();
                      
                      
                      
                    }}>
                      Sign Up{" "}as User
                    </button>
                  </div>
                  <p className="text-center">(or)</p>
                  <button className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase" onClick={(e)=>{
                      e.preventDefault();
                      gContext.toggleSignupCompanyModal();
                      gContext.toggleSignUpModal();

                      
                      printRes(gContext.signupCompanyModal);
                      
                  }}>Signup as a Company</button>
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </ModalStyled>
  );
};

export default ModalSignUp;