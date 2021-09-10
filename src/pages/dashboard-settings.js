import React, { useEffect, useState } from "react";

import PageWrapper from "../components/PageWrapper";
import { Select } from "../components/Core";

import {getUserWithId,getCompanyWithId,isAuthenticated, refreshToken, updateCompanyDetails} from "../helper/index";
import {useRouter} from "next/router";




const defaultTypes = [
  { value: "b2b", label: "B2B" },
  { value: "saas", label: "SAAS" },
  { value: "b2b", label: "b2b" },
];

const defaultEmployees = [
  { value: "10-50", label: "10-50" },
  { value: "50-100", label: "50-100" },
  { value: "100-500", label: "100-500" },
  { value: "500-2000", label: "500-2000" },
];

const defaultLocations = [
  { value: "bd", label: "Bangladesh" },
  { value: "sp", label: "Singapore" },
  { value: "tl", label: "Thailand" },
  { value: "de", label: "Germany" },
];

const DashboardSettings = () => {


  const router = useRouter();
  const uId = isAuthenticated().company_id;
  const [userData,setUserData] = useState({
    email:"",
    photourl:"",
    name:"",
    companyType:"",
    companySize:"",
    location:"",
    established:"",
    jobsPosted:"",
    about:"",
    phonenumber:"",
    links:"",
    
  });

  // "email": "felixjordanew312@gmail.com",
  // "phonenumber": "9585570988001",
  // "name": "felixcomp2new",
  // "location": "new",
  // "companySize": null,
  // "about": "new",
  // "established": "new",
  // "jobsPosted": "{'ids': [1, 2, 3] }",
  // "companyType": "new",
  // "links": "new"

  const {photourl,about,name,companyType,companySize,location,links,established,jobsPosted} = userData;
  
  useEffect(()=>{
    if(isAuthenticated())
    console.log(uId);
    getCompanyWithId(uId,isAuthenticated().access_token)
      .then(data =>{
        console.log(data);
        if(data.error==="token_expired"){
          console.log("token expired refreshing please wait");
          let ref_tkn = isAuthenticated().refresh_token;
          refreshToken(ref_tkn)
            .then(data=>{
              console.log(data);
              let new_tkn = data.access_token;
              getCompanyWithId(uId,new_tkn)
                .then(res=>{
                  setUserData({
                    ...userData,
                    photourl: res.photoURL,
                    email:res.email,
                    phonenumber:res.phonenumber,
                    name: res.name,
                    location:res.location,
                    companySize:res.companySize,
                    about:res.about,
                    established:res.established,
                    jobsPosted:res.jobsPosted,
                    companyType:res.companyType,
                    links:res.links
                    
        
        
                  })
                })
            })
        }else{
          setUserData({
            ...userData,
            photourl: data.photoURL,
                    email:data.email,
                    phonenumber:data.phonenumber,
                    name: data.name,
                    location:data.location,
                    companySize:data.companySize,
                    about:data.about,
                    established:data.established,
                    jobsPosted:data.jobsPosted,
                    companyType:data.companyType,
                    links:data.links


          })
          console.log(data)
          
        }
      })
  },[])

  const handleChange = name => event =>{
    setUserData({
        ...userData,[name]:event.target.value
    })
}

const updateProfile = () =>{
  console.log(userData)
  let tkn = isAuthenticated().access_token;
  let uid = isAuthenticated().company_id;
  updateCompanyDetails(tkn,uid,userData)
    .then((data)=>{
      console.log(data)
      if(data.error==="token_expired"){
        refreshToken(isAuthenticated().refresh_token)
          .then(data=>{
            updateCompanyDetails(data.access_token,uid,userData)
              .then(res=>{
                console.log(res);
                router.push("/");
                
              })
          })
      }
    })
}
  
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
        <div
          className="dashboard-main-container mt-24 mt-lg-31"
          id="dashboard-body"
        >
          <div className="container">
            <div className="mb-15 mb-lg-23">
              <div className="row">
                <div className="col-xxxl-9 px-lg-13 px-6">
                  <h5 className="font-size-6 font-weight-semibold mb-11">
                    Update Company Profile
                  </h5>
                  <div className="contact-form bg-white shadow-8 rounded-4 pl-sm-10 pl-4 pr-sm-11 pr-4 pt-15 pb-13">
                    <div className="upload-file mb-16 text-center">
                      <div
                        id="userActions"
                        className="square-144 m-auto px-6 mb-7"
                      >
                        <label
                          htmlFor="fileUpload"
                          className="mb-0 font-size-4 text-smoke"
                        >
                          Browse or Drag and Drop
                        </label>
                        <input
                          type="file"
                          id="fileUpload"
                          className="sr-only"
                        />
                      </div>
                    </div>
                    <form action="/">
                      <fieldset>
                        <div className="row mb-xl-1 mb-9">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label
                                htmlFor="namedash"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                Company Name
                              </label>
                              <input
                                type="text"
                                className="form-control h-px-48"
                                id="namedash"
                                placeholder="eg. Apple"
                                value={name}
                                onChange={handleChange("name")}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label
                                htmlFor="select2"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                Company Type
                              </label>
                              <Select
                                options={defaultTypes}
                                className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
                                border={false}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mb-8">
                          <div className="col-lg-6 mb-xl-0 mb-7">
                            <div className="form-group position-relative">
                              <label
                                htmlFor="select3"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                Company Size{" "}
                              </label>
                              <input type="number" value={companySize} onChange={handleChange("companySize")} />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group position-relative">
                              <label
                                htmlFor="address"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                Location or (Remote)
                              </label>
                              <Select
                                options={defaultLocations}
                                className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
                                border={false}
                              />
                              <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6"></span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label
                                htmlFor="aboutTextarea"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                About Comapny
                              </label>
                              <textarea
                                name="textarea"
                                id="aboutTextarea"
                                cols="30"
                                rows="7"
                                value={about}
                                onChange={handleChange("about")}
                                className="border border-mercury text-gray w-100 pt-4 pl-6"
                                placeholder="Describe about the company what make it unique"
                              ></textarea>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group mb-11">
                              <label
                                htmlFor="formGroupExampleInput"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                Company Website Link
                              </label>
                              <input
                                type="text"
                                value={links}
                                onChange={handleChange("links")}
                                className="form-control"
                                id="formGroupExampleInput"
                                placeholder="https://www.example.com"
                              />
                            </div>
                              <button className="btn btn-green btn-h-60 text-white min-width-px-210 rounded-5 text-uppercase" onClick={(e)=>{
                                e.preventDefault();
                                updateProfile()
                              }}>Update Profile</button>
                          </div>
                        </div>
                      </fieldset>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};
export default DashboardSettings;
