import React, { useContext, useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import Link from "next/link";
import PageWrapper from "../components/PageWrapper";
import router from "next/router";
import { getQuestions, printRes,postQuestion, alertSuccess, getQuestionCommentsData, alertWarning } from "../helper2";
import {isAuthenticated, postJob, updateAuthData} from "../helper";
import GlobalContext from "../context/GlobalContext";


const Faq = () => {
  const gContext = useContext(GlobalContext);
  const [openItem, setOpenItem] = useState(1);
  const [searchQues,setSearchQues] = useState("");
  const [questopost,setQuestopost] = useState("");
  const [questions,setQuestions] = useState();
  const [searchedQuesArr,setSearchedQuesArr] = useState([]);

  const WAIT_TIME = 5000;
  const filterQuestions = () =>{
    
    
    setSearchedQuesArr(questions?.filter(q=>{
      // printRes(q.question.includes(searchQues));
      q.question.includes(searchQues);
    }))
    setQuestions(searchedQuesArr);
  }
  const postQuery = () =>{
    const questData = {
      "user_type":isAuthenticated().type,
      "question":questopost
    }
    postQuestion(questData,isAuthenticated().access_token)
      .then(data=>{
        if(data.error==="token_expired"){
          updateAuthData(isAuthenticated())
          postQuery()
        }else{
        printRes(data);
        alertSuccess(data.message);
        setQuestopost("");
        window.location.reload();
        }
      })
  }

  const getAllQuestions = () =>{
    getQuestions(isAuthenticated().access_token,isAuthenticated().type)
      .then(data=>{
        // printRes("questions",data)
        if(data.error==="token_expired"){
          updateAuthData(isAuthenticated())
          getAllQuestions()
        }else{
          printRes(data)
          setQuestions(data.Questions);
        }
        
       
      })
      .catch(err=>{
        printRes(err)
      })
  }
  
  // printRes(searchQues);
  useEffect(()=>{
    // const id = setInterval(()=>{
    //   getAllQuestions()
    // },WAIT_TIME);
    // return () => clearInterval(id);
    getAllQuestions()
    // console.log("hey there")
  },[])
  return (
    <>
      <PageWrapper>
      
        <div className="jobDetails-section bg-default pt-md-30 pt-sm-25 pt-23 pb-md-27 pb-sm-20 pb-17">
          <div className="container">
            <div className="row">
              <div
                className="col-xl-6 col-md-7 pr-xl-15"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                <div className="d-flex flex-column">
                  <h5 className="font-weight-bold mb-7 mb-lg-13">
                    Frequently Asked Questions
                  </h5>
                  <p className="font-size-4 mb-2">
                    Not seeing your question here?
                  </p>
                  <textarea className="my-3" value={questopost} onChange={(e)=>{
                    setQuestopost(e.target.value);
                  }}>

                  </textarea>
                  <button className="border-0 bg-white" onClick={()=>{
                    postQuery();
                  }} >
                    <a className="font-size-3 font-weight-bold text-green text-uppercase">
                      Post A Question
                    </a>
                  </button>
                </div>
              </div>
              <div
                className="col-xl-6 col-md-11"
                data-aos="fade-left"
                data-aos-duration="1000"
              >
                <div className="faq-content pt-lg-4 pt-6">
                  <div
                    className="accordion rounded-10 border-green border-top-5 pl-1"
                    id="accordionExample"
                  >

                  <div className="border-bottom overflow-hidden">
                     <input type="text" placeholder="Search for your question" value={searchQues} onChange={(e)=>{
                       setSearchQues(e.target.value);
                     }} />
                     <button className="bg-primary p-1 text-white border-0" onClick={()=>{
                       printRes(searchQues);
                       filterQuestions();
                       

                     }}>
                       Search
                     </button>

                  </div>
                    <div className="border-bottom overflow-hidden">
                      {
                        questions?.map((ques)=>(
                          <div className="mb-0 border-bottom-0" id="heading2-1">
                       <button
                       className="btn-reset font-size-5 font-weight-semibold text-left px-0 pb-6 pt-7 accordion-trigger  w-100 border-left-0 border-right-0 focus-reset mt-n2"
                          type="button"
                        onClick={()=>{
                          console.log(ques.id);
                        //  getQuestionCommentsData(isAuthenticated().access_token,ques.id)
                        //   .then(data=>{
                        //     console.log(data);
                        //     gContext.setQuestioncomments(data.question)
                            
                        //  router.push(`/ques/${ques.id}`);

                        //   })
                         router.push(`/ques/${ques.id}`);

               
                       }}>
                       {ques.question}
                       </button>
                        
                        
                        
                      </div>
                        ))
                      }
                      
                    </div>

                    {/* <div className="border-bottom overflow-hidden">
                      <div className="mb-0 border-bottom-0" id="heading2-1">
                        <button
                          className="btn-reset font-size-5 font-weight-semibold text-left px-0 pb-6 pt-7 accordion-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2"
                          type="button"
                          onClick={() => setOpenItem(1)}
                          aria-expanded={openItem === 1}
                        >
                          How does the Jobium.com work?
                        </button>
                      </div>
                      <Collapse in={openItem === 1}>
                        <div className="pr-7">
                          <div className="mt-n3 font-size-4 text-gray font-weight-normal pb-7 pr-7 pt-6">
                            Yes. You can cancel your subscription anytime. Your
                            subscription will continue to be active until the
                            end of your current term (month or year) but it will
                            not auto-renew. Unless you delete your account
                            manually, your account and all data will be deleted
                            60 days from the day your subscription becomes
                            inactive.
                          </div>
                        </div>
                      </Collapse>
                    </div> */}
                    
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};
export default Faq;
