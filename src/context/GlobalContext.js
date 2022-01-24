import React, { useState } from "react";

const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {
  const [themeDark, setThemeDark] = useState(false);
  const [showSidebarDashboard, setShowSidebarDashboard] = useState(true);
  const [applicationModalVisible, setApplicationModalVisible] = useState(false);
  const [signInModalVisible, setSignInModalVisible] = useState(false);
  const [signUpModalVisible, setSignUpModalVisible] = useState(false);
  const [signupCompanyModal,setSignupCompanyModal] = useState(false);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [visibleOffCanvas, setVisibleOffCanvas] = useState(false);
  const [showConfirmEmail,setShowConfirmEmail] = useState(false);
  const [signinComp,setSigninComp] = useState(false);
  const [showPostjobModal,setShowPostjobModal] = useState(false);
  const [showJobDetails,setShowJobDetails] = useState(false);
  const [showEditJobModal,setShowEditJobModal] = useState(false);
  const [editjid,setEditjid] = useState(1);
  const [alertinfo,setAlertinfo] = useState("hey");
  const [showalertBox,setShowalertBox] = useState(false);
  const [editJobData,setEditJobData] = useState();
  const [savedJobs,setSavedJobs] = useState();
  const [applicantsdata, setApplicantsdata] = useState([]);
  const [filterJobType1, setFilterJobType1] = useState("");
  const [filterJobType2, setFilterJobType2] = useState("");
  const [filterJobType3, setFilterJobType3] = useState("");
  const [emailresendId,setEmailresendId] = useState(0);
  const [questioncomments,setQuestioncomments] = useState();
  const [showPostProductModel,setShowPostProductModel] = useState(false);
  const [isPut,setIsPut] = useState(false);
  const [productIdtoUpdate,setProductIdtoUpdate] = useState();

  const [header, setHeader] = useState({
    theme: "light",
    bgClass: "default",
    variant: "primary",
    align: "left",
    isFluid: false,
    button: "cta", // profile, account, null
    buttonText: "Get started free", // profile, account, null
    reveal: true,
  });

  const [footer, setFooter] = useState({
    theme: "dark",
    style: "style1", //style1, style2
  });

  const [pdata, setPdata] = useState({
    name: "",
    description: "",
    photo: null,
    units:0,
    price:""
  
  });

  const togglePostProductModel = () =>{
    setShowPostProductModel(!showPostProductModel);
  }
   
  const changeEditJid = (jid) =>{
    setEditjid(jid);
  }

  const toggleApplicantsdata = (details) => {
    setApplicantsdata(details);
  };

  const toggleTheme = () => {
    setThemeDark(!themeDark);
  };

  const toggleShowJobDetails = () => {
    setShowJobDetails(!showJobDetails)
  }
 
  const toggleSigninCompany = () =>{
    setSigninComp(!signinComp);
  }

  const togglePostjobModal = () =>{
    setShowPostjobModal(!showPostjobModal);
  }
  const toggleShowEditJobModal = () =>{
    setShowEditJobModal(!showEditJobModal)
  }
  const toggleConfirmEmail = () =>{
    setShowConfirmEmail(!showConfirmEmail);
  }

  const toggleSidebarDashboard = () => {
    setShowSidebarDashboard(!showSidebarDashboard);
  };

  const toggleVideoModal = () => {
    setVideoModalVisible(!videoModalVisible);
  };

  const toggleApplicationModal = () => {
    setApplicationModalVisible(!applicationModalVisible);
  };

  const toggleSignInModal = () => {
    setSignInModalVisible(!signInModalVisible);
  };

  const toggleSignUpModal = () => {
    setSignUpModalVisible(!signUpModalVisible);
  };
  const toggleSignupCompanyModal = () => {
    setSignupCompanyModal(!signupCompanyModal);
  }

  const toggleOffCanvas = () => {
    setVisibleOffCanvas(!visibleOffCanvas);
  };

  const closeOffCanvas = () => {
    setVisibleOffCanvas(false);
  };

  const toggleAlertBox = () =>{
    setShowalertBox(!showalertBox);
  }

  const toggleFilterJobType1 = (j_type) => {
    setFilterJobType1(j_type);
  };

  const toggleFilterJobType2 = (j_type) => {
    setFilterJobType2(j_type);
  };

  const toggleFilterJobType3 = (j_type) => {
    setFilterJobType3(j_type);
  };

  

  return (
    <GlobalContext.Provider
      value={{
        themeDark,
        toggleTheme,
        showSidebarDashboard,
        toggleSidebarDashboard,
        videoModalVisible,
        toggleVideoModal,
        applicationModalVisible,
        toggleApplicationModal,
        signInModalVisible,
        toggleSignInModal,
        signUpModalVisible,
        toggleSignUpModal,
        visibleOffCanvas,
        toggleOffCanvas,
        closeOffCanvas,
        header,
        setHeader,
        footer,
        setFooter,
        signupCompanyModal,
        toggleSignupCompanyModal,
        showConfirmEmail,
        toggleConfirmEmail,
        signinComp,
        toggleSigninCompany,
        showPostjobModal,
        togglePostjobModal,
        showJobDetails,
        toggleShowJobDetails,
        showEditJobModal,
        toggleShowEditJobModal,
        editjid,
        changeEditJid,
        alertinfo,
        setAlertinfo,
        showalertBox,
        toggleAlertBox,
        editJobData,
        setEditJobData,
        savedJobs,
        setSavedJobs,
        filterJobType1,
        toggleFilterJobType1,
        filterJobType2,
        toggleFilterJobType2,
        filterJobType3,
        toggleFilterJobType3,
        emailresendId,
        setEmailresendId,
        applicantsdata,
        toggleApplicantsdata,
        questioncomments,
        setQuestioncomments,
        showPostProductModel,
        togglePostProductModel,
        isPut,
        setIsPut,
        productIdtoUpdate,
        setProductIdtoUpdate,
        pdata,
        setPdata

      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
export { GlobalProvider };
