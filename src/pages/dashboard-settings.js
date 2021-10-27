import React, { useEffect, useState } from "react";

import PageWrapper from "../components/PageWrapper";
import { Select } from "../components/Core";

import {
  getUserWithId,
  getCompanyWithId,
  isAuthenticated,
  refreshToken,
  updateCompanyDetails,
  imageUpload,
} from "../helper/index";
import { useRouter } from "next/router";

// import dashboardstyles from "../styles/Dashboard-settings.module.css";

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

  const [localimg, setLocalimg] = useState();
  const [imguploading, setImguploading] = useState(false);
  const [showUploadbtn, setShowUploadbtn] = useState();
  const [generatedImgurl, setGeneratedImgurl] = useState("");
  const uId = isAuthenticated().company_id;
  const [userData, setUserData] = useState({
    email: "",
    photourl: "",
    name: "",
    companyType: "",
    companySize: "",
    location: "",
    established: "",
    jobsPosted: "",
    about: "",
    phonenumber: "",
    links: "",
  });

  let auth_data = isAuthenticated();

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

  const {
    photourl,
    about,
    name,
    companyType,
    companySize,
    location,
    links,
    established,
    jobsPosted,
  } = userData;
  // const formdata = new FormData();

  // const uploadImage = (e) => {

  //   // const val_name = "file";
  //   // const value = e.target.files[0];
  //   // const formData = new FormData();
  //   // formData.set(val_name,value);
  //   const uid=isAuthenticated().company_id;
  //   const tkn=isAuthenticated().access_token;

  //   imageUpload(tkn,imgfile)
  //     .then(data=>{
  //       console.log(data)
  //     })
  // }

  useEffect(() => {
    if(!isAuthenticated().company_id && isAuthenticated().user_id){
    
      router.push("/dashboard-settings-user");
    
  }else if(!isAuthenticated()){
    router.push("/");
    alert("please login!")
  }
    if (isAuthenticated().company_id) console.log(uId);
    getCompanyWithId(uId, isAuthenticated().access_token).then((data) => {
      console.log(data);
      if (data.error === "token_expired") {
        console.log("token expired refreshing please wait");
        let ref_tkn = isAuthenticated().refresh_token;
        refreshToken(ref_tkn).then((data) => {
          console.log(data);
          let new_tkn = data.access_token;

          auth_data.access_token = data.access_token;
          if (typeof window !== "undefined") {
            localStorage.setItem("jwt", JSON.stringify(auth_data));
            getCompanyWithId(uId, new_tkn).then((res) => {
              setUserData({
                ...userData,
                photourl: res.photoURL,
                email: res.email,
                phonenumber: res.phonenumber,
                name: res.name,
                location: res.location,
                companySize: res.companySize,
                about: res.about,
                established: res.established,
                jobsPosted: res.jobsPosted,
                companyType: res.companyType,
                links: res.links,
              });
            });
          }
        });
      } else {
        setUserData({
          ...userData,
          photourl: data.photoURL,
          email: data.email,
          phonenumber: data.phonenumber,
          name: data.name,
          location: data.location,
          companySize: data.companySize,
          about: data.about,
          established: data.established,
          jobsPosted: data.jobsPosted,
          companyType: data.companyType,
          links: data.links,
        });
        console.log(data);
      }
    });
  }, []);

  const handleChange = (name) => (event) => {
    setUserData({
      ...userData,
      [name]: event.target.value,
    });
  };

  const updateProfile = () => {
    console.log(userData);
    let tkn = isAuthenticated().access_token;
    let uid = isAuthenticated().company_id;
    updateCompanyDetails(tkn, uid, userData).then((data) => {
      // console.log(data)
      if (data.error === "token_expired") {
        refreshToken(isAuthenticated().refresh_token).then((data) => {
          updateCompanyDetails(data.access_token, uid, userData).then((res) => {
            console.log(res);
            alert("successfully updated");
            
          });
        });
      } else {
        alert("successfully updated");
        // router.push("/");
      }
    });
  };

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
                  {/* <div className="mb-16"> */}
                      <div className="text-center mb-16">
                      {isAuthenticated().company_id ? (
                        photourl?.length != 0 ? (
                          <div className="text-center">
                            <img
                              src={photourl}
                              alt=""
                              style={{
                                borderRadius: "12px",
                                marginBottom: "20px",
                                height: "200px",
                                width: "200px",
                              }}
                            />
                          </div>
                        ) : <div className="text-center"><img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4wLEoiR0baQCYjpHMu_DEsv6qmGkXs99lvRRxAnhZj3_pM_qsIRdYFnjZ5Lozl4q2KNg&usqp=CAU"
                              alt=""
                              style={{
                                borderRadius: "12px",
                                marginBottom: "20px",
                                height: "200px",
                                width: "200px",
                              }}
                            /></div>
                      ) : null}

                      {/* <p>{photourl}</p> */}

                      {/* <label>
                         Change your profile pic
                       </label> */}

                      <input
                      className="border border-dark border-1 rounded-1 p-1"
                        type="file"
                        // id="fileUpload"
                        // className="custom-file-input"
                        placeholder="upload an image"
                        style={{ border: "none" }}
                        onChange={(e) => {
                          if (e.target.files) {
                            console.log(e.target.files[0]);

                            setShowUploadbtn(!showUploadbtn);
                            if (e.target.files[0]) {
                              setLocalimg(e.target.files[0]);
                            }
                          }
                        }}
                        // className="sr-only"
                      />
                      {imguploading && <p>uploading......</p>}

                      <button className="btn btn-success" disabled={localimg ? false : true } onClick={()=>{
                          setImguploading(true);
                          imageUpload(isAuthenticated().access_token,localimg)
                                  .then(res=>{
                                    console.log(res)
                                    if(res.message==="Success"){
                                      setImguploading(false)
                                      setUserData({
                                      ...userData,photourl:res.photoURL
                                    })
                                    }else if(res.message==="token_expired" || res.error)
                                    {
                                      updateAuthData(isAuthenticated())
                                      imageUpload(isAuthenticated().access_token,localimg).then(d1=>{
                                        console.log(d1);
                                        if(d1.message==="Success"){
                                        setImguploading(false)
                                        setUserData({
                                        ...userData,photourl:d1.photoURL
                                      })
                                        }else{
                                          alert("somethings went wrong!");
                                        }


                                      })
                                    }
                                    else{
                                      alert("something went wrong!")
                                    }
                                    
                                  })
                        }}>Upload Image</button>
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
                              {/* <Select
                                options={defaultTypes}
                                className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
                                border={false}
                              /> */}
                              <input
                                type="text"
                                className="form-control h-px-48"
                                id="namedash"
                                placeholder="company Type"
                                value={companyType}
                                onChange={handleChange("companyType")}
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
                              <input
                                type="text"
                                className="form-control h-px-48"
                                id="namedash"
                                placeholder=""
                                value={companySize}
                                onChange={handleChange("companySize")}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group position-relative">
                              <label
                                htmlFor="address"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                Address
                              </label>
                              {/* <Select
                                options={defaultLocations}
                                className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
                                border={false}
                              /> */}
                              <textarea
                                name="textarea"
                                id="aboutTextarea"
                                cols="30"
                                rows="7"
                                value={location}
                                onChange={handleChange("location")}
                                className="border border-mercury text-gray w-100 pt-4 pl-6"
                                placeholder="current location/address"
                              ></textarea>

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
                                About Company
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
                            <button
                              className="btn btn-green btn-h-60 text-white min-width-px-210 rounded-5 text-uppercase"
                              onClick={(e) => {
                                e.preventDefault();
                                updateProfile();
                              }}
                            >
                              Update Profile
                            </button>
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
export default DashboardSettings
// import React, { useEffect, useState } from "react";

