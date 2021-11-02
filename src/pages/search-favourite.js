




import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import PageWrapper from "../components/PageWrapper";
import Sidebar from "../components/Sidebar";
import { Select } from "../components/Core";
import GlobalContext from "../context/GlobalContext";
import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";
import { Range, getTrackBackground } from "react-range";
import search from "../assets/search.gif";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from 'notiflix';

const STEP = 1;
const MIN = 50;
const MAX = 180;

import {
  applyForJob,
  getAllJobs,
  GetAppliedUsers,
  getPostedJobByCompanyFromId,
  isAuthenticated,
  refreshToken,
  updateAuthData,
  addToFav,
  getFav,

} from "../helper";

import { alertInfo, printRes, alertWarning, alertSuccess, totalJobs, checkSubscription } from "../helper2"

import imgB1 from "../assets/image/l1/png/feature-brand-1.png";
import imgB2 from "../assets/image/l1/png/feature-brand-2.png";
import imgB3 from "../assets/image/l1/png/feature-brand-3.png";
import imgB4 from "../assets/image/l1/png/feature-brand-4.png";
import imgB5 from "../assets/image/l1/png/feature-brand-5.png";
import imgB6 from "../assets/image/l1/png/feature-brand-6.png";
import { marginRight } from "styled-system";
import router from "next/router";

const defaultCountries = [
  { value: "sp", label: "Dubai" },
  { value: "bd", label: "India" },
  { value: "pk", label: "Nepal" },
];

