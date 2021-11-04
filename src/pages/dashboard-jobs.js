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
  jobsList,
} from "../helper2";
import { Modal } from "react-bootstrap";
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

const ConfirmDeleteModal = ({ delModal, setDelModal, jid }) => {
  const [yes, setYes] = useState(false);

  const delJobWithId = () => {
    delJobsByJobId(jid, isAuthenticated().access_token).then((d) => {
      printRes(d);
      if (d.message === "Job deleted.") {
        alertSuccess(d.message);
        window.location.reload();
      } else {
        alertWarning("something went wrong!");
      }
    });
  };

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
            Are you sure you want to delete this Job
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-auto text-center">
          <div
            className="btn btn-primary ml-3"
            style={{ cursor: "pointer" }}
            onClick={() => {
              printRes(jid);
              delJobWithId();
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

const DashboardJobs = () => {
  const [listJobs, setListJobs] = useState([]);

  const gContext = useContext(GlobalContext);
  const [delconfirmModal, setDelconfirmModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [jeditData, setJeditData] = useState({});
  const [jobIdDel, setJobIdDel] = useState();

  const [option, setOption] = useState("");
  const [open, setOpen] = useState(false);

  // const handleChange = (event) => {
  //   event.preventDefault();
  //   setAge(event.target.value);
  // };
  // console.log(option);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const getCompanyPostedJobsClient = () => {
    getPostedJobByCompanyFromId(
      isAuthenticated().company_id,
      isAuthenticated().access_token
    ).then((data) => {
      printRes(data);
      printRes("getting jobs");
      if (data.error === "token_expired") {
        //handle error
        printRes("token expired");
        updateAuthData(isAuthenticated());
        getCompanyPostedJobsClient();
      } else {
        // printRes(data)
        setJobs(data.Jobs);
        printRes(data.Jobs);
      }
    });
  };

  const ListOfJobs = () => {
    jobsList(isAuthenticated().access_token).then((data) => {
      printRes(data);
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
      ListOfJobs();
    } else printRes("not a company");
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
                  <h3 className="font-size-6 mb-0">
                    Posted Jobs ({jobs.length})
                  </h3>
                </div>
                <div className="col-lg-6">
                  <div className="d-flex flex-wrap align-items-center justify-content-lg-end">
                    <p className="font-size-4 mb-0 mr-6 py-2">Filter by Job:</p>
                    <div className="h-px-48">
                      {/* <FormControl sx={{ m: 100, minWidth: 220 }}> */}
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
                      {/* <select
                        style={{
                          borderRadius: "6px",
                          marginTop: "10px",
                          paddingTop: "6px",
                          paddingLeft: "10px",
                          paddingRight: "6px",
                          paddingBottom: "6px",
                        }}
                      >
                        {listJobs.map((job, i) => (
                          <option key={i} value={job}>
                            {job}
                          </option>
                        ))}
                      </select> */}

                      {/* <Select
                        options={defaultJobs}
                        className="pl-0 h-100 arrow-3 arrow-3-black min-width-px-273  text-black-2 d-flex align-items-center w-100"
                        border={false}
                      /> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-8 pt-7 rounded pb-9 px-11">
                <div className="table-responsive ">
                  {jobs.length != 0 && (
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
                            CTC
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
                        {/* {JSON.stringify(listJobs)} */}

                        {jobs
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
                                  {job.salary}
                                </h3>
                              </td>
                              <td className="table-y-middle py-7 min-width-px-80">
                                <span
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    // printRes(gContext.editjid)
                                    gContext.changeEditJid(job.id);
                                    gContext.toggleShowEditJobModal();
                                    getJobFromId(
                                      job.id,
                                      isAuthenticated().access_token
                                    ).then((d) => {
                                      if (d.error === "token_expired") {
                                        updateAuthData(isAuthenticated());
                                        getJobFromId(
                                          job.id,
                                          isAuthenticated().access_token
                                        ).then((d1) => {
                                          printRes(d1);
                                          setJeditData(d1);
                                          gContext.setEditJobData(d1);
                                        });
                                      } else {
                                        printRes(d);
                                        setJeditData(d);
                                        gContext.setEditJobData(d);
                                      }
                                    });
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
                                    setDelconfirmModal(true);
                                    setJobIdDel(job.id);
                                    // delJobsByJobId(job.id,isAuthenticated().access_token)
                                    //   .then(d=>{
                                    //     printRes(d);
                                    //     if(d.message==="Job deleted."){
                                    //       alertSuccess(d.message);
                                    //       window.location.reload()
                                    //     }else{
                                    //       alertWarning("something went wrong!");
                                    //     }

                                    //   })
                                  }}
                                  className="font-size-3 font-weight-bold text-red-2 text-uppercase"
                                >
                                  Delete
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}
                </div>
                {gContext.editJobData && <CompanyEditJobModal />}
              </div>
            </div>
          </div>

          <ConfirmDeleteModal
            delModal={delconfirmModal}
            setDelModal={setDelconfirmModal}
            jid={jobIdDel}
          />
        </div>
      </PageWrapper>
    </>
  );
};
export default DashboardJobs;