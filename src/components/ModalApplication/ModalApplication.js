import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";

// import ProfileSidebar from "../ProfileSidebar";
import { isAuthenticated, updateAuthData } from "../../helper/index";
import imgF1 from "../../assets/image/l2/png/featured-job-logo-1.png";
import imgF2 from "../../assets/image/l1/png/feature-brand-1.png";
import imgF3 from "../../assets/image/svg/harvard.svg";
import imgF4 from "../../assets/image/svg/mit.svg";
import imgL from "../../assets/image/svg/icon-loaction-pin-black.svg";
import { Avatar } from "@material-ui/core";
import { getUser, printRes } from "../../helper2";

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
  .modal-dialog {
    margin: 1.75rem auto;
    max-width: 100%;
  }
  .modal-content {
    background: transparent;
  }
`;

const ModalApplicants = (props) => {
  const gContext = useContext(GlobalContext);

  const handleClose = () => {
    gContext.toggleApplicationModal();
  };

  const [job, setJob] = useState([]);
 
  let data = gContext.applicantsdata;
  
  
  printRes(data);
  printRes(data.skills)
  let arr;
  printRes(typeof(data.skills))
   if(typeof(data.skills)=="string"){
    arr = data.skills.split(",");
   }

   printRes(arr)
   
  // let skills = data.skills;
  
  // printRes(skills);
  // let skillsArr = skills.split(',');

  // useEffect(() => {
  //   getUser(id, isAuthenticated().access_token).then((data) => {
  //     console.log(data);
  //     console.log("getting jobs");
  //     if (data?.error === "token_expired") {
  //       console.log("token expired");
  //       updateAuthData(isAuthenticated());
  //       getJob();
  //     } else {
  //       setJob(data);
  //       console.log(data);
  //       // console.log(job);
  //     }
  //   });
  // }, []);

  return (
    <ModalStyled
      {...props}
      size="sm"
      centered
      style={{ height: "700px" }}
      show={gContext.applicationModalVisible}
      onHide={gContext.toggleApplicationModal}
    >
      <Modal.Body className="p-0">
        <div className="container position-relative">
          <button
            type="button"
            className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
            onClick={handleClose}
          >
            <i className="fas fa-times"></i>
          </button>
          <div className="login-modal-main bg-white rounded-8 overflow-hidden">
            <div className="row no-gutters">
              {/* <!-- Left Sidebar Start --> */}
              <div className="col-12 col-xl-3 col-lg-4 col-md-5 mb-13 mb-lg-0 border-right border-mercury">
                {/* <ProfileSidebar /> */}
                {/* <!-- Sidebar Start --> */}
                <div>
                  <div className="pl-lg-5">
                    {/* <!-- Top Start --> */}
                    <div className="bg-white shadow-9 rounded-4">
                      <div className="px-5 py-11 text-center border-bottom border-mercury">
                        <Link href="/#">
                          <a className="mb-4">
                            {data?.photoURL ? (
                              <Avatar src={data.photoURL} />
                            ) : (
                              <Avatar src="" />
                            )}
                            {/* <img className="circle-54" src={imgP} alt="" /> */}
                          </a>
                        </Link>
                        <h4 className="mb-0">
                          <Link href="">
                            <a className="text-black-2 font-size-6 font-weight-semibold">
                              {data?.name}
                            </a>
                          </Link>
                        </h4>
                        <p className="mb-8">
                          <Link href="">
                            <a className="text-gray font-size-4">
                              {data?.profession}
                            </a>
                          </Link>
                        </p>
                        <div className="icon-link d-flex align-items-center justify-content-center flex-wrap">
                          <Link href="/#">
                            <a className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green">
                              <i className="fab fa-linkedin-in"></i>
                            </a>
                          </Link>
                          <Link href="/#">
                            <a className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green">
                              <i className="fab fa-facebook-f"></i>
                            </a>
                          </Link>
                          <Link href="/#">
                            <a className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green">
                              <i className="fab fa-twitter"></i>
                            </a>
                          </Link>
                          <Link href="/#">
                            <a className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green">
                              <i className="fab fa-dribbble"></i>
                            </a>
                          </Link>
                          <Link href="/#">
                            <a className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green">
                              <i className="fab fa-behance"></i>
                            </a>
                          </Link>
                        </div>
                      </div>
                      {/* <!-- Top End --> */}
                      {/* <!-- Bottom Start --> */}
                      <div className="px-9 pt-lg-5 pt-9 pt-xl-9 pb-5">
                        <h5 className="text-black-2 mb-8 font-size-5">
                          Contact Info
                        </h5>
                        {/* <!-- Single List --> */}
                        <div className="mb-7">
                          <p className="font-size-4 mb-0">Location</p>
                          <h5 className="font-size-4 font-weight-semibold mb-0 text-black-2 text-break">
                            {data?.location}
                          </h5>
                        </div>
                        {/* <!-- Single List --> */}
                        {/* <!-- Single List --> */}
                        <div className="mb-7">
                          <p className="font-size-4 mb-0">E-mail</p>
                          <h5 className="font-size-4 font-weight-semibold mb-0">
                            <a
                              className="text-black-2 text-break"
                              href="mailto:name_ac@gmail.com"
                            >
                              {data?.email}
                            </a>
                          </h5>
                        </div>
                        {/* <!-- Single List --> */}
                        {/* <!-- Single List --> */}
                        <div className="mb-7">
                          <p className="font-size-4 mb-0">Phone</p>
                          <h5 className="font-size-4 font-weight-semibold mb-0">
                            <a
                              className="text-black-2 text-break"
                              href="tel:+999565562"
                            >
                              {data?.phonenumber}
                            </a>
                          </h5>
                        </div>
                        {/* <!-- Single List --> */}
                        {/* <!-- Single List --> */}
                        <div className="mb-7">
                          <p className="font-size-4 mb-0">Website Linked</p>
                          <h5 className="font-size-4 font-weight-semibold mb-0">
                            <Link href="/#">
                              <a className="text-break">{data?.links}</a>
                            </Link>
                          </h5>
                        </div>
                        {/* <!-- Single List --> */}
                      </div>
                      {/* <!-- Bottom End --> */}
                    </div>
                  </div>
                </div>
                {/* <!-- Sidebar End --> */}
              </div>
              {/* <!-- Left Sidebar End --> */}
              {/* <!-- Middle Content --> */}
              <div className="col-12 col-xl-6 col-lg-8 col-md-7 order-2 order-lg-1 border-right border-mercury">
                <div className="bg-white rounded-4 overflow-auto h-1173">
                  <div className="pr-xl-0 pr-xxl-14 p-5 px-xs-12 pt-7 pb-5">
                    <h4 className="font-size-6 font-weight-semibold mb-7 mt-5 text-black-2">
                      About
                    </h4>
                    <p className="font-size-4 mb-8">{data?.about}</p>
                  </div>
                  <div className="border-top border-mercury pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
                    <h4 className="font-size-6 font-weight-semibold mb-7 mt-5 text-black-2">
                      Skills
                    </h4>
                    <ul className="list-unstyled d-flex align-items-center flex-wrap">
                      {/* {
                        arr.map((d)=>{
                          <li>
                        <Link href="/#">
                          <a className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">
                            {d}
                          </a>
                        </Link>
                      </li>
                        })
                      } */}
                      
                    </ul>
                  </div>
                  <div className="border-top border-mercury p-5 pl-xs-12 pt-7 pb-5">
                    <h4 className="font-size-6 font-weight-semibold mb-7 mt-5 text-black-2">
                      Click to download resume :
                    </h4>
                    {/* <div className="text-center"> */}

                    {data?.resume ? (
                      <button className="btn btn-primary">
                        <a
                          style={{ color: "white" }}
                          href={data?.resume}
                          target="blank"
                        >
                          Preview & Download Resume
                        </a>
                        <p>&nbsp; </p>
                        <i class="fa fa-download" aria-hidden="true"></i>
                      </button>
                    ) : (
                      <button className="btn btn-primary disabled">
                        <a style={{ color: "white" }}>No file uploaded</a>
                        <p>&nbsp; </p>
                        <i class="fa fa-download" aria-hidden="true"></i>
                      </button>
                    )}
                    {/* </div> */}
                  </div>
                </div>
              </div>
              {/* <!-- Middle Content --> */}
              {/* <!-- Right Sidebar Start --> */}
              <div className="col-12 col-xl-3 order-3 order-lg-2 bg-default-2">
                <div className="text-center mb-13 mb-lg-0 mt-12">
                  <button className="btn btn-primary btn-xl mb-7 d-block mx-auto text-uppercase">
                    Contact
                  </button>
                  <button className="btn btn-outline-gray btn-xl mb-7 d-block mx-auto text-uppercase">
                    Reject
                  </button>
                </div>
              </div>
              {/* <!-- Right Sidebar End --> */}
            </div>
          </div>
        </div>
      </Modal.Body>
    </ModalStyled>
  );
};

export default ModalApplicants;