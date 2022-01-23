import React, { useState, useEffect, useContext } from "react";
import { Nav, Tab } from "react-bootstrap";
import Link from "next/link";
// import PageWrapper from "../components/PageWrapper";
import { useRouter } from "next/router";
// import imgF1 from "../../../assets/image/l2/png/featured-job-logo-1.png";
// import {
//   isAuthenticated,
//   getUserWithId,
//   getCompanyWithId,
//   refreshToken,
// } from "../../../helper";
import { getBlogById, postCommentBlog } from "../../../helper2";
import SendIcon from "@material-ui/icons/Send";
import GlobalContext from "../../../context/GlobalContext";
import { isAuthenticated, updateAuthData } from "../../../helper/index";
import PageWrapper from "../../../components/PageWrapper";
import user from "../../../assets/user.jpg";
import { Avatar } from "@material-ui/core";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { add } from "lodash";

const CandidateProfile = ({ id }) => {
  const gContext = useContext(GlobalContext);
  // const [s, setS] = useState("");
  const router = useRouter();
  // let Id = router.query;
  // console.log(id);

  const [idData, setIDData] = useState([]);
  const [comments, setComments] = useState([]);
  const [blogId, setBlogId] = useState("");

  const getBlogUsingID = () => {
    // let b_id = localStorage.getItem("tempblog_id");
    setBlogId(router.query.id);
    getBlogById(
      isAuthenticated().access_token,
      localStorage.getItem("tempblog_id")
    ).then((data) => {
      if (data === "token_expired") {
        updateAuthData(isAuthenticated());
        getBlogUsingID();
      } else {
        setIDData(data.blog);
        setComments(data.comments);
        // console.log(blogId);
      }
    });
  };

  useEffect(() => {
    // console.log(localStorage.getItem("tempblog_id"));
    getBlogUsingID();
    // setBlogId(localStorage.getItem("tempblog_id"));
  }, [comments]);

  // console.log(blogId);

  const [addComment, setAddComment] = useState({
    user_type: isAuthenticated().type,
    comment: "",
    blog_id: id,
  });

  // function getlocalVal() {
  //   if (localStorage.getItem("tempblog_id")) {
  //     let temp_id = localStorage.getItem("tempblog_id");
  //     let temp = parseInt(temp_id);
  //     console.log(temp);
  //     setAddComment({
  //       ...addComment,
  //       blog_id: Number(temp_id),
  //     });
  //   }

  // user_type: isAuthenticated().type,

  const postCommentfun = () => {
    if (addComment.comment != "") {
      postCommentBlog(isAuthenticated().access_token, addComment).then(
        (data) => {
          if (data.message === "token_expired") {
            updateAuthData(isAuthenticated());
            postCommentfun();
          } else {
            console.log(data.message);
            setAddComment({
              user_type: isAuthenticated().type,
              comment: "",
              blog_id: id,
            });
          }
        }
      );
    } else {
      alert("Comment");
    }
  };

  // const handleComment = (e) => {
  //   setI(isAuthenticated().type);
  //   setT(e.target.value);
  //   let id = blogId;
  //   let dum = parseInt(id);
  //   setBI(dum);
  // };

  // let c_id=isAuthenticated().company_id;
  // let tkn = isAuthenticated().access_token;
  // let r_tkn = isAuthenticated().refresh_token;
  // let auth_data = isAuthenticated();

  // useEffect(()=>{
  //   if(isAuthenticated()){
  //     getCompanyWithId(c_id,tkn)
  //      .then(data=>{
  //        printRes(data);
  //        if(data.error==="token_expired"){
  //          refreshToken(r_tkn)
  //           .then(data=>{
  //             auth_data.access_token=data.access_token;
  //             if(typeof window !== "undefined"){

  //               localStorage.setItem("jwt",JSON.stringify(auth_data))
  //               getCompanyWithId(c_id,data.access_token)
  //                 .then(res=>{
  //                   printRes(res)
  //                 })

  //           }
  //           })
  //        }
  //      })
  //   }
  // },[])
  return (
    <>
      <PageWrapper headerConfig={{ button: "profile" }}>
        <div className="bg-default-2 pt-16 pt-lg-22 pb-lg-27">
          <div style={{ width: "100%" }} className="container">
            {/* <!-- back Button --> */}
            <div
              style={{ width: "100%" }}
              className="row justify-content-center"
            >
              <div className="col-12 mt-13 dark-mode-texts">
                <div className="mb-9">
                  <Link href="/dashboard-blog-2">
                    <a className="d-flex align-items-center ml-4">
                      <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                      <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                        Back
                      </span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            {/* <!-- back Button End --> */}
            {/* <div className="row "> */}
            {/* <!-- Company Profile --> */}
            {/* <div style={{ width: "100%" }} className="col-12 col-xl-9 col-lg-8"> */}
            <div
              style={{ width: "100%" }}
              className="row justify-content-center"
            >
              <div
                style={{ width: "100%" }}
                className="bg-white rounded-4 pt-11 shadow-9"
              >
                {/* <div className="d-xs-flex align-items-center pl-xs-12 mb-8 text-center text-xs-left">
                  <Link href="/#">
                    <div style={{ widht: "100%" }} className="">
                      <img className="square-72 rounded-6" src={imgF1} alt="" />
                    </div>
                  </Link>
                  <div className="">
                    <h2 className="mt-xs-n5">
                      <Link href="/#">
                        <a className="font-size-6 text-black-2 font-weight-semibold">
                          Airbnb INC.
                        </a>
                      </Link>
                    </h2>
                    <span className="mb-0 text-gray font-size-4">
                      Online Marketplace
                    </span>
                  </div>
                </div> */}

                <div style={{ padding: "22px" }}>
                  <div className="text-center">
                    {idData?.photoURL ? (
                      <img
                        width="400px"
                        height="300px"
                        src={idData?.photoURL}
                        alt=""
                      />
                    ) : (
                      <img width="400px" height="300px" src={user} alt="" />
                    )}
                  </div>
                  <div className="text-center">
                    <h2 className="mt-xs-n5">
                      <Link href="/#">
                        <a className="font-size-6 text-black-2 font-weight-semibold">
                          {idData?.title}
                        </a>
                      </Link>
                    </h2>
                    <span className="mb-4 text-gray font-size-4">
                      <b>Edited on :&nbsp;</b>
                      {idData?.date}
                    </span>
                  </div>
                  <p
                    style={{
                      textAlign: "justify",
                      marginLeft: "16px",
                      marginRight: "16px",
                    }}
                  >
                    <div
                      style={{ color: "black" }}
                      contentEditable="true"
                      dangerouslySetInnerHTML={{ __html: idData?.content }}
                    ></div>
                    {/* (idData?.content) */}
                  </p>
                </div>

                <h4 style={{ marginLeft: "26px" }} className="font-size-6 mb-1">
                  Comments
                </h4>
                {comments?.map((com) => (
                  <div
                    style={{
                      marginLeft: "26px",
                      marginRight: "26px",
                      marginBottom: "10px",
                    }}
                    className="pr-xl-0 pr-xxl-22 pt-5"
                  >
                    <div
                      style={{
                        borderRadius: "6px",
                        boxShadow: "1px -1px 6px 1px rgba(0,0,0,0.39)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          // border: "2px solid gray",
                          // borderRadius: "6px",
                          // boxShadow: "1px -1px 6px 1px rgba(0,0,0,0.39)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            marginTop: "18px",
                            marginLeft: "18px",
                          }}
                        >
                          {com?.user_photo ? (
                            <Avatar alt="User" src="" />
                          ) : (
                            <Avatar alt="User" src={com?.user_photo} />
                          )}
                          <span
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginLeft: "4px",
                            }}
                          >
                            <p
                              style={{
                                color: "black",
                                fontSize: "14px",
                                fontWeight: "bold",
                                marginTop: "5px",
                              }}
                            >
                              {com?.user_name}
                            </p>
                            <p
                              style={{
                                fontSize: "10px",
                                marginTop: "-18px",
                              }}
                            >
                              {com?.date}
                            </p>
                          </span>
                        </div>
                      </div>
                      <div>
                        <p
                          style={{
                            marginLeft: "20px",
                            marginTop: "11px",
                            paddingBottom: "18px",
                            color: "#262626",
                          }}
                        >
                          {com?.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <div
                  style={{
                    marginLeft: "26px",
                    marginRight: "26px",
                    marginBottom: "50px",
                  }}
                  className="pr-xl-0 pr-xxl-22 pt-5"
                >
                  <h4 className="font-size-6 mb-7">Add your comments</h4>
                  <div
                    style={{
                      display: "flex",
                      // border: "2px solid gray",
                      // borderRadius: "6px",
                    }}
                  >
                    <input
                      style={{ padding: "6px" }}
                      type="text"
                      value={addComment.comment}
                      className="border border-mercury text-gray w-100 pt-4 pl-6"
                      placeholder="Enter your valuable review."
                      onChange={(e) =>
                        setAddComment({
                          ...addComment,
                          comment: e.target.value,
                        })
                      }
                    />
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "#00b074",
                        borderTopRightRadius: "4px",
                        borderBottomRightRadius: "4px",
                      }}
                      onClick={postCommentfun}
                    >
                      <SendIcon style={{ color: "white" }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Company Profile End --> */}
            {/* <!-- Sidebar --> */}
            {/* <div className="col-12 col-xl-3 col-lg-4 col-md-5 col-sm-6">
                <div className="pt-11 pt-lg-0 pl-lg-5">
                  <h4 className="font-size-6 font-weight-semibold mb-0">
                    Similar Companies
                  </h4>
                  <ul className="list-unstyled">
                    <li className="border-bottom">
                      <Link href="/#">
                        <a className="media align-items-center py-9">
                          <div className="mr-7">
                            <img
                              className="square-72 rounded-5"
                              src={imgB1}
                              alt=""
                            />
                          </div>
                          <div className="mt-n4">
                            <h4 className="mb-0 font-size-6 font-weight-semibold">
                              Google INC.
                            </h4>
                            <p className="mb-0 font-size-4">
                              Online Marketplace
                            </p>
                          </div>
                        </a>
                      </Link>
                    </li>
                    <li className="border-bottom">
                      <Link href="/#">
                        <a className="media align-items-center py-9">
                          <div className="mr-7">
                            <img
                              className="square-72 rounded-5"
                              src={imgB2}
                              alt=""
                            />
                          </div>
                          <div className="mt-n4">
                            <h4 className="mb-0 font-size-6 font-weight-semibold">
                              Uber
                            </h4>
                            <p className="mb-0 font-size-4">
                              Ride Sharing Company
                            </p>
                          </div>
                        </a>
                      </Link>
                    </li>
                    <li className="border-bottom">
                      <Link href="/#">
                        <a className="media align-items-center py-9">
                          <div className="mr-7">
                            <img
                              className="square-72 rounded-5"
                              src={imgB3}
                              alt=""
                            />
                          </div>
                          <div className="mt-n4">
                            <h4 className="mb-0 font-size-6 font-weight-semibold">
                              Facebook
                            </h4>
                            <p className="mb-0 font-size-4">Social Network</p>
                          </div>
                        </a>
                      </Link>
                    </li>
                    <li className="border-bottom">
                      <Link href="/#">
                        <a className="media align-items-center py-9">
                          <div className="mr-5">
                            <img
                              className="square-72 rounded-5"
                              src={imgB4}
                              alt=""
                            />
                          </div>
                          <div className="mt-n4">
                            <h4 className="mb-0 font-size-6 font-weight-semibold">
                              GitHub
                            </h4>
                            <p className="mb-0 font-size-4">Online Software</p>
                          </div>
                        </a>
                      </Link>
                    </li>
                    <li className="">
                      <Link href="/#">
                        <a className="media align-items-center py-9">
                          <div className="mr-7">
                            <img
                              className="square-72 rounded-5"
                              src={imgB5}
                              alt=""
                            />
                          </div>
                          <div className="mt-n4">
                            <h4 className="mb-0 font-size-6 font-weight-semibold">
                              Uniliver
                            </h4>
                            <p className="mb-0 font-size-4">Manufacturer</p>
                          </div>
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </PageWrapper>
    </>
  );
};
// export default CandidateProfile;

CandidateProfile.getInitialProps = async ({ query }) => {
  const { id } = query;

  return { id };
};

export default CandidateProfile;