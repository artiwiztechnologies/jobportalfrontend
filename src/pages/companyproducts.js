import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { getAllProducts } from "../helper3";
// import companyProductStyles from "../styles/Companyproduct.module.css";
import Link from "next/link";
import {isAuthenticated, updateAuthData} from "../helper";
import { Modal } from "react-bootstrap";
import {useRouter} from "next/router"
import { alertWarning } from "../helper2";


/////////////////////////////

const ShowDesc = ({ desc, setDescModel,descModel}) => {
 


  return (
    <div>
      <Modal
        size="sm-down"
        show={descModel}
        onHide={() => {
          setDescModel(false);
        }}
        backdrop="static"
      >
        <Modal.Header>
          <button
            type="button"
            className="circle-32 btn-reset bg-white pos-abs-tr mt-n6 mr-lg-n6 focus-reset shadow-10"
            onClick={() => {
              setDescModel(false);
            }}
          >
            <i className="fas fa-times"></i>
          </button>
          <Modal.Title className="mx-auto text-center">
            Description
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-auto text-center">
          <div>
         {desc}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};


///////////////////////////////////////
const CompanyProducts = () => {
  const [companies,setCompanies] = useState();
  const [hover,setHover] = useState(false);
  const [desc,setDesc] = useState();
  const [descModel,setDescModel] = useState(false);

  const router = useRouter();
  
  const truncate = (str) => {
    return str.length > 26 ? str.substring(0,26) + "...": str;
  }
  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

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
    if(isAuthenticated().active){
      getProducts()
    }else{
      alertWarning("Please subscribe to a plan!")
      router.push("/pricing");
    }
  },[companies])
  return (
    <>
        <PageWrapper>
      <div className="bg-default-2 pt-16 pb-12 pt-lg-22 pb-lg-27">
        <div className="row justify-content-center">

        

        {
            companies?.map(comp=>(
              <div className="d-flex flex-column align-items-center my-10">
                <h4>Products of <span className="font-weight-bold text-primary">{capitalize(comp.name)}</span></h4>
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
                // width:"250px",
                objectFit:"contain",
                // margin: "10px",
                display: "block",
                marginLeft:"auto",
                marginRight:"auto",
                width: "250px",
                
                
                

              }} src={prod.photoURL ? prod.photoURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAm6dU5JsOoX02Rm2pRIq0hW6uIQ8VC8h42w&usqp=CAU"} alt="product image" />

              <hr style={{
                borderBottom:"1.5px #00b074"
              }} />
              <div class="card-body">
                <h5 class="text-primary">{capitalize(prod.name)}</h5>
                {
                  prod.description.length > 26  ? <p onClick={()=>{
                    setDesc(prod.description);
                    setDescModel(true)
                  }}>{capitalize(truncate(prod.description))}</p> : <p>{capitalize(prod.description)}</p>
                }
                <span><span className="font-weight-bold" style={{
                  color: "#00b074"
                }}>Price:</span>{` Rs.${prod.price}`} <span className="font-weight-bold" style={{
                  color: "#00b074",
                  marginLeft:"10px"
                }}> Units:</span>{" " + prod.units}</span>
                <div className="d-flex align-items-center mt-5">
                {/* <img
                          src={prod.company_photo ? prod.company_photo : "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found-300x169.jpg"}
                          className="align-self-center circle-54 mr-3 mt-2"
                          alt="image not found"
                        /> */}
                      <div className="mb-0">
                        
                        
                          <a className="mb-0 font-size-4 font-weight-semibold heading-default-color line-height-reset">
                            {capitalize(prod.company_name)}
                          </a>
                          {/* <a className="mb-0 font-size-3 heading-default-color line-height-reset">
                            last-updated: {prod.date}
                          </a> */}
                        
                      </div>
                      
                    </div>

                    <p className="mt-2 font-size-3 heading-default-color line-height-reset">
                            <span className="font-weight-bold">Edited On: </span>{" " + prod.date}
                          </p>
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

        <ShowDesc
            desc={desc}
            descModel={descModel}
            setDescModel={setDescModel}
          />
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