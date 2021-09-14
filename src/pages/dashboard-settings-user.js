import React, { useEffect, useState } from "react";
import {useRouter} from "next/router";

import PageWrapper from "../components/PageWrapper";
import { Select } from "../components/Core";

import { getUserWithId,getCompanyWithId,isAuthenticated, refreshToken, updateUserDetails, UserImageUpload } from "../helper/index";




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
  const [imgfile,setImgfile] = useState(false);
  const [docfile,setDocfile] = useState(false);
  const [showUploadbtn,setShowUploadbtn] = useState();
  const [generatedImgurl,setGeneratedImgurl] = useState("");
  const uId = isAuthenticated().user_id;

  const [userData,setUserData] = useState({
    email:"",
    photourl:"",
    name:"",
    location:"",
    profession:"",
    jobsApplied:"",
    phonenumber:"",
    links:"",
    
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

  const { photourl,about,name,location,links,email,jobsApplied,profession } = userData;
  
  useEffect(()=>{
    if(isAuthenticated())
    getUserWithId(uId,isAuthenticated().access_token)
      .then(data =>{
        if(data.error==="token_expired"){
          console.log("token expired refreshing please wait");
          let ref_tkn = isAuthenticated().refresh_token;
          refreshToken(ref_tkn)
            .then(data=>{
              console.log(data);
              let new_tkn = data.access_token;

              auth_data.access_token = data.access_token

              if(typeof window !== "undefined"){
                localStorage.setItem("jwt",JSON.stringify(auth_data))
                getUserWithId(uId,new_tkn)
                .then(res=>{
                  setUserData({
                    ...userData,
                    photourl: res.photoURL,
                    email:res.email,
                    phonenumber:res.phonenumber,
                    name: res.name,
                    location:res.location,
                    jobsApplied:res.jobsApplied,
                    profession:res.profession,
                    links:res.links   
                  })
                })
              }
             
            })
          }else{
        //   console.log(data)
        //   console.log(userData)
          setUserData({
            ...userData,
            photourl: data.photoURL,
            email:data.email,
            phonenumber:data.phonenumber,
            name: data.name,
            location:data.location,
            jobsApplied:data.jobsApplied,
            profession:data.profession,
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
  let uid = isAuthenticated().user_id;
  updateUserDetails(tkn,uid,userData)
    .then((data)=>{
      //console.log(data)
      if(data.error==="token_expired"){
        refreshToken(isAuthenticated().refresh_token)
          .then(data=>{
            updateUserDetails(data.access_token,uid,userData)
              .then(res=>{
                console.log(res)
                alert("successfully updated");
                router.push("/");
              })
          })
      }else{
        alert("successfully updated");
        router.push("/");
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
                    Update User Profile
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
                          Click to browse or change photo
                        </label>
                        <input
                          type="file"
                          id="fileUpload"
                          onChange={(e)=>{
                            // const val_name = "file";
                            // const value = e.target.files[0];
                            // const formData = new FormData();
                            // // formData.set(val_name,value);
                            // const uid=isAuthenticated().company_id;
                            // const tkn=isAuthenticated().access_token;
                            
                            // formData.set('file',e.target.files[0])
                            // imageUpload(uid,tkn,formData);
                            
                            // formdata.set('file',e.target.files[0])
                            if(e.target.files){
                              console.log(e.target.files[0]);
                              setImgfile(e.target.files[0]);
                              setShowUploadbtn(!showUploadbtn);
                              if(e.target.files[0] ){
                                UserImageUpload(isAuthenticated().access_token,e.target.files[0])
                                  .then(res=>{
                                    console.log(res)
                                    setUserData({
                                      ...userData,photourl:res.photoURL
                                    })
                                  })
                              }
                              
                            }


                          }}
                          className="sr-only"
                        />
                      </div>
                      {
                         photourl.length !=0 ? (
                           <div style={{marginTop:"26px"}} align="center">
                            <p style={{marginBottom:"10px"}}>Preview Image</p>
                          {/* <div style={{border:"2px solid grey",width:"140px",height:"140px",borderRadius:"6px"}}> */}
                            <img class="img-thumbnail" src={photourl} width="200px" height="200px" alt="" />
                          {/* </div> */}
                          </div>

                         ):(null)
                       }
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
                                Name
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
                                htmlFor="namedash"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                Profession
                              </label>
                              <input
                                type="text"
                                className="form-control h-px-48"
                                id="namedash"
                                placeholder="eg. Apple"
                                value={profession}
                                onChange={handleChange("profession")}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mb-8">
                          
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
                          {/* <div className="col-lg-6">
                            <div className="form-group">
                              <label
                                htmlFor="namedash"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                Company Name
                              </label>
                              <input
                                type="file"
                                className="form-control h-px-48"
                                id="namedash"
                                placeholder="eg. Apple"
                                value={name}
                                onChange={handleChange("name")}
                              />
                            </div>
                          </div> */}
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label
                                htmlFor="aboutTextarea"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                About Yourself
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
                                Portfolio Link
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

// import React, { useEffect, useState } from "react";

// import PageWrapper from "../components/PageWrapper";
// import { Select } from "../components/Core";

// import { getUserWithId,getCompanyWithId,isAuthenticated, refreshToken, updateUserDetails } from "../helper/index";




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
//   const uId = isAuthenticated().user_id;
//   const [userData,setUserData] = useState({
//     email:"",
//     photourl:"",
//     name:"",
//     location:"",
//     profession:"",
//     jobsApplied:"",
//     phonenumber:"",
//     links:"",
    
//   });

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

//   const { photourl,about,name,location,links,email,jobsApplied,profession } = userData;
  
//   useEffect(()=>{
//     if(isAuthenticated())
//     getUserWithId(uId,isAuthenticated().access_token)
//       .then(data =>{
//         if(data.error==="token_expired"){
//           console.log("token expired refreshing please wait");
//           let ref_tkn = isAuthenticated().refresh_token;
//           refreshToken(ref_tkn)
//             .then(data=>{
//               console.log(data);
//               let new_tkn = data.access_token;
//               getUserWithId(uId,new_tkn)
//                 .then(res=>{
//                   setUserData({
//                     ...userData,
//                     photourl: res.photoURL,
//                     email:res.email,
//                     phonenumber:res.phonenumber,
//                     name: res.name,
//                     location:res.location,
//                     jobsApplied:res.jobsApplied,
//                     profession:res.profession,
//                     links:res.links   
//                   })
//                 })
//             })
//           }else{
//         //   console.log(data)
//         //   console.log(userData)
//           setUserData({
//             ...userData,
//             photourl: data.photoURL,
//             email:data.email,
//             phonenumber:data.phonenumber,
//             name: data.name,
//             location:data.location,
//             jobsApplied:data.jobsApplied,
//             profession:data.profession,
//             links:data.links 
//           })
          
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
//   let uid = isAuthenticated().user_id;
//   updateUserDetails(tkn,uid,userData)
//     .then((data)=>{
//       console.log(data)
//       if(data.error==="token_expired"){
//         refreshToken(isAuthenticated().refresh_token)
//           .then(data=>{
//             updateUserDetails(data.access_token,uid,userData)
//               .then(res=>{
//                 console.log(res)
//               })
//           })
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
//                     Update User Profile
//                   </h5>
//                   <div className="contact-form bg-white shadow-8 rounded-4 pl-sm-10 pl-4 pr-sm-11 pr-4 pt-15 pb-13">
//                     <div className="upload-file mb-16 text-center">
//                       <div
//                         id="userActions"
//                         className="square-144 m-auto px-6 mb-7"
//                       >
//                         <label
//                           htmlFor="fileUpload"
//                           className="mb-0 font-size-4 text-smoke"
//                         >
//                           Browse or Drag and Drop
//                         </label>
//                         <input
//                           type="file"
//                           id="fileUpload"
//                           className="sr-only"
//                         />
//                       </div>
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
//                                 Name
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
//                                 htmlFor="namedash"
//                                 className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
//                               >
//                                 Profession
//                               </label>
//                               <input
//                                 type="text"
//                                 className="form-control h-px-48"
//                                 id="namedash"
//                                 placeholder="eg. Apple"
//                                 value={profession}
//                                 onChange={handleChange("profession")}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="row mb-8">
                          
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
//                           {/* <div className="col-lg-6">
//                             <div className="form-group">
//                               <label
//                                 htmlFor="namedash"
//                                 className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
//                               >
//                                 Company Name
//                               </label>
//                               <input
//                                 type="file"
//                                 className="form-control h-px-48"
//                                 id="namedash"
//                                 placeholder="eg. Apple"
//                                 value={name}
//                                 onChange={handleChange("name")}
//                               />
//                             </div>
//                           </div> */}
//                         </div>
//                         <div className="row">
//                           <div className="col-md-12">
//                             <div className="form-group">
//                               <label
//                                 htmlFor="aboutTextarea"
//                                 className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
//                               >
//                                 About Yourself
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
//                                 Portfolio Link
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