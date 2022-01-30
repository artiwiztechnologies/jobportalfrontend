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
               "name":"TextileJobs",
               "logo":"data:image/png;base64,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",
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