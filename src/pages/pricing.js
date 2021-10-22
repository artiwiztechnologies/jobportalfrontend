import React, { useEffect, useState } from "react";
import Link from "next/link";
import PageWrapper from "../components/PageWrapper";
import { displayRazorpay, fetchOrderData, isAuthenticated, ValidatePayment,getPlans, getUserWithId, getCompanyWithId } from "../helper";
import logo from "../assets/Textilejobs2.png";
import { v4 as uuidv4 } from 'uuid';

const Pricing = () => {
  const [plans,setPlans] = useState();
  const [username,setUsername] = useState();
  const [phnnum,setPhnnum] = useState();
  const [disabled,setDisabled] = useState(true);
  
  useEffect(()=>{
    getPlans()
      .then(data=>{
        console.log(data);
        setPlans(data.plans)
      })
      if(isAuthenticated()){
        setDisabled(false);

      if(isAuthenticated().user_id){
        getUserWithId(isAuthenticated().user_id,isAuthenticated().access_token)
          .then(d1=>{
            console.log(d1)
            setPhnnum(d1.phonenumber);
            setUsername(d1.name);
          })
          .catch(err=>{
            alert(err)
          })
      }else if(isAuthenticated().company_id){
          getCompanyWithId(isAuthenticated().company_id,isAuthenticated().access_token)
            .then(d2=>{
              console.log(d2);
              setPhnnum(d2.phonenumber)
              setUsername(d2.name);
            })
            .catch(err=>{
              alert(err);
            })
      }
    }
    else{
      alert("you are not signed in,please do signin to access our plans!")
    }
    //get the  user info with user id
  },[])
  const [orderId,setOrderId] = useState('');
  
  const initiatePayment = () =>{
    
      
    
    console.log("initiatepayment")
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



async function displayRazorpay(plan_id) {
 
    const res = await initiatePayment()

    const orderFetchData = {
      "plan_id": plan_id,
      "user_id": isAuthenticated().user_id,
      "email": isAuthenticated().email,
      "user_type": isAuthenticated().type
  }

    const data = await  fetchOrderData(orderFetchData)
      // .then(data=>{
      //   console.log(data)
      //   setOrderId(data.id)
      //   setAmount(data.amount)
      // })

    // console.log(data)




    if(!res){
      alert("razor pay SDK failed");
      return
    }

    if(!data){
      alert("cant get payment data from the server!");
      return
    }

    console.log(data)
    

    
    
    const options = {
      key: "rzp_test_V7OA6RGtfz7ILD",
      
      currency: 'INR',
      amount: data.amount,
      name: "basic plan",
      description: "you have opted for the basic plan",
      image: logo ,
      // id: uuidv4(),
      // order_id: "order_I8VB1HVFciWXC5",
      order_id: data.id,

      
      
      handler: function (response) {
        console.log(response)
        const req_data = {
          
            "razorpay_payment_id": response.razorpay_payment_id,
            "razorpay_order_id": response.razorpay_order_id,
            "razorpay_signature": response.razorpay_signature,
            "plan_id":plan_id,
            "type":isAuthenticated().type
        
        }
        console.log(req_data)
        ValidatePayment(req_data,isAuthenticated().access_token)
          .then(d1=>{
            console.log(d1);
            alert(d1.message);
          })
        // alert("PAYMENT ID ::" + response.razorpay_payment_id);
        // alert("ORDER ID :: " + response.razorpay_order_id);
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
                            <li className="mb-6 text-black-2 d-flex font-size-4">
                              <i className="fas fa-check font-size-3 text-black-2 mr-3"></i>{" "}
                              5 Job Postings
                            </li>
                            <li className="mb-6 text-black-2 d-flex font-size-4">
                              <i className="fas fa-check font-size-3 text-black-2 mr-3"></i>{" "}
                              90 Days Duration Each
                            </li>
                            <li className="mb-6 text-black-2 d-flex font-size-4">
                              <i className="fas fa-check font-size-3 text-black-2 mr-3"></i>{" "}
                              Job Alert Emails
                            </li>
                          </ul>
                        </div>
                        {/* <!-- card-body end --> */}
                        {/* <!-- card-footer end --> */}
                        <div className="card-footer bg-transparent border-0 px-0 py-0">
                          
                            <button disabled={disabled} onClick={()=>{
                              displayRazorpay(plan.id)
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
