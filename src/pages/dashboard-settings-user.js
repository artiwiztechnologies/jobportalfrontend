import React, { useEffect, useState } from "react";
import {useRouter} from "next/router";

import {Avatar} from "@material-ui/core";
import PageWrapper from "../components/PageWrapper";
import { Select } from "../components/Core";

import { getUserWithId,getCompanyWithId,isAuthenticated, refreshToken, updateUserDetails, UserImageUpload, UserResumeUpload } from "../helper/index";




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
  const [imgfile,setImgfile] = useState();
  const [resfile,setResfile] = useState();
  const [localimg,setLocalimg] = useState();
  const [localRes,setLocalRes] = useState();
  const [uploadingimg,setUploadingimg] = useState(false);
  const [uploadingRes,setUploadingRes] = useState(false);
  
 
  const [showUploadbtn,setShowUploadbtn] = useState();
 
  const uId = isAuthenticated().user_id;

  const [userData,setUserData] = useState({
    email:"",
    // photourl:"",
    name:"",
    location:"",
    profession:"",
  
    phonenumber:"",
    links:"",
    about:""
    
  });

  let auth_data = isAuthenticated();



  const { about,name,location,links,email,profession } = userData;
  
  useEffect(()=>{
    if(isAuthenticated() && isAuthenticated().user_id){
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
                    // photourl: res.photoURL,
                    email:res.email,
                    phonenumber:res.phonenumber,
                    name: res.name,
                    location:res.location,
                    
                    profession:res.profession,
                    links:res.links,
                    about:res.about   
                  })
                  setImgfile(res.photoURL)
                  setResfile(res.resume)
                  // console.log(resfile)
                })
              }
             
            })
          }else{
        //   console.log(data)
        //   console.log(userData)
          setUserData({
            ...userData,
            // photourl: data.photoURL,
            email:data.email,
            phonenumber:data.phonenumber,
            name: data.name,
            location:data.location,

            profession:data.profession,
            links:data.links ,
            about: data.about
          })
          setImgfile(data.photoURL)
          setResfile(data.resume)


          console.log(data)
        }
      })}else{
        if(isAuthenticated()){
          router.push("/dashboard-settings")
        }
      }
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
      }else if(data.error){
        alert(data.error)
      }
      else if(data.message==="Update successful!"){
        alert(data.message)
      }
      // else{
      //   alert("successfully updated");
      //   router.push("/");
      // }
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
                  {/*  */}
                  <div className="upload-file mb-16">

                      
<div className="img_upload">
{
                         isAuthenticated().user_id ? (imgfile?.length !=0 ? (<img src={imgfile} alt="" style={{display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"50%",marginBottom:"20px",height:"200px",width:"200px"}} />):(<Avatar />)):(null)
                       }

  
<input
                          type="file"
                          id="fileUpload"
                          onChange={(e)=>{
                            
                            if(e.target.files){
                              console.log(e.target.files[0]);
                              // setImgfile(e.target.files[0]);
                              setShowUploadbtn(!showUploadbtn);
                              if(e.target.files[0] ){
                                // UserImageUpload(isAuthenticated().access_token,e.target.files[0])
                                //   .then(res=>{
                                //     console.log(res)
                                //     // setUserData({
                                //     //   ...userData,photourl:res.photoURL
                                //     // })
                                //     setImgfile(res.photoURL)

                                //   })
                               
                                setLocalimg(e.target.files[0]);
                              }
                              
                            }


                          }}

                        />

                        <span>
                          {uploadingimg && <p>uploading....</p>}
                        </span>

                        <button disabled={localimg ? false : true} onClick={()=>{
                          console.log(localimg);
                          if(localimg){
                            setUploadingimg(true);
                          UserImageUpload(isAuthenticated().access_token,localimg)
                                  .then(res=>{
                                    console.log(res)
                                    if(res.message==="Success"){
                                      setUploadingimg(false);
                                      alert("image upload sucess!");
                                    }
                                    // setUserData({
                                    //   ...userData,photourl:res.photoURL
                                    // })
                                    setImgfile(res.photoURL)

                                  })
                          }else{
                            alert("please choose a image!")
                          }
                        }}>upload image</button>
</div>
{/* use uploading animation till its uploaded using a uploading state and alert the status of upload */}
                        

                      <div className="resume_upload">

                      {
                        resfile?.length != 0 ? (<a href={resfile} target="blank">Preview Resume</a>) : (<p>please choose a file</p>)
                      }

                      <input
                          type="file"
                          id="fileUpload"
                          onChange={(e)=>{
                            if(e.target.files){
                              console.log(e.target.files[0]);
                              
                              // setResfilename(e.target.value[0].name)
                              // setShowUploadbtn(!showUploadbtn);
                              if(e.target.files[0] ){
                                setLocalRes(e.target.files[0]);
                                // UserResumeUpload(isAuthenticated().access_token,e.target.files[0])
                                //   .then(res=>{
                                //     console.log(res);
                                //     setResfile(res.resume);
                                //   })
                              }
                              
                            }


                          }}
                        />

                      <button disabled={!localRes ? true : false} onClick={()=>{
                        if(localRes){
                          console.log(localRes);
                        setUploadingRes(true);
                        UserResumeUpload(isAuthenticated().access_token,localRes)
                                  .then(res=>{
                                    console.log(res);
                                    setResfile(res.resume);
                                    if(res.message==="success"){
                                      alert("successfully uploaded!");
                                    }else{
                                      alert("something went wrong!");
                                    }
                                    setUploadingRes(false);
                                  })
                        }else{
                          alert("please choose your resume!")
                        }
                      }}>upload resume</button>
                        
                      </div>

                     
                   
                    </div>


                    <div className="upload-file mb-16 text-center">

                       
                      

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
                                // updateProfile()
                                console.log(userData.name)
                                updateUserDetails(isAuthenticated().access_token,isAuthenticated().user_id,userData)
                                  .then(d1=>{
                                    console.log(d1)

                                  })
                                  .catch(err=>{
                                    alert(err)
                                  })

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