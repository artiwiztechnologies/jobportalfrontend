import { useRouter } from "next/router";
import React, { useEffect } from "react";
import PageWrapper from "../../../components/PageWrapper";
import {getCompanyProducts} from "../../../helper3";
import {isAuthenticated, updateAuthData} from "../../../helper";
import { useState } from "react";


const CompanyProductsPrivate = () => {
    const router = useRouter()
  const { id } = router.query
  console.log(id);

  const [products,setProducts] = useState();
  const getCompProducts = () =>{
    getCompanyProducts(isAuthenticated().company_id,isAuthenticated().access_token)
        .then(data=>{
          if(data.error==="token_expired"){
            updateAuthData(isAuthenticated())
            getCompProducts();
          }else{
          console.log(data)
          setProducts(data.products);
          }
        })
  }

  const divStyle = {
    cursor:"pointer",
    width: "350px",
    // transform:"scale(1.5)"
} 

  useEffect(()=>{
    getCompProducts()

  },[])
  return (
    <>
        <PageWrapper>
      <div className="bg-default-2 pt-16 pb-12 pt-lg-22 pb-lg-27">
        <div className="d-sm-flex flex-row align-items-center justify-content-center flex-wrap my-5">

        
        {
          products?.map(prod=>(
                      <div style={divStyle} className="card mb-3 mx-10 my-5">
              <img style={{
                height: "320px",
                width:"320px",
                objectFit:"contain",
                margin: "10px"
              }} src={prod.photoURL ? prod.photoURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAm6dU5JsOoX02Rm2pRIq0hW6uIQ8VC8h42w&usqp=CAU"} alt="product image" />
              <div class="card-body">
                <h5 class="card-title">{prod.name}</h5>
                <p>{prod.description}</p>
                <span>Units: {prod.units} Price: Rs.{prod.price}</span>
                {/* price */}
              </div>
          </div>
                    ))
        }
          

        </div>
      </div>
    </PageWrapper>
  </>
  );
};
export default CompanyProductsPrivate;
