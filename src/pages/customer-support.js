import React, { useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import {  isAuthenticated } from "../helper";
import { support } from "../helper2";


const CustomerSupport = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  // console.log(`${title},${desc}`);

  const submitIssue = () => {
    if (title.length != 0 && desc.length != 0) {
      let issueData = {
        title: title,
        description: desc,
        user_type: isAuthenticated().type,
      };

      // console.log(`${title},${desc}`);

      support(issueData, isAuthenticated().access_token).then((data) => {
        if (data.message == "Issue could not be raised.") {
          // console.log(data.message);
          alert(data.message);
        } else {
          console.log(data.message);
          alert("Issue raised successfully");
          setTitle("");
          setDesc("");
        }
      });
    } else {
      alert("Please enter both the fields!");
    }
  };
  return (
    <>
      <PageWrapper>
        <div className="bg-default-2 pt-16 pb-12 pt-lg-22 pb-lg-27">
          <div className="container">
            <div className="row justify-content-center mt-14">
              <div className="col-xxl-6 col-xl-7 col-lg-8">
                <h2 className="font-size-9 text-center mb-11">
                  Raise an issue
                </h2>
                <div className="bg-white px-9 pt-9 pb-7 shadow-8 rounded-4">
                  <form
                    name="contact"
                    method="post"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                  >
                    {/* You still need to add the hidden input with the form name to your JSX form */}
                    <input type="hidden" name="form-name" value="contact" />
                    <div className="row">
                      <div className="col-12 mb-7">
                        <label
                          htmlFor="name"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Issue
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Issue title"
                          id="name"
                          value={title}
                          name="name"
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                      </div>
                      {/* <div className="col-lg-6 mb-7">
                        <label
                          htmlFor="email"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          E-mail
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="example@gmail.com"
                          id="email"
                          name="email"
                          required
                        />
                      </div>
                      <div className="col-lg-6 mb-7">
                        <label
                          htmlFor="subject"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Subject
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Special contract"
                          id="subject"
                          name="subject"
                          required
                        />
                      </div> */}
                      <div className="col-lg-12 mb-7">
                        <label
                          htmlFor="message"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Description
                        </label>
                        <textarea
                          id="message"
                          placeholder="Explain your issue"
                          className="form-control h-px-144"
                          name="message"
                          value={desc}
                          onChange={(e) => setDesc(e.target.value)}
                          required
                        ></textarea>
                      </div>
                      <div className="col-lg-12 pt-4">
                        <button
                          type="submit"
                          onClick={(e) => {
                            e.preventDefault();
                            submitIssue();
                          }}
                          className="btn btn-primary text-uppercase w-100 h-px-48"
                        >
                          Book your issue
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* <div style={{ marginTop: "16px" }} className="">
                    <p
                      style={{
                        color: "black",
                        fontSize: "16px",
                      }}
                    >
                      <a style={{ color: "black" }} href="#">
                        Privacy Policy
                      </a>
                    </p>
                    <p style={{ fontSize: "16px" }}>
                      <a href="#">Terms & Conditions</a>
                    </p>
                    <p style={{ fontSize: "16px" }}>
                      <a href="#">Return Policy</a>
                    </p>
                  </div> */}

                  <div
                    style={{ marginTop: "26px", color: "black" }}
                    className="text-center"
                  >
                    <span>
                      <a style={{ color: "black" }} href="/privacy-policy">
                        Privacy Policy
                      </a>
                    </span>
                    &nbsp;&bull;&nbsp;
                    <span>
                      <a style={{ color: "black" }} href="/terms-and-conditions">
                        Terms & Conditions
                      </a>
                    </span>
                    &nbsp;&bull;&nbsp;
                    <span>
                      <a style={{ color: "black" }} href="#">
                        Return Policy
                      </a>
                    </span>
                  </div>

                  {/* <div className="mt-8">
                    <h3 className="font-size-4">Contact Information</h3>
                    <div className="media mb-2">
                      <div className="mr-6">
                        <i className="fas fa-map-marker-alt mt-2"></i>
                      </div>
                      <p className="font-size-4 mb-0">
                        Grayic <br />
                        Jens Baggesen, 8200 Aarhus
                      </p>
                    </div>
                    <div className="media mb-2">
                      <div className="mr-6">
                        <i className="fas fa-phone-alt mt-2"></i>
                      </div>
                      <p className="font-size-4 mb-0">+999 546 646</p>
                    </div>
                    <div className="media mb-2">
                      <div className="mr-6">
                        <i className="fas fa-envelope mt-2"></i>
                      </div>
                      <p className="font-size-4 mb-0">support@uxtheme.net</p>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};
export default CustomerSupport;