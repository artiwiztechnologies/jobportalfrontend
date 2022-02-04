import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Avatar } from "@material-ui/core";
import PageWrapper from "../components/PageWrapper";
import { Select } from "../components/Core";



import {
  getUserWithId,
  getCompanyWithId,
  isAuthenticated,
  refreshToken,
  updateUserDetails,
  UserImageUpload,
  UserResumeUpload,
} from "../helper/index";
import Notiflix from "notiflix";
import { printRes,alertInfo,alertSuccess,alertWarning, checkSubscription } from "../helper2";

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
  const [imgfile, setImgfile] = useState();
  const [resfile, setResfile] = useState();
  const [localimg, setLocalimg] = useState();
  const [localRes, setLocalRes] = useState();
  const [uploadingimg, setUploadingimg] = useState(false);
  const [uploadingRes, setUploadingRes] = useState(false);

  const [showUploadbtn, setShowUploadbtn] = useState();

  const uId = isAuthenticated().user_id;

  const [userData, setUserData] = useState({
    email: "",
    // photourl:"",
    name: "",
    location: "",
    profession: "",
    skills:"",
    phonenumber: "",
    links: "",
    about: "",
  });

  let auth_data = isAuthenticated();

  const [activeplanData,setActiveplanData] = useState({
    active: false,
    days: 0,
    plan_name: "",
    
  });

  const { about, name, location, links, email, skills,profession } = userData;

  useEffect(() => {
    if(!isAuthenticated().user_id && isAuthenticated().company_id){
    
      router.push("/dashboard-settings");
    
  }else if(!isAuthenticated()){
    router.push("/");
    alertInfo("please login!")
  }
    if (isAuthenticated() && isAuthenticated().user_id) {
      getUserWithId(uId, isAuthenticated().access_token).then((data) => {
        if (data.error === "token_expired") {
          printRes("token expired refreshing please wait");
          let ref_tkn = isAuthenticated().refresh_token;
          refreshToken(ref_tkn).then((data) => {
            printRes(data);
            let new_tkn = data.access_token;

            auth_data.access_token = data.access_token;

            if (typeof window !== "undefined") {
              localStorage.setItem("jwt", JSON.stringify(auth_data));
              getUserWithId(uId, new_tkn).then((res) => {
                setUserData({
                  ...userData,
                  // photourl: res.photoURL,
                  email: res.email,
                  phonenumber: res.phonenumber,
                  name: res.name,
                  location: res.location,
                  skills: res.skills,
                  profession: res.profession,
                  links: res.links,
                  about: res.about,
                });
                setImgfile(res.photoURL);
                setResfile(res.resume);
                // printRes(resfile)
              });
            }
          });
        } else {
          //   printRes(data)
          //   printRes(userData)
          setUserData({
            ...userData,
            // photourl: data.photoURL,
            email: data.email,
            phonenumber: data.phonenumber,
            name: data.name,
            location: data.location,
            skills:data.skills,
            profession: data.profession,
            links: data.links,
            about: data.about,
          });
          setImgfile(data.photoURL);
          setResfile(data.resume);

          printRes(data);
        }
      });
      checkSubscription(isAuthenticated().access_token,isAuthenticated().type).then(data=>{
        printRes("subscription data",data);
        setActiveplanData({
          ...activeplanData,
          plan_name:data.plan_name,
          days:data.days,
          active:data.active
        })
      })

    }
    //  else {
    //   if (isAuthenticated().user_id) {
    //     router.push("/dashboard-settings");
    //   }
    // }
  }, []);

  const handleChange = (name) => (event) => {
    setUserData({
      ...userData,
      [name]: event.target.value,
    });
  };

  const updateProfile = () => {
    

    

    const u_data = {
      
      email: userData.email,
      // photourl:"",
      name: userData.name,
      location: userData.location,
      profession: userData.profession,
      skills: skillsString.length != 0 ? skillsString : userData.skills,
      phonenumber: userData.phonenumber,
      links: userData.links,
      about: userData.about,
    }

    // printRes(skills)
    // printRes(skillsString)

    
    // printRes(userData);
    let tkn = isAuthenticated().access_token;
    let uid = isAuthenticated().user_id;
    updateUserDetails(tkn, uid, u_data).then((data) => {
      //printRes(data)
      if (data.error === "token_expired") {
        refreshToken(isAuthenticated().refresh_token).then((data) => {
          updateUserDetails(data.access_token, uid, userData).then((res) => {
            printRes(res);
            alertSuccess("successfully updated");
            router.push("/");
          });
        });
      } else if (data.error) {
        alertWarning(data.error);
      } else if (data.message === "Update successful!") {
        alertSuccess(data.message);
      }
      // else{
      //   alertInfo("successfully updated");
      //   router.push("/");
      // }
    });
  };



