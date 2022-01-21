import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import PageWrapper from "../components/PageWrapper";
// import { Select } from "../components/Core";
import {
  delJobsByJobId,
  getJobFromId,
  getPostedJobByCompanyFromId,
  isAuthenticated,
  updateAuthData,
} from "../helper";
import GlobalContext from "../context/GlobalContext";
import CompanyEditJobModal from "../components/CompanyEditJobModal/CompanyEditJobModal";
import {
  printRes,
  alertInfo,
  alertSuccess,
  alertWarning,
  
} from "../helper2";

import {
  deleteProduct,
  getCompanyProducts, toggleProductEnable
  
} from "../helper3";


import { Modal } from "react-bootstrap";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { padStart } from "lodash";
import { useRouter } from "next/router";


// const defaultJobs = [
//   { value: "pd", label: "Product Designer" },
//   { value: "gd", label: "Graphics Designer" },
//   { value: "fd", label: "Frontend Developer" },
//   { value: "bd", label: "Backend Developer" },
//   { value: "cw", label: "Content Writer" },
// ];

const ConfirmDeleteModal = ({ delModal, setDelModal, pid }) => {
  const [yes, setYes] = useState(false);

  const delProd = () =>{
    deleteProduct(pid,isAuthenticated().access_token)
      .then(data=>{
        if(data.error && data.error === "token_expired"){
          updateAuthData(isAuthenticated());
          delProd(pid)
        }else{
          console.log(data);
          alertInfo("Product deleted successfully!")
        }
      })
  }

  return (
    <div>
      <Modal
        size="sm-down"
        show={delModal}
        onHide={() => {
          setDelModal(false);
        }}
        backdrop="static"
      >
        <Modal.Header>
          <button
            type="button"
            className="circle-32 btn-reset bg-white pos-abs-tr mt-n6 mr-lg-n6 focus-reset shadow-10"
            onClick={() => {
              setDelModal(false);
            }}
          >
            <i className="fas fa-times"></i>
          </button>
          <Modal.Title className="mx-auto text-center">
            Are you sure you want to delete this Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-auto text-center">
          <div
            className="btn btn-primary ml-3"
            style={{ cursor: "pointer" }}
            onClick={() => {
              printRes(pid);
              delProd();
              setDelModal(false);
            }}
          >
            YES
          </div>
          <div
            className="btn btn-danger ml-3"
            style={{ cursor: "pointer" }}
            onClick={() => {
              printRes("cancelled!");
              setDelModal(false);
            }}
          >
            NO
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};


// ///////////////////////////////////////////////////////////

const PostedProducts = () => {
  const [postedProds,setPostedProds] = useState([]);

  const gContext = useContext(GlobalContext);
  // const [delconfirmModal, setDelconfirmModal] = useState(false);
  // const [jobIdDel, setJobIdDel] = useState();

  const [option, setOption] = useState("");
  const [open, setOpen] = useState(false);
const [delconfirmModal,setDelconfirmModal] = useState(false);
const [pdelId,setPdelId] = useState(0);
  // const handleChange = (event) => {
  //   event.preventDefault();
  //   setAge(event.target.value);
  // };
  // console.log(option);

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleOpen = () => {
  //   setOpen(true);
  // };
  const router = useRouter();

  const getPostedProducts = () =>{
      getCompanyProducts(isAuthenticated().company_id,isAuthenticated().access_token)
        .then(data=>{

          if(data.error && data.error==="token_expired"){
            updateAuthData(isAuthenticated())
            getPostedProducts()

          }else{
            console.log(data);
            setPostedProds(data.products)
            
          }
        })
  }


  function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}    
    
postedProds.sort(GetSortOrder("name"));

  useEffect(() => {
    if (isAuthenticated().company_id) {
      getPostedProducts()
      
      
    } else{
      router.push("/");
    };
  }, [postedProds]);


  const delProd = (pid) =>{
    deleteProduct(pid,isAuthenticated().access_token)
      .then(data=>{
        if(data.error === "token_expired"){
          updateAuthData(isAuthenticated());
          delProd(pid)
        }else{
          console.log(data);
          alertInfo("Product deleted successfully!")
        }
      })
  }

  // const updateProd = (pid) =>{
  //   update(pid,isAuthenticated().access_token)
  //     .then(data=>{
  //       if(data.error === "token_expired"){
  //         updateAuthData(isAuthenticated());
  //         delProd(pid)
  //       }else{
  //         console.log(data);
  //         alertInfo("Product deleted successfully!")
  //       }
  //     })
  // }
  return (
    <>
      <PageWrapper
        headerConfig={{
          button: "profile",
          isFluid: true,
          bgClass: "bg-default",
          reveal: false,
        }}
      >
        <div className="dashboard-main-container mt-25 mt-lg-31">
          <div className="container">
            <div className="mb-18">
              <div className="row mb-11 align-items-center">
                <div className="col-lg-6 mb-lg-0 mb-4">
                  <h3 className="font-size-6 mb-0">
                    Posted Products {postedProds.length}
                  </h3>
                </div>
                <div className="col-lg-6">
                  <div className="d-flex flex-wrap align-items-center justify-content-lg-end">
                    {/* <p className="font-size-4 mb-0 mr-6 py-2">Filter by Product:</p> */}
                    {/* <div className="font-size-4 mb-0 mr-6 py-2" style={{
                      cursor: "pointer"
                    }}>
                      
                    </div> */}

                    {/* <div className="font-size-4 mb-0 mr-6 py-2" style={{
                      cursor: "pointer"
                    }} onClick={()=>{
              console.log("hello");
              gContext.togglePostProductModel();
              gContext.setIsPut(false);
              gContext.setPdata({
                ...gContext.pdata,
                name: "",
                description: "",
                photo: null,
                units:0,
                price:""
              })
            }}>
            <span  className="mr-5 d-inline-block">+</span>Post a Product
             
            </div> */}

            <div className="my-5" onClick={()=>{
              console.log("hello");
              gContext.togglePostProductModel();
              gContext.setIsPut(false);
              gContext.setPdata({
                ...gContext.pdata,
                name: "",
                description: "",
                photo: null,
                units:0,
                price:""
              })
            }}>
              <a className="btn btn-primary btn-xl w-100 text-uppercase">
                <span  className="mr-5 d-inline-block">+</span>Post a New Product
              </a>
            </div>
                    

                    <div className="h-px-48">
                      {/* <FormControl sx={{ m: 100, minWidth: 220 }}> */}
                      {/* <FormControl style={{ minWidth: 120 }}>
                        <Select
                          labelId="demo-controlled-open-select-label"
                          id="demo-controlled-open-select"
                          open={open}
                          onClose={handleClose}
                          onOpen={handleOpen}
                          value={option}
                          label="jobs"
                          onChange={(e) => setOption(e.target.value)}
                        >
                          <MenuItem value="">All</MenuItem>
                          {listJobs.map((job, i) => (
                            <MenuItem key={i} value={job}>
                              {job}
                            </MenuItem>
                          ))}
                          
                        </Select>
                      </FormControl> */}
                   
                    </div>
                  </div>
                </div>
              </div>
              {
                postedProds.length != 0 && (
                  <div className="bg-white shadow-8 pt-7 rounded pb-9 px-11">
                <div className="table-responsive ">
                <table className="table table-striped">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="pl-0 border-0 font-size-4 font-weight-normal"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="pl-4 border-0 font-size-4 font-weight-normal"
                          >
                            Description
                          </th>
                          <th
                            scope="col"
                            className="pl-4 border-0 font-size-4 font-weight-normal"
                          >
                            Units
                          </th>
                          <th
                            scope="col"
                            className="pl-4 border-0 font-size-4 font-weight-normal"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            className="pl-4 border-0 font-size-4 font-weight-normal"
                          >
                            enabled
                          </th>
                          <th
                            scope="col"
                            className="pl-4 border-0 font-size-4 font-weight-normal"
                          ></th>
                          <th
                            scope="col"
                            className="pl-4 border-0 font-size-4 font-weight-normal"
                          ></th>
                        </tr>
                      </thead>
                      <tbody>
                        

                        
                            {
                              postedProds.map(prod=>(
                                <tr className="border border-color-2">
                              <th
                                scope="row"
                                className="pl-6 border-0 py-7 min-width-px-235"
                              >
                                <div className="">
                                   {
                                     prod.name
                                   }
                                </div>
                              </th>
                              <td className="table-y-middle py-7 min-width-px-135">
                                <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                                  {prod.description}
                                </h3>
                              </td>
                              <td className="table-y-middle py-7 min-width-px-125">
                                <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                                  {prod.units}
                                </h3>
                              </td>
                              <td className="table-y-middle py-7 min-width-px-155">
                                <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                                  Rs.{prod.price}
                                </h3>
                              </td>
                              <td className="table-y-middle py-7 min-width-px-205">
                                {/* <h3 className="font-size-4 font-weight-bold text-black-2 mb-0">
                                  {prod.enabled.toString()}
                                </h3> */}
                                {/* <input type="" */}
                                
                               {
                                <input type="checkbox" checked={prod.enabled} onChange={()=>{
                                  toggleProductEnable(prod.id,isAuthenticated().access_token)
                                    .then(data=>{
                                      if(data.error==="token_expired"){
                                        updateAuthData(isAuthenticated())
                                        toggleProductEnable(prod.id,isAuthenticated().access_token)
                                          .then(d1=>{
                                            alert(d1.message);
                                          })
                                      }else{
                                      console.log(data);
                                      // alert(data.message);
                                      }
                                    })
                                }} /> 
                               }

                              </td>
                              <td className="table-y-middle py-7 min-width-px-80">
                                <span
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    
                                    
                                   console.log("edit")
                                   gContext.setIsPut(true);
                                   gContext.setProductIdtoUpdate(prod.id)
                                   gContext.setPdata({
                                     ...gContext.pdata,
                                     name:prod.name,
                                     description:prod.description,
                                     price:prod.price,
                                     units:prod.units,
                                     photo:null
                                   })
                                   gContext.togglePostProductModel();
                                   

                                  }}
                                  className="font-size-3 font-weight-bold text-green text-uppercase"
                                >
                                  Edit
                                </span>
                              </td>
                              <td className="table-y-middle py-7 min-width-px-100">
                                <span
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    console.log("delete");
                                    // delProd(prod.id)
                                    setDelconfirmModal(true);
                                    setPdelId(prod.id);
                                 
                                  }}
                                  className="font-size-3 font-weight-bold text-red-2 text-uppercase"
                                >
                                  Delete
                                </span>
                              </td>
                            </tr>
                              ))
                            }
                       
                      </tbody>
                    </table>
                </div>
   
              </div>
                )
              }
            </div>
          </div>

          <ConfirmDeleteModal
            delModal={delconfirmModal}
            setDelModal={setDelconfirmModal}
            pid={pdelId}
          />
        </div>
      </PageWrapper>
    </>
  );
};
export default PostedProducts;