// import PageWrapper from "../components/PageWrapper";
// import { Select } from "../components/Core";

// import {getUserWithId,getCompanyWithId,isAuthenticated, refreshToken, updateCompanyDetails, imageUpload, updateAuthData} from "../helper/index";
// import {useRouter} from "next/router";

// // import dashboardstyles from "../styles/Dashboard-settings.module.css";




// const defaultTypes = [
//   { value: "b2b", label: "B2B" },
//   { value: "saas", label: "SAAS" },
//   { value: "b2b", label: "b2b" },
// ];

// const defaultEmployees = [
//   { value: "10-50", label: "10-50" },
//   { value: "50-100", label: "50-100" },
//   { value: "100-500", label: "100-500" },
//   { value: "500-2000", label: "500-2000" },
// ];

// const defaultLocations = [
//   { value: "bd", label: "Bangladesh" },
//   { value: "sp", label: "Singapore" },
//   { value: "tl", label: "Thailand" },
//   { value: "de", label: "Germany" },
// ];

// const DashboardSettings = () => {


//   const router = useRouter();
  
//   const [localimg,setLocalimg] = useState();
//   const [imguploading,setImguploading] = useState(false);
//   const [showUploadbtn,setShowUploadbtn] = useState();
//   const [generatedImgurl,setGeneratedImgurl] = useState("");
//   const uId = isAuthenticated().company_id;
//   const [userData,setUserData] = useState({
//     email:"",
//     photourl:"",
//     name:"",
//     companyType:"",
//     companySize:"",
//     location:"",
//     established:"",
//     jobsPosted:"",
//     about:"",
//     phonenumber:"",
//     links:"",
    
//   });

//   let auth_data = isAuthenticated();