const [skillsString,setSkillsString] = useState(""); 
const addSkill = () =>{
  // skillsString = skillsString + ", " + skills_required;
  // printRes(skillsString)
  if(skillsString.length === 0){
    setSkillsString(skillsString+skills);
    setUserData({
      ...userData,
      skills:""
    })

  }else{
  setSkillsString(skillsString+","+skills);
  setUserData({
    ...userData,
    skills:""
  })
  }
  

}

const deleteSkill = (s) =>{
 
  // hey, yov, none
  
  printRes(s);
  let str = ","+s;
  let newstr = s+",";
  if(skillsString.includes(str)){
  setSkillsString(skillsString.replace(str,""))
  }else if(skillsString.includes(newstr)){
  setSkillsString(skillsString.replace(newstr,""))

  }else{
  setSkillsString(skillsString.replace(s,""))

  }
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
                  
                <div className="row justify-content-between align-items-center">
                  <h5 className="font-size-6 font-weight-semibold mb-11">
                    Update User Profile
                  </h5>
                    {
                      activeplanData.active ? (
                        <div>
                    <h5>Your Plan Expires in <span className="text-danger">{activeplanData.days}</span> Day(s)</h5>
                    <h6>Your current Plan: <span className="text-primary">{activeplanData.plan_name}</span></h6>
                    {/* <h4>{activeplanData.active}</h4> */}
                    </div>
                      ):(
                    <h6>You haven't subscribed to any plans!</h6>

                      )
                    }
                    {/* {
                      JSON.stringify(activeplanData)
                    } */}
                  </div>
                  {/* <div className="upload-file mb-16 text-center">
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
                    </div> */}
                  <div className="contact-form bg-white shadow-8 rounded-4 pl-sm-10 pl-4 pr-sm-11 pr-4 pt-15 pb-13">
                    {/*  */}
                    {/* <div className="upload-file mb-16"> */}
                    {/* <div className="img_upload text-center"> */}
                    <div className="mb-16">
                      <div className="text-center">
                        {/* <div className="text-center"> */}
                        {isAuthenticated().user_id ? (
                          imgfile?.length != 0 ? (
                            <div className="text-center">
                              <img
                                src={imgfile}
                                alt=""
                                style={{
                                  borderRadius: "12px",
                                  marginBottom: "20px",
                                  height: "200px",
                                  width: "200px",
                                }}
                              />
                            </div>
                          ) : (
                            <div className="text-center"><img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4wLEoiR0baQCYjpHMu_DEsv6qmGkXs99lvRRxAnhZj3_pM_qsIRdYFnjZ5Lozl4q2KNg&usqp=CAU"
                              alt=""
                              style={{
                                borderRadius: "12px",
                                marginBottom: "20px",
                                height: "200px",
                                width: "200px",
                              }}
                            /></div>
                          )
                        ) : null}

                        <input
                          className=""
                          style={{
                            padding: "2px",
                            border: "2px solid #8a8a5c",
                            borderRadius: "4px",
                          }}
                          type="file"
                          id="fileUpload"
                          onChange={(e) => {
                            if (e.target.files) {
                              printRes(e.target.files[0]);
                              setShowUploadbtn(!showUploadbtn);
                              if (e.target.files[0]) {
                                setLocalimg(e.target.files[0]);
                              }
                            }
                          }}
                        />

                        {/* <span>{uploadingimg && <p>uploading...</p>}</span> */}

                        {
                          uploadingimg && Notiflix.Loading.hourglass()
                            
                     
                        }

                        <button
                          className="btn btn-success"
                          disabled={localimg ? false : true}
                          onClick={() => {
                            printRes(localimg);
                            if (localimg) {
                              setUploadingimg(true);
                              UserImageUpload(
                                isAuthenticated().access_token,
                                localimg
                              ).then((res) => {
                                printRes(res);

                                if (res.message === "Success") {
                                  setUploadingimg(false);
                                  Notiflix.Loading.remove();
                                  // alertInfo("image upload sucess!");
                                }
                                
                                // setUserData({
                                //   ...userData,photourl:res.photoURL
                                // })
                                setImgfile(res.photoURL);
                              });
                            } else {
                              alertInfo("please choose a image!");
                            }
                          }}
                        >
                          upload image
                        </button>
                      </div>
                      {/* use uploading animation till its uploaded using a uploading state and alert the status of upload */}
                      <div
                        style={{
                          marginTop: "11px",
                          marginBottom: "12px",
                        }}
                        className="resume_upload text-center"
                      >
                        {resfile?.length != 0 ? (
                          <button className="btn btn-primary">
                            <a
                              style={{ color: "white" }}
                              href={resfile}
                              target="blank"
                            >
                              Preview & Download Resume
                            </a>
                            <p>&nbsp; </p>
                            <i class="fa fa-download" aria-hidden="true"></i>
                          </button>
                        ) : (
                          <p>please choose a file</p>
                        )}
                      </div>

                      <div className="resume_upload text-center">
                        <input
                          className=""
                          style={{
                            padding: "2px",
                            border: "2px solid #8a8a5c",
                            borderRadius: "4px",
                          }}
                          type="file"
                          id="fileUpload"
                          onChange={(e) => {
                            if (e.target.files) {
                              printRes(e.target.files[0]);

                              // setResfilename(e.target.value[0].name)
                              // setShowUploadbtn(!showUploadbtn);
                              if (e.target.files[0]) {
                                setLocalRes(e.target.files[0]);
                                
                                // UserResumeUpload(isAuthenticated().access_token,e.target.files[0])
                                //   .then(res=>{
                                //     printRes(res);
                                //     setResfile(res.resume);
                                //   })
                              }
                            }
                          }}
                        />
                        {
                          uploadingRes && Notiflix.Loading.hourglass()
                        }

                        <button
                          className="btn btn-success"
                          disabled={!localRes  ? true : false}
                          onClick={() => {
                            if (localRes) {
                              printRes(localRes);
                              setUploadingRes(true);
                              UserResumeUpload(
                                isAuthenticated().access_token,
                                localRes
                              ).then((res) => {
                                printRes(res);
                                setResfile(res.resume);
                                if (res.message === "success") {
                                  Notiflix.Loading.remove();
                                  // alertInfo("successfully uploaded!");
                                  // setUploadingRes(false);

                                } else {
                                  alertWarning("something went wrong!");
                                }
                                setUploadingRes(false);
                              });
                            } else {
                              alertInfo("please choose your resume!");
                            }
                          }}
                        >
                          upload resume
                        </button>
                      </div>
                    </div>

                    <div className="upload-file mb-16 text-center"></div>
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
              <label className="font-size-4 text-black-2 font-weight-semibold line-height-reset">
                Your Skills 
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the skills you expect from the applicants"
                id="none"
                value={skills}
                onChange={handleChange("skills")}
              />
              <button
                className="btn btn-primary mt-5"
                onClick={(e) => {
                  e.preventDefault();
                  addSkill();
                  printRes(skills)
                }}
              >
                Add skill
              </button>
              {skillsString ? (
                // <span>
                <div
                
                  style={{
                    marginTop:"15px",
                    // width: "500px",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap:"wrap",
                    // justifyContent:"space-between",
                    // alignItems:"center"
                  }}
                >
                  {skillsString.split(",").map((d) => (
                    <li
                      style={{ textDecoration: "bold",width:"100px" }}
                      className="bg-regent-opacity-15 mr-3 h-px-33 text-center flex-all-center rounded-3 px-5 font-size-3 text-black-2 mt-2"
                      // key={d}
                    >
                      {d}

                      <p>&nbsp;</p>
                      <button
                        style={{ border: "none" }}
                        class="btn-light"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteSkill(d);
                        }}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </li>
                  ))}
                </div>
              ) : // </span>
              null}
            </div>
                          <div className="col-md-12 mt-6">
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
                            <button
                              className="btn btn-green btn-h-60 text-white min-width-px-210 rounded-5 text-uppercase"
                              onClick={(e) => {
                                e.preventDefault();
                                updateProfile()
                                printRes(userData.name);
                                // updateUserDetails(
                                //   isAuthenticated().access_token,
                                //   isAuthenticated().user_id,
                                //   userData
                                // )
                                //   .then((d1) => {
                                //     printRes(d1);
                                //   })
                                //   .catch((err) => {
                                //     alertInfo(err);
                                //   });
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
export default DashboardSettings;