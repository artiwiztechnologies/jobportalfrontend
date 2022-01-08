import { useState } from "react";
import { useEffect } from "react";

import PageWrapper from "../components/PageWrapper";

// {/* <script type="application/javascript" src="{HOST}/merchantpgpui/checkoutjs/merchants/{MID}.js" crossorigin="anonymous"></script> */}
function paytmpayment() {

    const MerchantID = "mlpZrq88573078670457"
    const Merchant_key = "b0z4TdXl#Az7GxIA"
    const HOST = "https://securegw-stage.paytm.in";
    function onScriptLoad(txnToken, orderId, amount) {
      var config = {
          "root": "",
          "flow": "DEFAULT",
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
              console.log("payment status ", data);  
              alert("Your payment status : ",data.STATUS);
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

    useEffect(()=>{
       

        console.log("hey")
        const script = document.createElement('script');
        script.src = `https://securegw-stage.paytm.in//merchantpgpui/checkoutjs/merchants/${MerchantID}.js`;
        document.body.appendChild(script);
    },[])
    const [paymentStatus,setPaymentStatus] = useState();
    return (
      <PageWrapper>
      <div className="header pt-11 pos-abs-tl w-100">
        <div className="container">
        {/* <button onClick={makePayment}>PAY USING PAYTM</button> */}
        </div>
      </div>
      <div className="404-page bg-default min-h-100vh flex-all-center pt-lg-15 pt-xxl-17 pt-27 pb-lg-0 pb-18">
        <div className="container">
        <button onClick={(e)=>{
          e.preventDefault();

          let test_tkn =  "9a4d3738c1fc42ad9b130fb892fc5a2a1640762409089";
          let test_order_id = "3988826153154";
          
          onScriptLoad(test_tkn,test_order_id,"1.00");
        }}>PAY USING PAYTM</button>
        </div>
      </div>
    </PageWrapper>
    )
}

export default paytmpayment

