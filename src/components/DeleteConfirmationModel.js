import { useState } from "react";
import { Modal } from "react-bootstrap";
import { delAppliedJobs, isAuthenticated } from "../helper";
import { printRes } from "../helper2";


const DeleteConfirmationModel = ({delModal,setDelModal,jid}) =>{
    const [yes,setYes] = useState(false);
  
    const delAppliedJobWithId = () =>{
    printRes(jid);
    delAppliedJobs(jid, isAuthenticated().access_token).then((data) => {
        printRes(data);
        // change = change +1
        window.location.reload();
      });
    }
    
    return(
      <div>
        <Modal
          size="sm-down"
          show={delModal}
          onHide={()=>{
            setDelModal(false);
          }}
          backdrop="static"
        >
          <Modal.Header>
            <button
              type="button"
              className="circle-32 btn-reset bg-white pos-abs-tr mt-n6 mr-lg-n6 focus-reset shadow-10"
              onClick={() => {
                setDelModal(false)
                
                
              }}
            >
              <i className="fas fa-times"></i>
            </button>
            <Modal.Title className="mx-auto text-center">Are you sure you want to delete this Job</Modal.Title>
          </Modal.Header>
          <Modal.Body className="mx-auto text-center">
            <div className="btn btn-primary ml-3" style={{cursor:"pointer"}} onClick={()=>{
              printRes(jid);
              delAppliedJobWithId()
              setDelModal(false);
            }}>YES</div>
            <div className="btn btn-danger ml-3" style={{cursor:"pointer"}} onClick={()=>{
              printRes("cancelled!")
              setDelModal(false);
  
            }}>NO</div>
  
          </Modal.Body>
        </Modal>
  
       
      </div>
    )
  }


  export default DeleteConfirmationModel