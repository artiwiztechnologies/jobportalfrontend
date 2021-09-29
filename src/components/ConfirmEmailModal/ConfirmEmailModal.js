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
<div>
      <Modal size="lg" show={gContext.showConfirmEmail} 
      onHide={gContext.toggleConfirmEmail} backdrop="static">
        <Modal.Header >
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
        <Modal.Body><p style={{paddingTop:"40px "}}>A email has been sent to your email for verification, please verify and login again</p></Modal.Body>
      </Modal>

      {/* <Modal>
      style={{height:"100px"}}
      size="lg"
      centered
      show={gContext.showConfirmEmail}
      onHide={gContext.toggleConfirmEmail}
    >
      <Modal.Body className="p-0">
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

        <p style={{paddingTop:"40px "}}>A email has been sent to your email for verification ,please verify and login again</p>
      </Modal.Body>
    </Modal> */}
    </div>
      //   <ModalStyled
         
      // size="lg"
      // centered
      // show={gContext.showConfirmEmail}
      // onHide={gContext.toggleConfirmEmail}
      //   >
      //        <Modal.Body className="p-0">
      //            <p>A email has been sent to your email for verification ,please verify and login again</p>
      //            <button onClick={()=>{
      //              gContext.toggleConfirmEmail();
      //              gContext.toggleSignInModal();
      //            }}>close</button>
      //        </Modal.Body>
      //   </ModalStyled>
    )
}

export default ConfirmEmailModal
// import React,{useContext} from 'react';
// import styled from "styled-components";
// import { Modal } from "react-bootstrap";
// import GlobalContext from "../../context/GlobalContext";
// import { authenticate, SigninUser } from "../../helper";

// const ModalStyled = styled(Modal)`
//   /* &.modal {
//     z-index: 10050;
//   } */
// `;



// function ConfirmEmailModal() {
//   const gContext = useContext(GlobalContext);
    
//     return (
//         <ModalStyled
         
//       size="lg"
//       centered
//       show={gContext.showConfirmEmail}
//       onHide={gContext.toggleConfirmEmail}
//         >
//              <Modal.Body className="p-0">
//                  <p>A email has been sent to your email for verification ,please verify and login again</p>
//                  <button onClick={()=>{
//                    gContext.toggleConfirmEmail();
//                    gContext.toggleSignInModal();
//                  }}>close</button>
//              </Modal.Body>
//         </ModalStyled>
//     )
// }

// export default ConfirmEmailModal
