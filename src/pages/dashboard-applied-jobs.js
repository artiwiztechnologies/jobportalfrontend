import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import PageWrapper from "../components/PageWrapper";
import CountUp from "react-countup";
import LazyLoad from "react-lazyload";
// import { Select } from "../components/Core";
import SidebarDashboard from "../components/SidebarDashboard/SidebarDashboard";
import {
  delAppliedJobs,
  delJobsByJobId,
  getJobFromId,
  getPostedJobByCompanyFromId,
  isAuthenticated,
  updateAuthData,
  GetJobsApplied,
  getJobsAppliedByApplicant,
} from "../helper";
import { jobsList, printRes } from "../helper2/index";
import GlobalContext from "../context/GlobalContext";
import CompanyEditJobModal from "../components/CompanyEditJobModal/CompanyEditJobModal";
import DeleteConfirmationModel from "../components/DeleteConfirmationModel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const defaultJobs = [
  { value: "pd", label: "Product Designer" },
  { value: "gd", label: "Graphics Designer" },
  { value: "fd", label: "Frontend Developer" },
  { value: "bd", label: "Backend Developer" },
  { value: "cw", label: "Content Writer" },
];

const AppliedJobs = () => {
  const gContext = useContext(GlobalContext);

  const [jobs, setJobs] = useState([]);
  const [jeditData, setJeditData] = useState();
  const [showDelModal, setShowDelModal] = useState(false);
  const [delid, setDelid] = useState();
  const [listJobs, setListJobs] = useState([]);
  const [option, setOption] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const deleteJob = (did) => {
    if (did) {
      // delAppliedJobs(did, isAuthenticated().access_token).then((data) => {
      //   console.log(data);
      //   // change = change +1
      //   window.location.reload();
      // });
      setDelid(did);
      setShowDelModal(true);
    }
  };

  const [appliedjobs, setAppliedJobs] = useState([]);
  // useEffect(() => {
  //   if (isAuthenticated())
  //     getJobsAppliedByApplicant(isAuthenticated().access_token).then((data) => {
  //       console.log(data);
  //       console.log("getting applied jobs");
  //       if (data.error === "token_expired") {
  //         //handle error
  //         console.log("token expired");
  //       } else {
  //         // console.log(data)
  //         setAppliedJobs(data.Jobs);
  //         console.log(data.Jobs);
  //       }
  //     });
  //   else console.log("not a company");
  // }, []);
  const [userAppliedJobs, setUserAppliedJobs] = useState([]);

  const GetJobAppliedByUsers = () => {
    GetJobsApplied(
      isAuthenticated().user_id,
      isAuthenticated().access_token
    ).then((data) => {
      console.log(data);
      console.log("getting jobs applied by user");
      if (data.error === "token_expired") {
        //handle error
        console.log("token expired");
        updateAuthData(isAuthenticated());
        GetJobAppliedByUsers();
      } else {
        // console.log(data)
        setUserAppliedJobs(data.Jobs);
        console.log(data.Jobs);
      }
    });
  };

  const getCompanyPostedJobsClient = () => {
    getPostedJobByCompanyFromId(
      isAuthenticated().company_id,
      isAuthenticated().access_token
    ).then((data) => {
      console.log(data);
      console.log("getting jobs");
      if (data.error === "token_expired") {
        //handle error
        console.log("token expired");
        updateAuthData(isAuthenticated());
        getCompanyPostedJobsClient();
      } else {
        // console.log(data)
        setJobs(data.Jobs);
        console.log(data.Jobs);
      }
    });
  };
  const ListOfJobs = () => {
    jobsList(isAuthenticated().access_token).then((data) => {
      // printRes(data);
      printRes("getting jobs");
      if (data.error === "token_expired") {
        //handle error
        printRes("token expired");
        updateAuthData(isAuthenticated());
        ListOfJobs();
      } else {
        // printRes(data)
        setListJobs(data.titles);
        printRes(data.titles);
      }
    });
  };

  useEffect(() => {
    if (isAuthenticated().company_id) {
      getCompanyPostedJobsClient();
    } else if (isAuthenticated().user_id) {
      ListOfJobs();
      GetJobAppliedByUsers();
    } else {
      console.log("not a company");
    }
  }, []);
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
                  {isAuthenticated().company_id ? (
                    <h3 className="font-size-6 mb-0">
                      Posted Jobs ({jobs.length})
                    </h3>
                  ) : (
                    <h3 className="font-size-6 mb-0 d-flex">
                      <span>Jobs Applied &nbsp;</span>
                      <span>(</span>
                      <LazyLoad>
                        <CountUp duration={3} end={userAppliedJobs?.length} />
                      </LazyLoad>
                      <span>)</span>
                    </h3>
                  )}
                </div>
                <div className="col-lg-6">
                  <div className="d-flex flex-wrap align-items-center justify-content-lg-end">
                    <p className="font-size-4 mb-0 mr-6 py-2">Filter by Job:</p>
                    <div className="h-px-48">
                      <FormControl style={{ minWidth: 120 }}>
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
                          {/* <MenuItem value="">
                            <em>None</em>
                          </MenuItem> */}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-8 pt-7 rounded pb-9 px-11">
                <div className="table-responsive ">
                  {userAppliedJobs && (
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
                            Salary
                          </th>
                          <th
                            scope="col"
                            className="pl-4 border-0 font-size-4 font-weight-normal"
                          >
                            Status
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
                        {/* {JSON.stringify(userAppliedJobs)} */}
                        {userAppliedJobs
                          .filter((val) => {
                            if (option == "") {
                              return val;
                            } else if (val.title === option) {
                              return val;
                            }
                          })
                          .map((job) => (
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
                                  {job.location}
                                </h3>
                              </td>
                              <td className="table-y-middle py-7 min-width-px-155">
                                <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                                  {job.date}
                                </h3>
                              </td>
                              <td className="table-y-middle py-7 min-width-px-205">
                                <h3 className="font-size-4 font-weight-bold text-black-2 mb-0">
                                  {job.salary}
                                </h3>
                              </td>
                              <td className="table-y-middle py-7 min-width-px-205">
                                <h3 className="font-size-4 font-weight-bold text-black-2 mb-0">
                                  {job.status}
                                </h3>
                              </td>

                              <td className="table-y-middle py-7 min-width-px-100">
                                <span
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    deleteJob(job.application_id);
                                  }}
                                  className="font-size-3 font-weight-bold text-red-2 text-uppercase"
                                >
                                  Delete
                                </span>
                              </td>
                            </tr>
                          ))}

                        {jobs.map((job) => (
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
                                onClick={() => {
                                  // console.log(gContext.editjid)
                                  gContext.changeEditJid(job.id);
                                  gContext.toggleShowEditJobModal();
                                  getJobFromId(
                                    job.id,
                                    isAuthenticated().access_token
                                  ).then((d) => {
                                    console.log(d);
                                    setJeditData(d);
                                  });
                                }}
                                className="font-size-3 font-weight-bold text-green text-uppercase"
                              >
                                Edit
                              </button>
                            </td>
                            <td className="table-y-middle py-7 min-width-px-100">
                              <button
                                onClick={() => {
                                  delJobsByJobId(
                                    job.id,
                                    isAuthenticated().access_token
                                  ).then((d) => {
                                    console.log(d);
                                    if (d.message === "Job deleted.") {
                                      alert(d.message);
                                      window.location.reload();
                                    } else {
                                      alert("something went wrong!");
                                    }
                                  });
                                }}
                                className="font-size-3 font-weight-bold text-red-2 text-uppercase"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
                {jeditData && <CompanyEditJobModal jedit_data={jeditData} />}
              </div>
            </div>
          </div>
          <DeleteConfirmationModel
            delModal={showDelModal}
            setDelModal={setShowDelModal}
            jid={delid}
          />
        </div>
      </PageWrapper>
    </>
  );
};
export default AppliedJobs;