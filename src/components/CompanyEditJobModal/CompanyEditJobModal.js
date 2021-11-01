import React, { useContext, useEffect, useState } from "react";
import {useRouter} from "next/router"
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
import { authenticate, SigninCompany,isAuthenticated, getCompanyWithId, refreshToken, postJob, updateAuthData, getJobFromId, editJobPosted } from "../../helper";
import {alertInfo,alertSuccess,alertWarning , printRes} from "../../helper2/index.js";


const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;j
  } */
`;

const CompanyEditJobModal = () => {
  const router = useRouter();
  
  
  // printRes(jedit_data);
  
  
  const gContext = useContext(GlobalContext);

 

  const [c_name,setC_name] = useState("");
  const [skillsString,setSkillsString] = useState("");

  const [values,setValues]=useState({
    title:gContext.editJobData.title,job_type:gContext.editJobData.job_type,career_level:gContext.editJobData.career_level,skills_required:gContext.editJobData.skills,job_desc:gContext.editJobData.description,job_role:gContext.editJobData.role,
    salary:gContext.editJobData.salary,
    c_addr:"",//from getcompany
    career_level:gContext.editJobData.career_level,
    corp_type:"",//from get company
    comp_size:"",//from getcompany
    





  })
 
  




  const handleClose = () => {
    gContext.toggleShowEditJobModal();
    // setValues({
    //   ...values,
    //   title:jedit_data.title,job_type:jedit_data.job_type,career_level:jedit_data.career_level,skills_required:jedit_data.skills,job_desc:jedit_data.description,job_role:jedit_data.role,
    //   salary:"",
    //   c_addr:"",//from getcompany
    //   career_level:"",
    //   corp_type:"",//from get company
    //   comp_size:"",//from getcompany
    
    // })
    gContext.setEditJobData();
  };

  

  // const [final_skills_req,setFinal_skills_req] = useState(""); 


  const {skills_required,salary,c_addr,career_level,comp_size,corp_type,job_desc,job_role,job_type,title} = values;

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

 
  

//   printRes(gContext.editjid)

 
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
  
//changes to be made for edit jobs
const editTheJob = () =>{
    printRes("edit the job");
   

    printRes(values.skills_required)
    const jjj_data = {
      "title": values.title,
      "description": values.job_desc,
      "applicants": "",
      "available": true,
      "job_type": values.job_type,
      "salary": values.salary,
      "career_level": values.career_level,
      "role": values.job_role,
      "skills": skillsString.length != 0 ? skillsString : values.skills_required
    }

 
    printRes(jjj_data);
    editJobPosted(isAuthenticated().access_token,gContext.editJobData.id,jjj_data)
      .then(d1=>{
        printRes(d1);
        if(d1.error){
          if(d1.error==="token_expired"){
              updateAuthData(isAuthenticated())
              editTheJob()
          }else{
            alertWarning(d1.error)
          }
        }else{
          alertSuccess(d1.message);
          if(d1.message==="Updated successfuly!"){
            window.location.reload();
          }
        }
      })
      .catch(err=>{
        alertWarning(err)
      })
}
 

  return (
    <ModalStyled
     
      size="lg"
      centered
      show={gContext.showEditJobModal}
      onHide={handleClose}
    >
     <div className="p-6">
    <Modal.Header>
      <p className="m-auto text-center">Edit the Job as <span className="font-weight-bold text-success"> {isAuthenticated().name}</span></p>
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
                      placeholder="Enter the job title"
                      id="title"
                      value={title}
                      onChange={handleChange("title")}

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
                     Experience
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your experience"
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
                placeholder="Enter the skills you expect from the applicants"
                id="none"
                value={skills_required}
                onChange={handleChange("skills_required")}
              />
              <button
                className="btn btn-primary mt-5"
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
                CTC
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="eg.10LPA"
                id="none"
                value={salary}
                onChange={handleChange("salary")}
              />
                  

                  <div className="form-group mt-6">
                    <label
                      
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                     Description
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Give a brief decription of the job"
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
                      placeholder="Describe the role of the applicant"
                      id="none"
                      value={job_role}
                      onChange={handleChange("job_role")}

                    />
                  </div>



                  <button className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase" onClick={(e)=>{
                      e.preventDefault();
                    //   postanewJob();
                    editTheJob();
                  }}>Save Changes</button>

                  
                 
                  
                </form>
        </div>
       
        
      </Modal.Body>
      </div>
    </ModalStyled>
  );
};

export default CompanyEditJobModal;
