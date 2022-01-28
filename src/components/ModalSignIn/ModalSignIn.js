import React, { useContext, useEffect, useState } from "react";

import styled from "styled-components";
import { Modal } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
import { authenticate, SigninUser } from "../../helper";
import { useRouter } from "next/router";
import {toast,ToastContainer} from "react-nextjs-toast";
import { printRes,alertInfo,alertSuccess,alertWarning, totalJobs, totalCompanies, forgotPass } from "../../helper2";

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const ModalSignIn = (props) => {
  const router = useRouter();
  const [showPass, setShowPass] = useState(true);
  const gContext = useContext(GlobalContext);
  const [phonenumber,setPhonenumber] = useState("");
  const [password,setPassword] = useState("");
  const [errorSgn,setErrorSgn] = useState(false);
  const [errormsg,setErrormsg] = useState("");
  const [totaljobs,setTotaljobs] = useState();
  const [totalcompanies,setTotalcompanies] = useState();

  useEffect(()=>{
    totalJobs()
      .then(data=>{
        setTotaljobs(data.total)
        // printRes(data);
      })
    totalCompanies()
      .then(data=>{
        setTotalcompanies(data.total);
      })
  },[])

  const handleClose = () => {
    gContext.toggleSignInModal();
  };

  const togglePassword = () => {
    setShowPass(!showPass);
  };

  const signinUser = () =>{
    
    let user = {
      "phonenumber": phonenumber,
      "password": password
  }
  //printRes
      // printRes(user)
      SigninUser(user)
        .then((data)=>{
          if(data.message==="Invalid Credentials!" || data.message==="User not found!"){
              // alertInfo(data.message);
              // toast.notify(data.message)
              setErrorSgn(true);
              setErrormsg(data.message);
              
          }
          else{
            
            setPhonenumber("");
            setPassword("");
            if(data.status==2){
              

              authenticate(data,()=>{
                // printRes("signed in and authenticated");
                printRes("signed in and authenticated")
                
                
                gContext.toggleSignInModal();
                // router.push("/dashboard-settings-user");
                window.location.reload();
                alertSuccess("Welcome!,your Login was successful!")
                
  
               
              })

            }else{
              // printRes(data)
              if(data.message == 'Waiting for admin approval.'){
                alertInfo(data.message)
              }else{
                gContext.toggleSignInModal();

                // gContext.setEmailresendId(data.id);
                // router.push("/dashboard-settings-user")
                gContext.toggleConfirmEmail();
              }
             
            }
            
           
          }
        })
        .catch(err=>{
          alertWarning("server error")
        })

  }

  const ErrorMessage = () =>(
    <span className="text-danger mb-2 ">
      {errormsg}
    </span>
  )

  return (
    <ModalStyled
      {...props}
      size="lg"
      centered
      show={gContext.signInModalVisible}
      onHide={gContext.toggleSignInModal}
    >
      <Modal.Body className="p-0">
        <button
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
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
                    Welcome
                  </h3>
                  
                  <p className="mb-0 font-size-4 text-white">
                    Log in to continue your account and explore new jobs.
                  </p>
                </div>
                <div className="border-top border-default-color-2 mt-auto">
                  <div className="d-flex mx-n9 pt-6 flex-xs-row flex-column">
                    <div className="pt-5 px-9">
                      <h3 className="font-size-7 text-white">{totaljobs}</h3>
                      <p className="font-size-3 text-white gr-opacity-5 line-height-1p4">
                        Total jobs posted 
                      </p>
                    </div>
                    <div className="pt-5 px-9">
                      <h3 className="font-size-7 text-white">{totalcompanies}</h3>
                      <p className="font-size-3 text-white gr-opacity-5 line-height-1p4">
                        Total companies registered
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-6">
              <div className="bg-white-2 h-100 px-11 pt-11 pb-7">
              <h4 className="text-success mx-auto mb-5 text-center">User Login</h4>
              {
                      errorSgn && <ErrorMessage />
                    }

                <form action="/">
                  <div className="form-group">
                  
                    <label
                      htmlFor="phone"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Phonenumber
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter mobile number"
                      id="phonenumber"
                      value={phonenumber}
                      onChange={e => setPhonenumber(e.target.value)}

                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="password"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Password
                    </label>
                   
                    <div className="position-relative">
                      <input
                        type={showPass ? "password" : "text"}
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
                          togglePassword();
                        }}
                      >
                        <span className="d-none">none</span>
                        
                      </a>
                      
                    </div>
                  </div>
                  <div className="form-group d-flex flex-wrap justify-content-between">
                    <label
                      htmlFor="terms-check"
                      className="gr-check-input d-flex  mr-3"
                    >
                      <input
                        className="d-none"
                        type="checkbox"
                        id="terms-check"
                      />
                      <span className="checkbox mr-5"></span>
                      
                      <span className="font-size-3 mb-0 line-height-reset mb-1 d-block">
                        Remember password
                      </span>
                    </label>
                    <a
                    style={{
                      cursor: "pointer"
                    }}
                      onClick={()=>{
                        let forgetdata = {
                          "phonenumber":phonenumber
                        }
                        if(phonenumber.length != 0){
                        forgotPass(forgetdata)
                          .then(data=>{
                            alertInfo(data.message)
                            printRes(data.message);
                            gContext.toggleSignInModal();
                            router.push("/forgot-password")
                            
                          })
                          .catch(err=>{
                            alertWarning(err)
                          })
                      }
                      else{
                        alertWarning("Please enter phonenumber!")
                      }}
                      }
                      className="font-size-3 text-dodger line-height-reset"
                    >
                      Forget Password
                    </a>
                    
                    
                  </div>
                  <div className="form-group mb-8">
                    <button className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase" onClick={(e)=>{
                      e.preventDefault();
                      printRes(phonenumber);
                      printRes(password);
                      if(password.length != 0 && phonenumber.length != 0){
                        signinUser();
                      }else{
                        alertInfo("please enter valid credentials");
                      }
                      
                    }}>
                      Log in as Individual
                    </button>
                    <p className="text-center">(or)</p>
                    
                  </div>
                  <p className="font-size-4 text-center heading-default-color">
                    Don’t have an account?{" "}
                    <button onClick={(e)=>{
                      e.preventDefault();
                      gContext.toggleSignUpModal();
                      gContext.toggleSignInModal();
                      
                    }} className="text-primary border-0">
                      Create a free account
                    </button>
                  </p>
                </form>
                <button className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase" onClick={(e)=>{
                      e.preventDefault();
                      gContext.toggleSignInModal();
                      printRes(gContext.signinComp)
                      gContext.toggleSigninCompany();
                    }}>Login as company</button>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </ModalStyled>
  );
};

export default ModalSignIn;