//   // "email": "felixjordanew312@gmail.com",
//   // "phonenumber": "9585570988001",
//   // "name": "felixcomp2new",
//   // "location": "new",
//   // "companySize": null,
//   // "about": "new",
//   // "established": "new",
//   // "jobsPosted": "{'ids': [1, 2, 3] }",
//   // "companyType": "new",
//   // "links": "new"

//   const {photourl,about,name,companyType,companySize,location,links,established,jobsPosted} = userData;
//   // const formdata = new FormData();


//   // const uploadImage = (e) => {
     
//   //   // const val_name = "file";
//   //   // const value = e.target.files[0];
//   //   // const formData = new FormData();
//   //   // formData.set(val_name,value);
//   //   const uid=isAuthenticated().company_id;
//   //   const tkn=isAuthenticated().access_token;
    
    
//   //   imageUpload(tkn,imgfile)
//   //     .then(data=>{
//   //       console.log(data)
//   //     })
//   // }
  
//   useEffect(()=>{
//     if(isAuthenticated())
//     console.log(uId);
//     getCompanyWithId(uId,isAuthenticated().access_token)
//       .then(data =>{
//         console.log(data);
//         if(data.error==="token_expired"){
//           console.log("token expired refreshing please wait");
//           let ref_tkn = isAuthenticated().refresh_token;
//           refreshToken(ref_tkn)
//             .then(data=>{
//               console.log(data);
//               let new_tkn = data.access_token;
              
//                 auth_data.access_token=data.access_token;
//               if(typeof window !== "undefined"){

//                 localStorage.setItem("jwt",JSON.stringify(auth_data))
//                 getCompanyWithId(uId,new_tkn)
//                 .then(res=>{
//                   setUserData({
//                     ...userData,
//                     photourl: res.photoURL,
//                     email:res.email,
//                     phonenumber:res.phonenumber,
//                     name: res.name,
//                     location:res.location,
//                     companySize:res.companySize,
//                     about:res.about,
//                     established:res.established,
//                     jobsPosted:res.jobsPosted,
//                     companyType:res.companyType,
//                     links:res.links
                    
        
        
//                   })
//                 })
                
                
//             }
//             })
//         }else{
//           setUserData({
//             ...userData,
//             photourl: data.photoURL,
//                     email:data.email,
//                     phonenumber:data.phonenumber,
//                     name: data.name,
//                     location:data.location,
//                     companySize:data.companySize,
//                     about:data.about,
//                     established:data.established,
//                     jobsPosted:data.jobsPosted,
//                     companyType:data.companyType,
//                     links:data.links


//           })
//           console.log(data)
          
//         }
//       })
//   },[])

//   const handleChange = name => event =>{
//     setUserData({
//         ...userData,[name]:event.target.value
//     })
// }

// const updateProfile = () =>{
//   console.log(userData)
//   let tkn = isAuthenticated().access_token;
//   let uid = isAuthenticated().company_id;
//   updateCompanyDetails(tkn,uid,userData)
//     .then((data)=>{
//       // console.log(data)
//       if(data.error==="token_expired"){
//         refreshToken(isAuthenticated().refresh_token)
//           .then(data=>{
//             updateCompanyDetails(data.access_token,uid,userData)
//               .then(res=>{
//                 console.log(res);
//                 alert("successfully updated");
//                 router.push("/");
                
//               })
//           })
//       }else{
//         alert("successfully updated");
//         router.push("/");
//       }
//     })
// }


  
  
//   return (
//     <>
//       <PageWrapper
//         headerConfig={{
//           button: "profile",
//           isFluid: true,
//           bgClass: "bg-default",
//           reveal: false,
//         }}
//       >
//         <div
//           className="dashboard-main-container mt-24 mt-lg-31"
//           id="dashboard-body"
//         >
//           <div className="container">
//             <div className="mb-15 mb-lg-23">
//               <div className="row">
//                 <div className="col-xxxl-9 px-lg-13 px-6">
//                   <h5 className="font-size-6 font-weight-semibold mb-11">
//                     Update Company Profile
//                   </h5>
//                   <div className="contact-form bg-white shadow-8 rounded-4 pl-sm-10 pl-4 pr-sm-11 pr-4 pt-15 pb-13">
                  
//                     <div className="upload-file mb-16">
                    
                      
//                     {
//                          isAuthenticated().company_id ? (photourl.length !=0 ? (<img src={photourl} alt="" style={{display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"50%",marginBottom:"20px",height:"200px",width:"200px"}} />):(null)):(null)
//                        }
                       
//                          {/* <p>{photourl}</p> */}
                       

//                        {/* <label>
//                          Change your profile pic
//                        </label> */}

