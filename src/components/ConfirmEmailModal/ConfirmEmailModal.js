import React, { useContext } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
import { authenticate, SigninUser } from "../../helper";
import mail from "../../assets/email.gif";
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
          <Modal.Title>Email-Confirmation</Modal.Title>
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
              fontSize: "22px",
              fontWeight: "bold",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            A email has been sent to your email for verification, please verify
            and login again
          </p>
        </Modal.Body>
      </Modal>

     
    </div>
  
  );
}

export default ConfirmEmailModal;