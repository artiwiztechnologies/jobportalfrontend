import React, { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import {
  alertInfo,
  alertWarning,
  printRes,
  resetPasswordCompany,
  resetPasswordUser,
} from "../helper2/index";
const ForgotPass = () => {
  const [phonenumber, setPhonenumber] = useState();
  const [password, setPassword] = useState();
  const [showPass, setShowPass] = useState(true);
  const [oldpassword, setOldpassword] = useState();
  const [newpassword, setNewpassword] = useState();
  const [otp, setOtp] = useState();

  const resetPass = () => {
    let reset_data = {
      phonenumber: phonenumber,
      password: password,

      otp: otp,
    };
    printRes(reset_data);
    resetPasswordCompany(reset_data)
      .then((data) => {
        printRes(data);
        alertInfo(data.message);
        
        
      })
      .catch((err) => {
        alertWarning(err);
      });
  };

  return (
    <>
      <PageWrapper>
        <div className="d-flex justify-content-center">
          <div
            style={{
              marginTop: "66px",
              backgroundColor: "white",
              width: "500px",
              paddingLeft: "40px",
              paddingRight: "40px",
            }}
            className="bg-default-2 pt-16 pb-12 pt-lg-22 pb-lg-27"
          >
            <form action="/">
              <div className="form-group">
                <label
                  htmlFor="phone"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Phonenumber
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter mobile number"
                  id="phonenumber"
                  value={phonenumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="password"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  New Password
                </label>

                <div className="position-relative">
                  <input
                    type={showPass ? "password" : "text"}
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label
                  htmlFor="password"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  New Password Again
                </label>

                <div className="position-relative">
                  <input
                    type={showPass ? "password" : "text"}
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    value={newpassword}
                    onChange={(e) => setNewpassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label
                  htmlFor="otp"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  OTP
                </label>

                <div className="position-relative">
                  <input
                    type={showPass ? "password" : "text"}
                    className="form-control"
                    id="password"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group d-flex flex-wrap justify-content-between"></div>
              <div className="form-group mb-8">
                <button
                  className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase"
                  onClick={(e) => {
                    e.preventDefault();
                    printRes("reset password");
                    resetPass();
                  }}
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};
export default ForgotPass;