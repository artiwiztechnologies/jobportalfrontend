import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import PageWrapper from "../components/PageWrapper";
import { Select } from "../components/Core";
import { delJobsByJobId, getJobFromId, getPostedJobByCompanyFromId,isAuthenticated, updateAuthData } from "../helper";
import GlobalContext from "../context/GlobalContext";
import CompanyEditJobModal from "../components/CompanyEditJobModal/CompanyEditJobModal";

const defaultJobs = [
  { value: "pd", label: "Product Designer" },
  { value: "gd", label: "Graphics Designer" },
  { value: "fd", label: "Frontend Developer" },
  { value: "bd", label: "Backend Developer" },
  { value: "cw", label: "Content Writer" },
];

const DashboardJobs = () => {
  const gContext = useContext(GlobalContext);

  const [jobs,setJobs] = useState([]);
  const [jeditData,setJeditData] = useState({});
  const getCompanyPostedJobsClient = () =>{
    getPostedJobByCompanyFromId(isAuthenticated().company_id,isAuthenticated().access_token)
    .then(data=>{
      console.log(data);
      console.log("getting jobs");
      if(data.error==="token_expired"){
        //handle error
        console.log("token expired");
        updateAuthData(isAuthenticated())
        getCompanyPostedJobsClient()
        
      }else{
        // console.log(data)
        setJobs(data.Jobs);
        console.log(data.Jobs);
      }
    })
  }
  useEffect(()=>{
    if(isAuthenticated().company_id)
      getCompanyPostedJobsClient()
    else
        console.log("not a company")
  },[])
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
                  <h3 className="font-size-6 mb-0">Posted Jobs ({jobs.length})</h3>
                </div>
                <div className="col-lg-6">
                  <div className="d-flex flex-wrap align-items-center justify-content-lg-end">
                    <p className="font-size-4 mb-0 mr-6 py-2">Filter by Job:</p>
                    <div className="h-px-48">
                      <Select
                        options={defaultJobs}
                        className="pl-0 h-100 arrow-3 arrow-3-black min-width-px-273  text-black-2 d-flex align-items-center w-100"
                        border={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
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
                          Job Type
                        </th>
                        <th
                          scope="col"
                          className="pl-4 border-0 font-size-4 font-weight-normal"
                        >
                          City
                        </th>
                        <th
                          scope="col"
                          className="pl-4 border-0 font-size-4 font-weight-normal"
                        >
                          Created on
                        </th>
                        <th
                          scope="col"
                          className="pl-4 border-0 font-size-4 font-weight-normal"
                        >
                          Total Applicants
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

                    


                      {/* {
                        JSON.stringify(jobs[1].des)
                      } */}

                     

                      {
                        jobs.map((job) => (
                          <tr className="border border-color-2">
                        <th
                          scope="row"
                          className="pl-6 border-0 py-7 min-width-px-235"
                        >
                          <div className="">
                            <Link href="/job-details">
                              <a className="font-size-4 mb-0 font-weight-semibold text-black-2">
                                {job.title}
                              </a>
                            </Link>
                          </div>
                        </th>
                        <td className="table-y-middle py-7 min-width-px-135">
                          <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                          {job.job_type}
                          </h3>
                        </td>
                        <td className="table-y-middle py-7 min-width-px-125">
                          <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                            New York
                          </h3>
                        </td>
                        <td className="table-y-middle py-7 min-width-px-155">
                          <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                            {job.date}
                          </h3>
                        </td>
                        <td className="table-y-middle py-7 min-width-px-205">
                          <h3 className="font-size-4 font-weight-bold text-black-2 mb-0">
                            4{job.salary}
                          </h3>
                        </td>
                        <td className="table-y-middle py-7 min-width-px-80">
                          <button
                            onClick={()=>{
                              // console.log(gContext.editjid)
                              gContext.changeEditJid(job.id);
                              gContext.toggleShowEditJobModal();
                              getJobFromId(job.id,isAuthenticated().access_token)
                                .then(d=>{
                                  if(d.error==="token_expired"){
                                      updateAuthData(isAuthenticated())
                                      getJobFromId(job.id,isAuthenticated().access_token)
                                        .then(d1=>{
                                          console.log(d1);
                                          setJeditData(d1);
                                          gContext.setEditJobData(d1);
                                        })


                                  }else{
                                  console.log(d);
                                  setJeditData(d);
                                  gContext.setEditJobData(d);

                                  }

                                })
                            }}
                            className="font-size-3 font-weight-bold text-green text-uppercase"
                          >
                            Edit
                          </button>
                        </td>
                        <td className="table-y-middle py-7 min-width-px-100">
                          <button
                          onClick={()=>{
                            delJobsByJobId(job.id,isAuthenticated().access_token) 
                              .then(d=>{
                                console.log(d);
                                if(d.message==="Job deleted."){
                                  alert(d.message);
                                  window.location.reload()
                                }else{
                                  alert("something went wrong!")
                                }

                              })
                          }}
                            
                            className="font-size-3 font-weight-bold text-red-2 text-uppercase"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                        ))
                      }
                     
                    </tbody>
                  </table>
                </div>
                { gContext.editJobData  && <CompanyEditJobModal  />}
              </div>
            </div>
          </div>
          

        </div>
      </PageWrapper>
    </>
  );
};
export default DashboardJobs;