const ModalViewJobDetails = ({
  show,
  handleClose,
  handleShow,
  ModalJobData,
}) => {
  const jobApply = (j_id) => {
    applyForJob(
      isAuthenticated().user_id,
      j_id,
      isAuthenticated().access_token
    ).then((data) => {

      if (data.error === "token_expired") {
        updateAuthData(isAuthenticated())
        jobApply(j_id);
      }
      if (data.message === "Applied successfuly!!") {
        // alertInfo(data.message);
        alertSuccess(data.message);

      } else {
        // alertInfo(data.message);
        // Notiflix.Notify.info(data.message,{
        //   position: "center-top"
        // });
        alertWarning(data.message)
        //then do error handling stuff here
      }
    });

  };

  const savetheJob = (jid) => {
    addToFav(isAuthenticated().user_id, jid, isAuthenticated().access_token)
      .then(dt1 => {
        printRes(dt1);
        if (dt1.error === "token_expired") {
          updateAuthData(isAuthenticated())
          savetheJob(jid)
        }
        if (dt1.message === "Applied successfuly!!") {
          // alertInfo(dt1.message);
          Notiflix.Notify.success(dt1.message);

        } else {
          // alertInfo(dt1.message);
          Notiflix.Notify.failure(dt1.message);

          //then do error handling stuff here
        }
      })
  }
  if (ModalJobData) {
    printRes(ModalJobData);

    return (
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header>
          <button
            type="button"
            className="circle-32 btn-reset bg-white pos-abs-tr mt-n6 mr-lg-n6 focus-reset shadow-10"
            onClick={handleClose}
          >
            <i className="fas fa-times"></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="bg-white rounded-4 border border-mercury shadow-9">
            {/* <!-- Single Featured Job --> */}
            <div className="pt-9 pl-sm-9 pl-5 pr-sm-9 pr-5 pb-8 border-bottom border-width-1 border-default-color light-mode-texts">
              <div className="row">
                <div className="col-md-6">
                  {/* <!-- media start --> */}
                  <div className="media align-items-center">
                    {/* <!-- media logo start --> */}
                    <div className="square-72 d-block mr-8">
                      {/* <img src={imgF1} alt="" /> */}
                      <img width="70" height="71"
                        src={ModalJobData.photoURL ? ModalJobData.photoURL : "data:image/png;base64,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"}
                        alt="" />
                    </div>
                    {/* <!-- media logo end --> */}
                    {/* <!-- media texts start --> */}
                    <div>
                      <h3 className="font-size-6 mb-0">{ModalJobData.title}</h3>
                      <span className="font-size-3 text-gray line-height-2">
                        {ModalJobData.company_name}
                      </span>
                    </div>
                    {/* <!-- media texts end --> */}
                  </div>
                  {/* <!-- media end --> */}
                </div>
                <div className="col-md-6 text-right pt-7 pt-md-0 mt-md-n1">
                  {/* <!-- media date start --> */}
                  <div className="media justify-content-md-end">
                    <p className="font-size-4 text-gray mb-0">
                      {ModalJobData.date}
                    </p>
                  </div>
                  {/* <!-- media date end --> */}
                </div>
              </div>
              <div className="row pt-9">
                <div className="col-12">
                  {/* <!-- card-btn-group start --> */}
                  <div className="card-btn-group">
                    <button
                      className="btn btn-green text-uppercase btn-medium rounded-3 w-180 mr-4 mb-5"
                      onClick={() => {
                        printRes(ModalJobData.id);
                        jobApply(ModalJobData.id);

                      }}
                    >
                      Apply to this job
                    </button>

                    <span onClick={() => {
                      printRes("save job!")
                      //addToFav function
                      savetheJob(ModalJobData.id);

                    }} className="btn btn-outline-mercury text-black-2 text-uppercase h-px-48 rounded-3 mb-5 px-5">

                      <i className="icon icon-bookmark-2 font-weight-bold mr-4 font-size-4"></i>{" "}
                      Save job

                    </span>
                  </div>
                  {/* <!-- card-btn-group end --> */}
                </div>
              </div>
            </div>
            {/* <!-- End Single Featured Job --> */}
            <div className="job-details-content pt-8 pl-sm-9 pl-6 pr-sm-9 pr-6 pb-10 border-bottom border-width-1 border-default-color light-mode-texts">
              <div className="row mb-7">
                <div className="col-md-4 mb-lg-0 mb-10">
                  <div className="">
                    <span className="font-size-4 d-block mb-4 text-gray">
                      Salary
                    </span>
                    <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                      {ModalJobData.salary
                        ? `Rs.${ModalJobData.salary}`
                        : "unavailable"}
                    </h6>
                  </div>
                </div>
                <div className="col-md-4 pr-lg-0 pl-lg-10 mb-lg-0 mb-8">
                  <div className="">
                    <span className="font-size-4 d-block mb-4 text-gray">
                      Job Type
                    </span>
                    <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                      {ModalJobData.job_type
                        ? ModalJobData.job_type
                        : "unavailable"}
                    </h6>
                  </div>
                </div>
                <div className="col-md-4 pr-lg-0 pl-lg-10 mb-lg-0 mb-8">
                  <div className="">
                    <span className="font-size-4 d-block mb-4 text-gray">
                      Location
                    </span>
                    <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                      {ModalJobData.location
                        ? ModalJobData.location
                        : "unavailable"}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-lg-0 mb-10">
                  <div className="">
                    <span className="font-size-4 d-block mb-4 text-gray">
                      Career Level
                    </span>
                    <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                      {ModalJobData.career_level
                        ? ModalJobData.career_level
                        : "unavailable"}
                    </h6>
                  </div>
                  <div className="">
                    <span className="font-size-4 d-block mb-4 text-gray">
                      Technical Skill
                    </span>
                    <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                      <div className="tags">
                        <ul className="d-flex list-unstyled flex-wrap pr-sm-25 pr-md-0">
                          {ModalJobData.skills.split(", ").map((c) => (
                            <li
                              className="bg-regent-opacity-15 mr-3 h-px-33 text-center flex-all-center rounded-3 px-5 font-size-3 text-black-2 mt-2"
                              key={c}
                            >
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </h6>
                  </div>
                </div>
                <div className="col-md-4 pr-lg-0 pl-lg-10 mb-lg-0 mb-8">
                  <div className="">
                    <span className="font-size-4 d-block mb-4 text-gray">
                      Type of corporation
                    </span>
                    <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                      {ModalJobData.company_type
                        ? ModalJobData.company_type
                        : "unavailable"}
                    </h6>
                  </div>
                </div>
                <div className="col-md-4 pl-lg-0">
                  <div className="">
                    <span className="font-size-4 d-block mb-4 text-gray">
                      Company size
                    </span>
                    <h6 className="font-size-5 text-black-2 font-weight-semibold mb-0">
                      {ModalJobData.company_size
                        ? `${ModalJobData.company_size} employees`
                        : "unavailable"}
                    </h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="job-details-content pt-8 pl-sm-9 pl-6 pr-sm-9 pr-6 pb-10 light-mode-texts">
              <div className="row">
                <div className="col-xl-11 col-md-12 pr-xxl-9 pr-xl-10 pr-lg-20">
                  <div className="">
                    <p className="mb-4 font-size-4 text-gray">
                      Job Description
                    </p>
                    <p className="font-size-4 text-black-2 mb-7">
                      {ModalJobData.description}
                    </p>
                  </div>
                  <div className="">
                    <span className="font-size-4 font-weight-semibold text-black-2 mb-7">
                      Your Role:
                    </span>
                    <p className="font-size-4 text-black-2 mb-7">
                      {ModalJobData.role}
                    </p>

                    <button onClick={() => {
                      jobApply(ModalJobData.id)
                    }} className="btn btn-green text-uppercase btn-medium w-180 h-px-48 rounded-3 mr-4 mt-6">
                      Apply to this job
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  } else {
    return <div>{handleClose()}</div>;
  }
};

const CheckStyled = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #2b3940 !important;
  font-size: 16px;
  color: inherit;
  &::before {
    content: "\f0c8";
    font-weight: 400;
    font-family: "Font Awesome 5 Free";
    display: inline-block;
    color: #7e8989;
    margin-right: 11px;
    margin-top: 2px;
  }
  &.active {
    color: #2b3940 !important;
    font-weight: 600;
    &::before {
      content: "\f14a";
      font-weight: 900;
      color: #00b074;
    }
  }
`;



const SearchGrid = () => {
  const [show, setShow] = useState(false);
  const [showApply, setShowApply] = useState(false);

  const handleClose = () => {
    setShow(false);
    setReqjobdata();
  };
  const handleApplyClose = () => setShowApply(false);

  const handleShow = (job) => {
    setReqjobdata(job);
    setShow(true);
  };
  const handleApplyShow = () => setShowApply(true);

  const [jobs, setJobs] = useState([]);
  const [reqjobdata, setReqjobdata] = useState();
  const [subscribed, setSubscribed] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState();

  const gContext = useContext(GlobalContext);

  // var job_type = gContext.filterJobType;

  const [query, setQuery] = useState("");

  printRes(gContext.filterJobType1);
  printRes(gContext.filterJobType2);
  printRes(gContext.filterJobType3);

  const getSavedJobs = () => {
    getFav(isAuthenticated().access_token)
      .then(data => {
        printRes(data);
        if (data.error === "token_expired") {
          updateAuthData(isAuthenticated())
          getSavedJobs()
        } else {
          setJobs(data.jobs)
        }
      })
  }

  const jobApply = (j_id) => {
    applyForJob(
      isAuthenticated().user_id,
      j_id,
      isAuthenticated().access_token
    ).then((data) => {
      printRes(data);
      if (data.error === "token_expired") {
        updateAuthData(isAuthenticated())
        jobApply(j_id);
      }
      if (data.message === "Applied successfuly!!") {
        alertSuccess(data.message);
      } else {
        alertWarning(data.message);
        //then do error handling stuff here
      }
    });

  };

  const getjobs = () => {
    getAllJobs(isAuthenticated().access_token)
      .then(data => {
        if (data.error === "token_expired") {
          printRes("error:", data.error)
          updateAuthData(isAuthenticated())
          getjobs();



        } else {
          printRes(data);
          printRes("hey")
          setJobs(data.Jobs)
        }
      })
  }

  const savetheJob = (jid) => {
    addToFav(isAuthenticated().user_id, jid, isAuthenticated().access_token)
      .then(dt1 => {
        printRes(dt1);
        if (dt1.error === "token_expired") {
          updateAuthData(isAuthenticated())
          savetheJob(jid)
          if (dt1.message === "Applied successfuly!!") {
            alertSuccess(dt1.message);
          } else {
            alertWarning(dt1.message);
            //then do error handling stuff here
          }
        }
      })
  }




  useEffect(() => {
    if (isAuthenticated()) {

      checkSubscription(isAuthenticated().access_token)
        .then(data => {
          printRes(data);
          if (data.active) {
            setSubscribed(true);
            setSubscriptionData(data);
            getSavedJobs();
          } else {
            router.push("/pricing");
            alertInfo("please subscribe to a plan!");
          }
        })


    }
    else {
      alertWarning("please do login to continue!");
      router.push("/");

    }
  }, [])




  return (
    <>
      <PageWrapper>
        <div className="bg-default-1 pt-26 pt-lg-28 pb-13 pb-lg-25">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-4 col-xs-8">
                <Sidebar />
              </div>
              <div className="col-12 col-md-8 col-xs-12 ">
                {/* <!-- form --> */}
                <form
                  action="/"
                  className="search-form search-2-adjustment ml-lg-0 ml-md-15"
                >
                  <div
                    style={{ borderRadius: "44px", marginRight: "250px" }}
                    className="filter-search-form-2 bg-white shadow-7 pr-6 py-6 pl-6"
                  >
                    <div className="filter-inputs">
                      <div
                        // style={{ marginRight: "50px" }}
                        className="form-group position-relative w-lg-45 w-xl-40 w-xxl-45"
                      >
                        <input
                          className="form-control focus-reset pl-13"
                          type="text"
                          id="keyword"
                          value={query}
                          placeholder="Search your job"
                          onChange={(event) => setQuery(event.target.value)}
                        />
                        <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
                          <img
                            src={search}
                            width="46px"
                            heigth="46px"
                            alt="search"
                          />
                          {/* <i className="icon icon-zoom-2 text-primary font-weight-bold"></i> */}
                        </span>
                      </div>
                      {/* <!-- .select-city starts --> */}
                      <div className="form-group position-relative w-lg-55 w-xl-60 w-xxl-55">
                        <Select
                          options={defaultCountries}
                          className="pl-8 h-100 arrow-3 font-size-4 d-flex align-items-center w-100"
                          border={false}
                        />

                        <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
                          <i className="icon icon-pin-3 text-primary font-weight-bold"></i>
                        </span>
                      </div>
                      {/* <!-- ./select-city ends --> */}
                    </div>
                    {/* <div className="button-block">
                      <button className="btn btn-primary line-height-reset h-100 btn-submit w-100 text-uppercase">
                        Search
                      </button>
                    </div> */}
                  </div>
                </form>
                <div className="pt-12 ml-lg-0 ml-md-15">
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 className="font-size-4 font-weight-normal text-default-color">

                      Total no of{" "}
                      <span className="heading-default-color">Saved Jobs:</span>
                      <span className="heading-default-color">{jobs?.length}</span>
                    </h5>
                    <div className="d-flex align-items-center result-view-type">

                      <Link href="/search-grid">
                        <a className="heading-default-color pl-5 font-size-6 hover-text-hitgray ">
                          <i className="fa fa-th-large"></i>
                        </a>
                      </Link>
                      <Link href="/search-favourite">
                        <a className="heading-default-color pl-5 font-size-6 hover-text-hitgray active">
                          <i class="fas fa-heart"></i>
                        </a>
                      </Link>
                    </div>
                  </div>

                  <div className="pt-6">
                    <div className="row justify-content-center">
                      {/* <ModalViewJobDetails show={show} handleshow={handleShow} handleClose={handleClose} ModalJobData={reqjobdata} /> */}

                      {/* job.job_type === gContext.filterJobType

  job.title.toLowerCase().includes(query.toLowerCase()) */}

                      {jobs.map((job) =>
                        gContext.filterJobType1 === "" &&
                          gContext.filterJobType2 === "" &&
                          gContext.filterJobType3 === "" &&
                          query === "" ? (
                          <div
                            style={{ cursor: "pointer" }}
                            className="col-12 col-lg-6"
                            key={job.id}
                          >
                            <div
                              onClick={() => {
                                handleShow(job);
                              }}
                              className=" bg-white px-8 pt-9 pb-7 rounded-4 mb-9 feature-cardOne-adjustments"
                            >
                              <div className="d-block mb-7">
                                <a>
                                  <img width="70" height="71" className="rounded-2"
                                    src={job.photoURL ? job.photoURL : "data:image/png;base64,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"}
                                    alt="" />
                                </a>
                              </div>

                              <span className="font-size-3 d-block mb-0 text-gray">
                                {job.company_name}
                              </span>

                              <h2 className="mt-n4">
                                <span className="font-size-7 text-black-2 font-weight-bold mb-4">
                                  {job.title}
                                </span>
                              </h2>
                              <ul className="list-unstyled mb-1 card-tag-list">
                                <li>
                                  <a className="bg-regent-opacity-15 text-denim font-size-3 rounded-3">
                                    <i className="icon icon-pin-3 mr-2 font-weight-bold"></i>{" "}
                                    {job.location
                                      ? job.location
                                      : "not available"}
                                  </a>
                                </li>
                                <li>

                                  <a className="bg-regent-opacity-15 text-orange font-size-3 rounded-3">
                                    <i className="fa fa-briefcase mr-2 font-weight-bold"></i>{" "}
                                    {job.job_type
                                      ? job.job_type
                                      : "unavailable"}
                                  </a>

                                </li>
                                <li>

                                  <a className="bg-regent-opacity-15 text-eastern font-size-3 rounded-3">
                                    <i class="fas fa-rupee-sign"></i>
                                    {job.salary
                                      ? job.salary
                                      : "not mentioned"}
                                  </a>

                                </li>
                              </ul>
                              <p className="mb-7 font-size-4 text-gray">
                                {job.description}
                              </p>
                              <div className="card-btn-group">
                                <button onClick={() => {
                                  jobApply(job.id)
                                }} className="btn btn-green text-uppercase btn-medium rounded-3">
                                  Apply Now
                                </button>


                                <span onClick={() => {
                                  savetheJob(job.id);
                                }} className="btn btn-outline-mercury text-black-2 text-uppercase btn-medium rounded-3">
                                  <i className="icon icon-bookmark-2 font-weight-bold mr-4 font-size-4"></i>{" "}
                                  Save it
                                </span>

                              </div>
                            </div>
                          </div>
                        ) : job.title
                          .toLowerCase()
                          .includes(query.toLowerCase()) &&
                          gContext.filterJobType3 === "" &&
                          gContext.filterJobType1 === "" &&
                          gContext.filterJobType2 === "" ? (
                          <div
                            style={{ cursor: "pointer" }}
                            className="col-12 col-lg-6"
                            key={job.id}
                          >
                            <div
                              onClick={() => {
                                handleShow(job);
                              }}
                              className=" bg-white px-8 pt-9 pb-7 rounded-4 mb-9 feature-cardOne-adjustments"
                            >
                              <div className="d-block mb-7">
                                <a>
                                  <img width="70" height="71"
                                    src={job.photoURL ? job.photoURL : "data:image/png;base64,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"}
                                    alt="" />
                                </a>
                              </div>

                              <span className="font-size-3 d-block mb-0 text-gray">
                                {job.company_name}
                              </span>

                              <h2 className="mt-n4">
                                <span className="font-size-7 text-black-2 font-weight-bold mb-4">
                                  {job.title}
                                </span>
                              </h2>
                              <ul className="list-unstyled mb-1 card-tag-list">
                                <li>
                                  <a className="bg-regent-opacity-15 text-denim font-size-3 rounded-3">
                                    <i className="icon icon-pin-3 mr-2 font-weight-bold"></i>{" "}
                                    {job.location
                                      ? job.location
                                      : "not available"}
                                  </a>
                                </li>
                                <li>

                                  <a className="bg-regent-opacity-15 text-orange font-size-3 rounded-3">
                                    <i className="fa fa-briefcase mr-2 font-weight-bold"></i>{" "}
                                    {job.job_type
                                      ? job.job_type
                                      : "unavailable"}
                                  </a>

                                </li>
                                <li>

                                  <a className="bg-regent-opacity-15 text-eastern font-size-3 rounded-3">
                                    <i className="fa fa-dollar-sign mr-2 font-weight-bold"></i>{" "}
                                    {job.salary
                                      ? job.salary
                                      : "not mentioned"}
                                  </a>

                                </li>
                              </ul>
                              <p className="mb-7 font-size-4 text-gray">
                                {job.description}
                              </p>
                              <div className="card-btn-group">
                                <button onClick={() => {
                                  jobApply(job.id)
                                }} className="btn btn-green text-uppercase btn-medium rounded-3">
                                  Apply Now
                                </button>


                                <span onClick={() => {
                                  savetheJob(job.id);
                                }} className="btn btn-outline-mercury text-black-2 text-uppercase btn-medium rounded-3">
                                  <i className="icon icon-bookmark-2 font-weight-bold mr-4 font-size-4"></i>{" "}
                                  Save it
                                </span>

                              </div>
                            </div>
                          </div>
                        ) : //replace
                          job.job_type === gContext.filterJobType1 ||
                            job.job_type === gContext.filterJobType2 ||
                            job.job_type === gContext.filterJobType3 ? (
                            job.title
                              .toLowerCase()
                              .includes(query.toLowerCase()) ? (
                              <div
                                style={{ cursor: "pointer" }}
                                className="col-12 col-lg-6"
                                key={job.id}
                              >
                                <div
                                  onClick={() => {
                                    handleShow(job);
                                  }}
                                  className=" bg-white px-8 pt-9 pb-7 rounded-4 mb-9 feature-cardOne-adjustments"
                                >
                                  <div className="d-block mb-7">
                                    <a>
                                      <img width="70" height="71"
                                        src={job.photoURL ? job.photoURL : "data:image/png;base64,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"}
                                        alt="" />
                                    </a>
                                  </div>

                                  <span className="font-size-3 d-block mb-0 text-gray">
                                    {job.company_name}
                                  </span>

                                  <h2 className="mt-n4">
                                    <span className="font-size-7 text-black-2 font-weight-bold mb-4">
                                      {job.title}
                                    </span>
                                  </h2>
                                  <ul className="list-unstyled mb-1 card-tag-list">
                                    <li>
                                      <a className="bg-regent-opacity-15 text-denim font-size-3 rounded-3">
                                        <i className="icon icon-pin-3 mr-2 font-weight-bold"></i>{" "}
                                        {job.location
                                          ? job.location
                                          : "not available"}
                                      </a>
                                    </li>
                                    <li>

                                      <a className="bg-regent-opacity-15 text-orange font-size-3 rounded-3">
                                        <i className="fa fa-briefcase mr-2 font-weight-bold"></i>{" "}
                                        {job.job_type
                                          ? job.job_type
                                          : "unavailable"}
                                      </a>

                                    </li>
                                    <li>

                                      <a className="bg-regent-opacity-15 text-eastern font-size-3 rounded-3">
                                        <i className="fa fa-dollar-sign mr-2 font-weight-bold"></i>{" "}
                                        {job.salary
                                          ? job.salary
                                          : "not mentioned"}
                                      </a>

                                    </li>
                                  </ul>
                                  <p className="mb-7 font-size-4 text-gray">
                                    {job.description}
                                  </p>
                                  <div className="card-btn-group">
                                    <button onClick={() => {
                                      jobApply(job.id)
                                    }} className="btn btn-green text-uppercase btn-medium rounded-3">
                                      Apply Now
                                    </button>


                                    <span onClick={() => {
                                      savetheJob(job.id)
                                    }} className="btn btn-outline-mercury text-black-2 text-uppercase btn-medium rounded-3">
                                      <i className="icon icon-bookmark-2 font-weight-bold mr-4 font-size-4"></i>{" "}
                                      Save it
                                    </span>

                                  </div>
                                </div>
                              </div>
                            ) : null
                          ) : null
                      )}

                      <ModalViewJobDetails
                        show={show}
                        handleshow={handleShow}
                        handleClose={handleClose}
                        ModalJobData={reqjobdata}
                      />
                    </div>
                    <div className="text-center pt-5 pt-lg-13">
                      {/* <Link href="/#">
                        <a className="text-green font-weight-bold text-uppercase font-size-3 d-flex align-items-center justify-content-center">
                          Load More{" "}
                          <i className="fas fa-sort-down ml-3 mt-n2 font-size-4"></i>
                        </a>
                      </Link> */}
                    </div>
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
export default SearchGrid;
