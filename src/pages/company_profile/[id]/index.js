import React, { useState, useEffect } from "react";
import { Nav, Tab } from "react-bootstrap";
import Link from "next/link";
import PageWrapper from "../../../components/PageWrapper";
import {
  getCompanyWithId,
  isAuthenticated,
  updateAuthData,
} from "../../../helper/index";


const candidateProfile = ({id}) => {
  console.log(id);
  const [companyData, setCompanyData] = useState([]);

  const getCompanyInfo = () => {
    getCompanyWithId(id, isAuthenticated().access_token).then((data) => {
      console.log(data);
      if (data.error === "token_expired") {
        updateAuthData(isAuthenticated());
        getCompanyInfo();
      } else {
        setCompanyData(data);
        console.log(data);
      }
    });
  };

  console.log(companyData);

  useEffect(() => {
    getCompanyInfo();
  }, []);

  return (
    <>
      <PageWrapper headerConfig={{ button: "profile" }}>
        <div className="bg-default-2 pt-16 pt-lg-22 pb-lg-27">
          <div className="container">
            {/* <!-- back Button --> */}
            <div className="row justify-content-center">
              <div className="col-12 mt-13 dark-mode-texts">
                <div className="mb-9">
                  <Link href="/companyproducts">
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
            <div className="row ">
              <div className="col-12 col-xl-9 col-lg-8">
                <div className="bg-white rounded-4 pt-11 shadow-9">
                  <div className="d-xs-flex align-items-center pl-xs-12 mb-8 text-center text-xs-left">
                    <Link href="">
                      <a className="mr-xs-7 mb-5 mb-xs-0">
                        {companyData?.photoURL ? (
                          <img
                            className="square-72 rounded-6"
                            src={companyData?.photoURL}
                            alt=""
                          />
                        ) : (
                          <img
                            className="square-72 rounded-6"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmvlFoByJ5f0jgta19RXpGz2rVBOC-LhELnA&usqp=CAU"
                            alt=""
                          />
                        )}
                      </a>
                    </Link>
                    <div className="">
                      <h2 className="mt-xs-n5">
                        <Link href="">
                          <a className="font-size-6 text-black-2 font-weight-semibold">
                            {companyData?.name}
                          </a>
                        </Link>
                      </h2>
                      {/* <span className="mb-0 text-gray font-size-4">
                        Online Marketplace
                      </span> */}
                    </div>
                  </div>
                  <div className="pl-12 pt-10 pb-7 pr-12 pr-xxl-24">
                    <div className="row">
                      <div className="col-12 col-lg-4 col-md-4 col-xs-6">
                        <div className="mb-8">
                          <p className="font-size-4">Company size</p>
                          <h5 className="font-size-4 font-weight-semibold text-black-2">
                            {companyData?.companySize}
                          </h5>
                        </div>
                      </div>
                      <div className="col-12 col-lg-4 col-md-4 col-xs-6">
                        <div className="mb-8">
                          <p className="font-size-4">Type of corporation</p>
                          {companyData?.companyType ? (
                            <h5 className="font-size-4 font-weight-semibold text-black-2">
                              {companyData?.companyType}
                            </h5>
                          ) : (
                            <h5 className="font-size-4 font-weight-semibold text-black-2">
                              not available
                            </h5>
                          )}
                        </div>
                      </div>
                      <div className="col-12 col-lg-4 col-md-4 col-xs-6">
                        <div className="mb-8">
                          <p className="font-size-4">Location</p>
                          {companyData?.location ? (
                            <h5 className="font-size-4 font-weight-semibold text-black-2">
                              {companyData?.location}
                            </h5>
                          ) : (
                            <h5 className="font-size-4 font-weight-semibold text-black-2">
                              not available
                            </h5>
                          )}
                          {/* <h5 className="font-size-4 font-weight-semibold text-black-2">
                            {companyData?.location}
                          </h5> */}
                        </div>
                      </div>
                    </div>
                    <h4 className="font-size-6 mb-1 text-black-2 font-weight-semibold">
                      About {companyData?.name}
                    </h4>
                    {companyData?.about ? (
                      <div className="pt-5 ">
                        <p className="font-size-4 mb-8">{companyData?.about}</p>
                      </div>
                    ) : (
                      <div className="pt-5 ">
                        <p className="font-size-4 mb-8">not available</p>
                      </div>
                    )}

                    {companyData?.links ? (
                      <div>
                        <h4 className="font-size-6 mb-1 text-black-2 font-weight-semibold">
                          Links
                        </h4>
                        <div className="pt-5 ">
                          <p className="font-size-4 mb-8">
                            {companyData?.links}
                          </p>
                        </div>
                      </div>
                    ) : null}

                    <h4 className="font-size-6 mb-1 text-black-2 font-weight-semibold">
                      Contact
                    </h4>
                    <div className="pt-5 ">
                      {companyData?.phonenumber ? (
                        <p className="font-size-4 mb-2">
                          {companyData?.phonenumber}
                        </p>
                      ) : (
                        <p className="font-size-4 mb-2">not available</p>
                      )}
                      {companyData?.email ? (
                        <p className="font-size-4 mb-2">{companyData?.email}</p>
                      ) : (
                        <p className="font-size-4 mb-2">not available</p>
                      )}
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
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

candidateProfile.getInitialProps = async ({ query }) => {
  const {id} = query
  
  return {id}
}

export default candidateProfile;
