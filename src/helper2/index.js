import { useContext } from "react"

import GlobalContext from "../context/GlobalContext"

const gContext = useContext(GlobalContext);
export const alertInfo = (info) =>{

    gContext.toggleAlertBox();
    gContext.setAlertinfo(info);
   
    //create a model for alert box and pass alertinfo as props
}