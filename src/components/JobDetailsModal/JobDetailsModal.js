

import React,{useContext} from 'react';
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";


const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;



function JobDetailsModal() {
  const gContext = useContext(GlobalContext);
    
    return (
<div>
      <Modal size="lg" show={gContext.showJobDetails} 
      onHide={gContext.toggleShowJobDetails()} backdrop="static">
        <Modal.Header >
        <button
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-n6 mr-lg-n6 focus-reset shadow-10"
          onClick={() => {
            gContext.toggleShowJobDetails();
          }}
        >
          <i className="fas fa-times"></i>
        </button>
          <Modal.Title>Job-Details</Modal.Title>
        </Modal.Header>
        <Modal.Body><p style={{paddingTop:"40px "}}>nothing for now</p></Modal.Body>
      </Modal>

      
    </div>
    )
        }

export default JobDetailsModal