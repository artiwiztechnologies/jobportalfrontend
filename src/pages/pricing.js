import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import PageWrapper from "../components/PageWrapper";
import { displayRazorpay, fetchOrderData, isAuthenticated, ValidatePayment,getPlans, getUserWithId, getCompanyWithId, updateAuthData } from "../helper";
import logo from "../assets/Textilejobs2.png";
import { v4 as uuidv4 } from 'uuid';
import router from "next/router";
import { printRes ,alertInfo,alertSuccess,alertWarning, startFreeTrial, newOrderPaytm, validatePaytmPayment} from "../helper2";
import GlobalContext from "../context/GlobalContext";
import Notiflix from "notiflix";



const Pricing = () => {
  const [plans,setPlans] = useState();
  const [username,setUsername] = useState();
  const [phnnum,setPhnnum] = useState();
  const [disabled,setDisabled] = useState(true);
  const [paytmtkn,setPaytmtkn] = useState("");
  const [paytmorderid,setPaytmorderid] = useState("");

  

  

  // const getPaytmOrderData = (plan_id) =>{
  //   newOrderPaytm(isAuthenticated().access_token,isAuthenticated().user_type,plan_id)
  //     .then(data=>{
  //       console.log(data);
  //     })
  // }

  // const MerchantID = "mlpZrq88573078670457";//stage

  const MerchantID = "fLioeq85351493665452";//production

    const HOST = "https://securegw.paytm.in";
    function onScriptLoad(txnToken, orderId, amount,plan_id) {
      var config = {
          "root": "",
          "flow": "WEBSTAGING",
          "merchant":{
               "name":"XYZ Enterprises",
               "logo":"https://developer.paytm.com/demo//static/images/merchant-logo.png?v=1.4",
               "redirect": false
           },
           "style":{
               "headerBackgroundColor":"#8dd8ff",
               "headerColor":"#3f3f40"
          },
          "data": {
              "orderId": orderId,
              "token": txnToken,
              "tokenType": "TXN_TOKEN",
              "amount": amount
          },
          "handler":{ 
            "notifyMerchant": (eventName,data) => {
              console.log("notify merchant about the payment state",data);
            } ,
            "transactionStatus":function(data){
              const fdata = {
                ...data,
                "plan_id":plan_id,
                "user_type":isAuthenticated().type
              }
              console.log("payment status ", fdata);  
              validatePaytmPayment(isAuthenticated().access_token,fdata)
                .then(d=>{
                  console.log(d);
                  // alertInfo(d.message);
                  if(d.message == 'Valid payment.'){
                    alertSuccess("Subscribed to a plan successfully!");
                    window.Paytm.CheckoutJS.close();
                    // router.push("/paytmpaymentstatus")
                    
                  }else{
                    alertWarning(d.message)
                  }
                })
                .catch(err=>{
                  console.log(err)
                })
             
              console.log("payment status msg", data.RESPMSG);  
              alertInfo(`your payment status is ${data.RESPMSG}`)

              // alert("Your payment status : ",data.status);
            } 
          }
          
      };

      if (window.Paytm && window.Paytm.CheckoutJS) {
          // initialze configuration using init method
          window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
              console.log('Before JS Checkout invoke');
              // after successfully update configuration invoke checkoutjs
              window.Paytm.CheckoutJS.invoke();
          }).catch(function onError(error) {
              console.log("Error => ", error);
          });
      }
  }



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

     //post req ,send planid ,rootlink,user_type to server
    //get txn_token,order_id and amount from the response
    console.log(location.origin)
   
    getDataRequired()
    const script = document.createElement('script');
    script.src = `https://securegw.paytm.in//merchantpgpui/checkoutjs/merchants/${MerchantID}.js`;
    document.body.appendChild(script);

  },[])
  const [orderId,setOrderId] = useState('');




const [amount,setAmount] = useState();




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
                              {plan.tax != 0 ? `+ ${plan.tax}% tax` : null}
                            </span>
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
                            
                          
                          </ul>
                        </div>
                        {/* <!-- card-body end --> */}
                        {/* <!-- card-footer end --> */}
                        <div className="card-footer bg-transparent border-0 px-0 py-0">
                          
                            <button onClick={(e)=>{
                              e.preventDefault();
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
                              
                                newOrderPaytm(isAuthenticated().access_token,isAuthenticated().type,plan.id)
                                  .then(data=>{
                                    console.log(data)
                                    // console.log(data.response.txnToken);
                                    if(data.message == 'Already subscribed to a plan'){
                                      alertWarning(data.message);
                                    }else{
                                    setPaytmorderid(data.response.orderId);
                                    setPaytmtkn(data.response.txnToken);
                                    onScriptLoad(data.response.txnToken,data.response.orderId,"1.00",plan.id);
                                    }
                                  })
                              // let test_tkn =  "2044e64385ee4bcdb4a9907f133c199a1641566699073";
                              // let test_order_id = "4350989728904";
                              // onScriptLoad(test_tkn,test_order_id,"1.00");
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