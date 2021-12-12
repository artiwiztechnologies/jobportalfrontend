import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import PageWrapper from "../components/PageWrapper";
import { displayRazorpay, fetchOrderData, isAuthenticated, ValidatePayment,getPlans, getUserWithId, getCompanyWithId, updateAuthData } from "../helper";
import logo from "../assets/Textilejobs2.png";
import { v4 as uuidv4 } from 'uuid';
import router from "next/router";
import { printRes ,alertInfo,alertSuccess,alertWarning, startFreeTrial} from "../helper2";
import GlobalContext from "../context/GlobalContext";



const Pricing = () => {
  const [plans,setPlans] = useState();
  const [username,setUsername] = useState();
  const [phnnum,setPhnnum] = useState();
  const [disabled,setDisabled] = useState(true);

  // printRes(process.env.RAZOR_PAY_PK)

  // if(d2.error === 'token_expired'){
  //   updateAuthData(isAuthenticated())

  // }

  const getDataRequired = () =>{
  getPlans()
    .then(data=>{
      printRes(data);
      setPlans(data.plans)
      if(data.error==="token_expired"){
        updateAuthData(isAuthenticated())
        getDataRequired();
      }
    })
    if(isAuthenticated()){
      setDisabled(false);

    if(isAuthenticated().user_id){
      getUserWithId(isAuthenticated().user_id,isAuthenticated().access_token)
        .then(d1=>{
          printRes(d1)
          setPhnnum(d1.phonenumber);
          setUsername(d1.name);
        })
        .catch(err=>{
          alertWarning(err)
        })
    }else if(isAuthenticated().company_id){
        getCompanyWithId(isAuthenticated().company_id,isAuthenticated().access_token)
          .then(d2=>{
            printRes(d2);
            setPhnnum(d2.phonenumber)
            setUsername(d2.name);
            
            
          })
          .catch(err=>{
            alertWarning(err);
          })
    }
  }
  else{
    alertWarning("you are not signed in,please do signin to access our plans!")
  }
  }
  
  useEffect(()=>{

    //get the  user info with user id
    getDataRequired()
  },[])
  const [orderId,setOrderId] = useState('');
  
  const initiatePayment = () =>{
    
      
    
    printRes("initiatepayment")
    return new Promise((resolve)=>{
      const script = document.createElement('script');
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(script)
      script.onload = () =>{
          resolve(true)
          
      } 
      script.onerror = () =>{
          resolve(false)
      }
    })
   
  }



const [amount,setAmount] = useState();



async function displayRazorpay(plan_id,planname) {
 
    const res = await initiatePayment()

    const orderFetchData = {
      "plan_id": plan_id,
      "user_id": isAuthenticated().user_id ? isAuthenticated().user_id : isAuthenticated().company_id,
      "email": isAuthenticated().email,
      "user_type": isAuthenticated().type
  }

    const data = await  fetchOrderData(orderFetchData,isAuthenticated().access_token)
      // .then(data=>{
      //   printRes(data)
      //   setOrderId(data.id)
      //   setAmount(data.amount)
      // })

    printRes(data)




    if(!res){
      alertWarning("razor pay SDK failed");
      return
    }

    if(!data){
      alertWarning("cant get payment data from the server!");
      return
    }

    printRes(data)
    
    
    
    
    const options = {
      key: "rzp_test_HG5GAR8YfRNzGa",
      
      currency: 'INR',
      amount: data.amount,
      name: planname,
      description: `You have opted for the ${planname} plan.`,
      image: logo ,
      // id: uuidv4(),
      // order_id: "order_I8VB1HVFciWXC5",
      order_id: data.id,

      
      
      handler: function (response) {
        printRes(response)
        const req_data = {
          
            "razorpay_payment_id": response.razorpay_payment_id,
            "razorpay_order_id": response.razorpay_order_id,
            "razorpay_signature": response.razorpay_signature,
            "plan_id":plan_id,
            "user_type":isAuthenticated().type
        
        }
        printRes(req_data)
        ValidatePayment(req_data,isAuthenticated().access_token)
          .then(d1=>{
            printRes(d1);
            // alertSuccess(d1.message);
            if(d1.message==="Valid payment."){
              alertSuccess(d1.message);
            // if(isAuthenticated().user_id){
            //   router.push("/search-grid");
            // }else{
            //   router.push("/dashboard-settings");
            // }
            
            }else{
              alertInfo(d1.message);
            }
          })
        // alertInfo("PAYMENT ID ::" + response.razorpay_payment_id);
        // alertInfo("ORDER ID :: " + response.razorpay_order_id);
      },
      prefill: {
        name: username,
        email: isAuthenticated().email,
        contact: phnnum,
      },
    };
  
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
 
  const gContext = useContext(GlobalContext);

  const subscribeToFreeTrial = (plan_data) =>{
    startFreeTrial(isAuthenticated().access_token,plan_data)
    .then(data=>{
      printRes(data);
      if(data.error){
        updateAuthData(isAuthenticated())
        subscribeToFreeTrial(plan_data)
      }else{
        alertInfo(data.message)
      }

    })
    .catch(err=>{
      printRes(err)
    })
  }
  return (
    <>
      <PageWrapper>
        <div className="pt-md pt-17">
          {/* <!-- pricing area function start --> */}
          {/* <!-- pricing section --> */}
          <div className="pricing-area">
            <div className="container pt-12 pt-lg-24 pb-13 pb-lg-25">
              <div className="row justify-content-center">
                <div
                  className="col-xxl-6 col-lg-7 col-md-9"
                  data-aos="fade-in"
                  data-aos-duration="1000"
                  data-aos-delay="500"
                >
                  {/* <!-- section-title start --> */}
                  <div className="section-title text-center mb-12 mb-lg-18 mb-lg-15 pb-lg-15 pb-0">
                    <h2 className="mb-9">
                      Check our amazing plans, choose the best one for you.
                    </h2>
                    <p className="text-default-color font-size-4 px-5 px-md-10 px-lg-15 px-xl-24 px-xxl-22">
                      Complete Design Toolkit – huge collection of elements,
                      rich customization options, flexible layouts.
                    </p>
                  </div>
                  {/* <!-- section-title end --> */}
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-xxl-10 col-xl-11">
                  <div className="row justify-content-center">
                   {
                     plans?.map((plan)=>(
                      <div
                      key={plan.id}
                      className="col-lg-4 col-md-6 col-xs-9"
                      data-aos="fade-right"
                      data-aos-duration="1000"
                      data-aos-delay="500"
                    >
                      {/* <!-- card start --> */}
                      <div className="card border-mercury rounded-8 mb-lg-3 mb-9 px-xl-12 px-lg-8 px-12 pb-12 hover-shadow-hitgray">
                        {/* <!-- card-header start --> */}
                        <div className="card-header bg-transparent border-hit-gray-opacity-5 text-center pt-11 pb-8">
                          <div className="pricing-title text-center">
                            <h5 className="font-weight-semibold font-size-6 text-black-2">
                              {plan.plan_name}
                            </h5>
                            <h6 className="font-size-4 text-gray font-weight-normal">
                              For single person only
                            </h6>
                          </div>
                          <h2 className="mt-11 text-dodger">
                          {`₹${plan.plan_rate}`}
                            <span className="font-size-4 text-smoke font-weight-normal">
                              {`/${plan.duration} days`}
                            </span>{" "}
                          </h2>
                        </div>
                        {/* <!-- card-header end --> */}
                        {/* <!-- card-body start --> */}
                        <div className="card-body px-0 pt-11 pb-15">
                          <ul className="list-unstyled">

                          {
                           plan.description.map(des=>(
                            <li className="mb-6 text-black-2 d-flex font-size-4">
                              <i className="fas fa-check font-size-3 text-black-2 mr-3"></i>{" "}
                              {des}
                            </li>
                           ))
                          }
                            
                            {/* <li className="mb-6 text-black-2 d-flex font-size-4">
                              <i className="fas fa-check font-size-3 text-black-2 mr-3"></i>{" "}
                                Perfect Job in a month
                            </li>
                            <li className="mb-6 text-black-2 d-flex font-size-4">
                              <i className="fas fa-check font-size-3 text-black-2 mr-3"></i>{" "}
                              Technical consultancy
                            </li>
                            <li className="mb-6 text-black-2 d-flex font-size-4">
                              <i className="fas fa-check font-size-3 text-black-2 mr-3"></i>{" "}
                              Latest Tech Updates
                            </li>
                            <li className="mb-6 text-black-2 d-flex font-size-4">
                              <i className="fas fa-check font-size-3 text-black-2 mr-3"></i>{" "}
                              Abroad Opportunities
                            </li>
                            <li className="mb-6 text-black-2 d-flex font-size-4">
                              <i className="fas fa-check font-size-3 text-black-2 mr-3"></i>{" "}
                              One Technical webinar
                            </li> */}
                          </ul>
                        </div>
                        {/* <!-- card-body end --> */}
                        {/* <!-- card-footer end --> */}
                        <div className="card-footer bg-transparent border-0 px-0 py-0">
                          
                            <button onClick={()=>{
                              if(isAuthenticated()){
                              if(plan.trial){
                                const plan_data = {
                                  "plan_id": plan.id,
                                  "email": isAuthenticated().email,
                                  "user_type": isAuthenticated().type
                                }
                                subscribeToFreeTrial(plan_data)
                                
                                // startFreeTrial(isAuthenticated().access_token,plan_data)
                                //   .then(data=>{
                                //     printRes(data);
                                //     if(data.message){
                                //       alertInfo(data.message);
                                //     }

                                //   })
                                //   .catch(err=>{
                                //     printRes(err)
                                //   })
                              }else{
                                printRes(plan)
                              displayRazorpay(plan.id,plan.plan_name)
                              }
                              }else{
                                alertInfo('Please login to subscribe!')
                                gContext.toggleSignInModal();
                              }
                            }} className="btn btn-green btn-h-60 text-white rounded-5 btn-block text-uppercase">
                              {`Start with ${plan.plan_name}`}
                            </button>
                          
                        </div>
                        {/* <!-- card-footer end --> */}
                      </div>
                      {/* <!-- card end --> */}
                    </div>
                     ))
                   }
                    
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- pricing area function end --> */}
        </div>
      </PageWrapper>
    </>
  );
};
export default Pricing;