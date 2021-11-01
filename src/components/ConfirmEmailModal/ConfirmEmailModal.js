import React, { useContext } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
import { authenticate, SigninUser } from "../../helper";
import mail from "../../assets/email.gif";
import { textAlign } from "styled-system";
const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

function ConfirmEmailModal() {
  const gContext = useContext(GlobalContext);

  return (
    <div>
      <Modal
        size="sm-down"
        show={gContext.showConfirmEmail}
        onHide={gContext.toggleConfirmEmail}
        backdrop="static"
      >
        <Modal.Header>
          <button
            type="button"
            className="circle-32 btn-reset bg-white pos-abs-tr mt-n6 mr-lg-n6 focus-reset shadow-10"
            onClick={() => {
              gContext.toggleConfirmEmail();
              gContext.toggleSignInModal();
            }}
          >
            <i className="fas fa-times"></i>
          </button>
          <Modal.Title className="mx-auto text-center">Email-Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <img
              style={{ width: "200px", height: "200px" }}
              src={mail}
              alt="Computer man"
            />
          </div>
          <p
            style={{
              paddingTop: "-20px",
              fontSize: "16px",
              
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            Verification email has been sent.
Please verify and login.
          </p>
          {/* <span onClick={()=>{
            printRes(gContext.emailresendId);
          }}>Resend Email</span> */}
        </Modal.Body>
      </Modal>

     
    </div>
  
  );
}

export default ConfirmEmailModal;