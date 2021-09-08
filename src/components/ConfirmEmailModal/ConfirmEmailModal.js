import React,{useContext} from 'react';
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
import { authenticate, SigninUser } from "../../helper";

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;



function ConfirmEmailModal() {
  const gContext = useContext(GlobalContext);
    
    return (
        <ModalStyled
         
      size="lg"
      centered
      show={gContext.showConfirmEmail}
      onHide={gContext.toggleConfirmEmail}
        >
             <Modal.Body className="p-0">
                 <p>A email has been sent to your email for verification ,please verify and login again</p>
                 <button onClick={()=>{
                   gContext.toggleConfirmEmail();
                   gContext.toggleSignInModal();
                 }}>close</button>
             </Modal.Body>
        </ModalStyled>
    )
}

export default ConfirmEmailModal