//                         <input
//                           type="file"
//                           id="fileUpload"
//                           // className="custom-file-input"
//                           placeholder="upload an image"
//                           style={{border:"none"}}
//                           onChange={(e)=>{
                            
//                             if(e.target.files){
//                               console.log(e.target.files[0]);
                              
//                               setShowUploadbtn(!showUploadbtn);
//                               if(e.target.files[0] ){
//                                 setLocalimg(e.target.files[0]);
//                               }
                              
//                             }


//                           }}
//                           // className="sr-only"
//                         />
//                         {
//                           imguploading && <p>uploading......</p>
//                         }

                        // <button disabled={localimg ? false : true } onClick={()=>{
                        //   setImguploading(true);
                        //   imageUpload(isAuthenticated().access_token,localimg)
                        //           .then(res=>{
                        //             console.log(res)
                        //             if(res.message==="Success"){
                        //               setImguploading(false)
                        //               setUserData({
                        //               ...userData,photourl:res.photoURL
                        //             })
                        //             }else if(res.message==="token_expired" || res.error)
                        //             {
                        //               updateAuthData(isAuthenticated())
                        //               imageUpload(isAuthenticated().access_token,localimg).then(d1=>{
                        //                 console.log(d1);
                        //                 if(d1.message==="Success"){
                        //                 setImguploading(false)
                        //                 setUserData({
                        //                 ...userData,photourl:d1.photoURL
                        //               })
                        //                 }else{
                        //                   alert("somethings went wrong!");
                        //                 }


                        //               })
                        //             }
                        //             else{
                        //               alert("something went wrong!")
                        //             }
                                    
                        //           })
                        // }}>Upload Image</button>
                       
                        
                      
                      
//                     </div>
//                     <form action="/">
//                       <fieldset>
//                         <div className="row mb-xl-1 mb-9">
//                           <div className="col-lg-6">
//                             <div className="form-group">
//                               <label
//                                 htmlFor="namedash"
//                                 className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
//                               >
//                                 Company Name
//                               </label>
//                               <input
//                                 type="text"
//                                 className="form-control h-px-48"
//                                 id="namedash"
//                                 placeholder="eg. Apple"
//                                 value={name}
//                                 onChange={handleChange("name")}
//                               />
//                             </div>
//                           </div>
//                           <div className="col-lg-6">
//                             <div className="form-group">
//                               <label
//                                 htmlFor="select2"
//                                 className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
//                               >
//                                 Company Type
//                               </label>
//                               <Select
//                                 options={defaultTypes}
//                                 className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
//                                 border={false}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="row mb-8">
//                           <div className="col-lg-6 mb-xl-0 mb-7">
//                             <div className="form-group position-relative">
//                               <label
//                                 htmlFor="select3"
//                                 className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
//                               >
//                                 Company Size{" "}
//                               </label>
//                               <input
//                                 type="text"
//                                 className="form-control h-px-48"
//                                 id="namedash"
//                                 placeholder=""
//                                 value={companySize}
//                                 onChange={handleChange("companySize")}
//                               />
//                             </div>
//                           </div>
//                           <div className="col-lg-6">
//                             <div className="form-group position-relative">
//                               <label
//                                 htmlFor="address"
//                                 className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
//                               >
//                                 Location or (Remote)
//                               </label>
//                               <Select
//                                 options={defaultLocations}
//                                 className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
//                                 border={false}
//                               />
//                               <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6"></span>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="row">
//                           <div className="col-md-12">
//                             <div className="form-group">
//                               <label
//                                 htmlFor="aboutTextarea"
//                                 className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
//                               >
//                                 About Company
//                               </label>
//                               <textarea
//                                 name="textarea"
//                                 id="aboutTextarea"
//                                 cols="30"
//                                 rows="7"
//                                 value={about}
//                                 onChange={handleChange("about")}
//                                 className="border border-mercury text-gray w-100 pt-4 pl-6"
//                                 placeholder="Describe about the company what make it unique"
//                               ></textarea>
//                             </div>
//                           </div>
//                           <div className="col-md-12">
//                             <div className="form-group mb-11">
//                               <label
//                                 htmlFor="formGroupExampleInput"
//                                 className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
//                               >
//                                 Company Website Link
//                               </label>
//                               <input
//                                 type="text"
//                                 value={links}
//                                 onChange={handleChange("links")}
//                                 className="form-control"
//                                 id="formGroupExampleInput"
//                                 placeholder="https://www.example.com"
//                               />
//                             </div>
//                               <button className="btn btn-green btn-h-60 text-white min-width-px-210 rounded-5 text-uppercase" onClick={(e)=>{
//                                 e.preventDefault();
//                                 updateProfile()
//                               }}>Update Profile</button>
                              
//                           </div>
//                         </div>
//                       </fieldset>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//       </PageWrapper>
//     </>
//   );
// };
// export default DashboardSettings;
