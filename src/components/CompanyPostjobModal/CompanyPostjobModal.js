import React, { useContext, useEffect, useState } from "react";
import {useRouter} from "next/router"
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
import { authenticate, SigninCompany,isAuthenticated, getCompanyWithId, refreshToken, postJob, updateAuthData } from "../../helper";
import { alertInfo, printRes } from "../../helper2";


const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;j
  } */
`;

const CompanyPostjobModal = (props) => {
  const router = useRouter();
  
  // printRes(window.location.pathname)
  
  const gContext = useContext(GlobalContext);

  const handleClose = () => {
    gContext.togglePostjobModal();
  };

  const [c_name,setC_name] = useState("");

  const [values,setValues]=useState({
    post_title:"",
    job_type:"",
    c_addr:"",//from getcompany
    career_level:"",
    corp_type:"",//from get company
    comp_size:"",//from getcompany
    skills_required:"",
    job_desc:"",
    job_role:"",
    salary:""





  })

  // const [final_skills_req,setFinal_skills_req] = useState(""); 


  const {skills_required,c_addr,career_level,comp_size,corp_type,job_desc,job_role,job_type,post_title,salary} = values;

  const handleChange = name => event =>{
    setValues({
        ...values,[name]:event.target.value
    })
}
   
  const auth_data = isAuthenticated();

  useEffect(()=>{
    
    if(isAuthenticated().company_id)
      getCompanyWithId(isAuthenticated().company_id,isAuthenticated().access_token)
          .then(data=>{
            if(data.error==="token_expired"){
              refreshToken(isAuthenticated().refresh_token)
                .then(res=>{
                  printRes(res);
                  getCompanyWithId(isAuthenticated().company_id,res.access_token)
                    .then(ress1=>{
                      printRes(ress1);

                      //todo change in the local storage
                      
                      setValues({...values,c_addr:ress1.location,corp_type:ress1.companyType,comp_size:ress1.companySize});


                    })
                })
            }else{
              printRes(data);
              setValues({...values,c_addr:data.location,corp_type:data.companyType,comp_size:data.companySize});

            }
          })
    else
          printRes("not a company")
  },[])
  
const [skillsString,setSkillsString] = useState(""); 
const addSkill = () =>{
  // skillsString = skillsString + ", " + skills_required;
  // printRes(skillsString)
  if(skillsString.length === 0){
    setSkillsString(skillsString+skills_required);
    setValues({
      ...values,
      skills_required:""
    })

  }else{
  setSkillsString(skillsString+","+skills_required);
  setValues({
    ...values,
    skills_required:""
  })
  }
  // setSkillsString(skillsString+skills_required+",");
  // setValues({
  //   ...values,
  //   skills_required:""
  // })

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
  

const postanewJob = () =>{
  printRes(skillsString)
    // printRes(values);
    // printRes(values.post_title);
    const j_data = {
      "title": values.post_title,
      "description": values.job_desc,
      "applicants": "",
      "available": true,
      "job_type": values.job_type,
      "salary": values.salary,
      "career_level": values.career_level,
      "role": values.job_role,
      "skills":skillsString
      
    }
    // printRes(j_data);
    
    postJob(isAuthenticated().access_token,j_data)
      .then(data=>{

        if(data.error==="token_expired"){
          //handle expired token
          printRes("token expired");
          refreshToken(isAuthenticated().refresh_token)
                .then(r=>{
                  printRes(r);
                  postJob(isAuthenticated().company_id,r.access_token)
                    .then(ress2=>{
                      printRes(ress2);

                      //todo change in the local storage
                      setValues({...values,
          post_title:"",
          job_type:"",
          salary:"",
          
          career_level:"",
      
          skills_required:"",
          job_desc:"",
          job_role:""
      
        })
        setSkillsString("");
        alertInfo("job posted successfully");
        gContext.togglePostjobModal();
        if(window.location.pathname==="/dashboard-jobs"){
            window.location.reload()
        }
        router.push("/dashboard-jobs");
                      


                    })
                })
                ///////////////////////////

        }else{
        printRes(data);
        setValues({...values,
          post_title:"",
          job_type:"",
          
          career_level:"",
          salary:"",
          skills_required:"",
          job_desc:"",
          job_role:""
      
        })
        setSkillsString("");
        
        alertInfo("job posted successfully");
        printRes(window.location.pathname)

        if(window.location.pathname==="/dashboard-jobs"){
          printRes(window.location.pathname)
          window.location.reload()
          printRes("reload")
      }
      router.push("/dashboard-jobs");


        gContext.togglePostjobModal();
        // router.push("/dashboard-jobs");
      }
      })
      
}

 

  return (
    <ModalStyled
      {...props}
      size="lg"
      centered
      show={gContext.showPostjobModal}
      onHide={gContext.togglePostjobModal}
    >
    <Modal.Header>
      <p>Post a new Job as {isAuthenticated().email}</p>
      <button
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
          onClick={handleClose}
        >
          <i className="fas fa-times"></i>
        </button>
    </Modal.Header>
      <Modal.Body className="p-0">
        
        <div className="content p-5">
        <form action="/">
                  <div className="form-group">
                    <label
                      
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                     Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter the job title"
                      id="post_title"
                      value={post_title}
                      onChange={handleChange("post_title")}

                    />
                  </div>

                  {/* job_type change it to select option */}


                  <div className="form-group">
                    <label
                      
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                     Job Type
                    </label>
                   

                    <select value={job_type} className="form-control" onChange={handleChange("job_type")}>
                      <option value="">Choose Job Type</option>
                      <option value="Full Time">Full time</option>
                      <option value="Part Time">Part time</option>

                      <option value="Intern">Intern</option>

                    </select>
                  </div>


                  
                  <div className="form-group">
                    <label
                      
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                     Career Level
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter the career level"
                      id="none"
                      value={career_level}
                      onChange={handleChange("career_level")}

                    />
                  </div>

                  {/* change the skils_required differently */}
                  <div className="form-group">
              <label className="font-size-4 text-black-2 font-weight-semibold line-height-reset">
                Skills required
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="enter the skills you expect from the applicants"
                id="none"
                value={skills_required}
                onChange={handleChange("skills_required")}
              />
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  addSkill();
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
            <label className="font-size-4 text-black-2 font-weight-semibold line-height-reset">
                Salary
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="enter the salary you provide in Rupees"
                id="none"
                value={salary}
                onChange={handleChange("salary")}
              />

                  <div className="form-group">
                    <label
                      
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                     Description
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="give a brief decription of the job"
                      id="none"
                      value={job_desc}
                      onChange={handleChange("job_desc")}

                    />
                  </div>

                  <div className="form-group">
                    <label
                      
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                     Job Role
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="describe the role of the applicant"
                      id="none"
                      value={job_role}
                      onChange={handleChange("job_role")}

                    />
                  </div>



                  <button className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase" onClick={(e)=>{
                      e.preventDefault();
                      postanewJob();
                  }}>POST</button>

                  
                 
                  
                </form>
        </div>
       
        
      </Modal.Body>
    </ModalStyled>
  );
};

export default CompanyPostjobModal;
