import React, { useContext } from "react";
import styled from "styled-components";
import { Modal , Button } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
import { authenticate, SigninUser } from "../../helper";
import { marginBottom } from "styled-system";

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

function AlertModal() {
  const gContext = useContext(GlobalContext);
  if(gContext.alertinfo){

  return (
    <div hidden={!gContext.showalertBox}>
     <h1>{gContext.alertinfo}</h1>


      
     
    </div>
  );
          }else{
            return <></>
          }
}

export default AlertModal;