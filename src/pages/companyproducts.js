import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { getAllProducts } from "../helper3";
// import companyProductStyles from "../styles/Companyproduct.module.css";
import Link from "next/link";
import {isAuthenticated, updateAuthData} from "../helper";
const CompanyProducts = () => {
  const [companies,setCompanies] = useState();
  const [hover,setHover] = useState(false);

  const divStyle = {
      cursor:"pointer",
      width: "350px",
      height: "fit-content"
      // transform:"scale(1.5)"
  } 
  const divStyle1 = {
      cursor: "pointer",
      width:"350px"
      
  }

  const getProducts = () =>{
    getAllProducts(isAuthenticated().access_token)
    .then(data=>{
      if(data.error && data.error==="token_expired"){
        updateAuthData(isAuthenticated())
        getProducts();
      }else{
      console.log(data);
      setCompanies(data.companies);
      }
      // console.log(data.product);
      // setProducts(data.product);

    })
  }
  useEffect(()=>{
    getProducts()
  },[companies])
  return (
    <>
        <PageWrapper>
      <div className="bg-default-2 pt-16 pb-12 pt-lg-22 pb-lg-27">
        <div className="row justify-content-center">

        

        {
            companies?.map(comp=>(
              <div className="d-flex flex-column align-items-center my-10">
                <h4>Products of {comp.name}</h4>
                <div className="d-sm-flex flex-row align-items-center justify-content-center flex-wrap my-5">
                  {
                    comp?.products?.map(prod=>(
                      <div style={{
                        cursor:"pointer",
                        width: "350px",
                        // width: "fit-content",
                        
                        height: "fit-content",
                        boxShadow:"inherit",
                        // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        boxShadow:"rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px"
                      }}  onMouseEnter={()=>{
                        setHover(true);
                      }} onMouseLeave={()=>{
                        setHover(false)
                      }} className="card mb-3 mx-10 my-5">
              <img style={{
                height: "250px",
                width:"250px",
                objectFit:"contain",
                margin: "10px"
              }} src={prod.photoURL ? prod.photoURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAm6dU5JsOoX02Rm2pRIq0hW6uIQ8VC8h42w&usqp=CAU"} alt="product image" />
              <div class="card-body">
                <h5 class="card-title">{prod.name}</h5>
                <p>{prod.description}</p>
                <span>Units: {prod.units} Price: Rs.{prod.price}</span>
                <div className="d-flex align-items-center">
                <img
                          src={prod.company_photo ? prod.company_photo : "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found-300x169.jpg"}
                          className="align-self-center circle-54 mr-3 mt-2"
                          alt="image not found"
                        />
                      <h6 className="mb-0">
                        
                          <a className="mb-0 font-size-4 font-weight-semibold heading-default-color line-height-reset">
                            {prod.company_email}
                          </a>
                        
                      </h6>
                     
                    </div>
                {/* price */}
              </div>

          </div>
                    ))
                  }
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
export default CompanyProducts;

// container d-xs-flex flex-col flex-sm-row justify-content-center align-items-center flex-wrap

// <div class="card mb-3 mx-3 bg-white">
//               <img class="card-img-top" src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" alt="Card image cap" />
//               <div class="card-body">
//                 <h5 class="card-title">Product Name</h5>
//                 <span>Units available</span>
//                 <p class="card-text">description</p>
//                 {/* price */}
//                 <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
//               </div>
//           </div>