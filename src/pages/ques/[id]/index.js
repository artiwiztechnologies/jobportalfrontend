
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import PageWrapper from "../../../components/PageWrapper";
import imgLogo from "../../../assets/image/logo-main-black.png";
import imgError from "../../../assets/image/svg/404.svg";
import {useRouter} from "next/router";
import {alertInfo, alertSuccess, getQuestionCommentsData, postComment, printRes} from "../../../helper2/index";
import { isAuthenticated, updateAuthData } from "../../../helper";
import GlobalContext from "../../../context/GlobalContext";
import { Avatar } from "@material-ui/core";
import { bottom, zIndex } from "styled-system";

const CommentContainer = ({ commentData }) => {
  return (
    <div className="my-10 border-bottom w-75">
      <div className="d-flex flex">
        <Avatar src={commentData.user_photo} />
        <div className="d-flex flex-column" style={{ marginLeft: "4px" }}>
          <p className="" style={{ fontSize: "18px", fontWeight: "bold" }}>
            {commentData.user_name}
          </p>
          <p style={{ fontSize: "10.5px", marginTop: "-18px" }}>
            {commentData.date}
          </p>
        </div>
      </div>

      <p style={{ fontSize: "17px" }}>{commentData.comment}</p>
    </div>
  );
};
const ques = ({id}) => {
  //   const router = useRouter();
  // const {id} = router.query;
  
  
  const [questionsData,setQuestionData] = useState();
  // console.log(id)

  const postAcomment = () =>{
    console.log(ansToPost)
    let cmt_data = {
      "user_type":isAuthenticated().type,
      "comment":ansToPost,
      "question_id":id
    }
    postComment(isAuthenticated().access_token,cmt_data)
      .then(data=>{
        console.log(data);
        if(data.message==="Answer posted!"){
          alertSuccess(data.message);
          window.location.reload();
        }
      })

  }
 
  
  // printRes(id);
  const [ansToPost,setAnsToPost] = useState("");
  
  useEffect(()=>{
    getQuestionCommentsData(isAuthenticated().access_token,id)
    .then(data=>{
      if(data.error==="token_expired"){
        updateAuthData(isAuthenticated())
        getQuestionCommentsData(isAuthenticated().access_token,id)
         .then(d1=>{
           console.log(d1);
           setQuestionData(d1.question);
         })
  
      }else{
      console.log(data);
      setQuestionData(data.question);
      }
  
    })
  },[])


  return (
    <>
      <PageWrapper>
        
        <div className="404-page bg-default min-h-100vh flex-all-center pt-lg-15 pt-xxl-17 pt-27 pb-lg-0 pb-18">
          <div className="container">
             
             <h4 className="mt-20 d-flex">
             <h4 className="text-success">Question: &nbsp;</h4>
                {
                  `${questionsData?.question}`
                }
               
             </h4>
             {
               questionsData?.comments.length != 0 ? (
                <div className="">
               {
                 questionsData?.comments.map(cmt=>(
                   <div key={cmt.id}>
                     <CommentContainer commentData={cmt}   />
                   </div>
                 ))
               }
             </div>
               ):(
                 <p>No comments on this question yet!</p>
               )
             }
             
             {/* <div className="my-10">
               <input type="text" value={ansToPost} placeholder="Type your answer" onChange={(e)=>{
                  setAnsToPost(e.target.value);
               }} />
               <button onClick={()=>{
                 postAcomment()
               }}>
                 Post your answer
               </button>
             </div> */}
             <div className="my-10">
             
              <div
                style={{
                  display: "flex",
                  
                  padding: "5px",
                  justifyContent:"space-between",
                  width: "75%",
                  border: "1px solid lightgray",
                  borderRadius:"50px"
                  
                  
                }}
              >
               
               <input type="text" value={ansToPost} 
                  id="standard-basic"
                  placeholder="Post your answer here..."
                  // className="border-none w-75"
                  style={{
                    borderRadius: "50px",
                    border: "none",
                   
                    outline: "none",
                    
                    marginLeft:"15px",
                    marginRight:"15px"
                  }}
                  onChange={(e)=>{
                  setAnsToPost(e.target.value);
               }} />
              
                <button
                  style={{
                    border: "none",
                    // borderRadius: "186px",
                    borderRadius:"50px",
                    

                    height: "48px",
                    width: "48px",
                    backgroundColor: "#28bd8a",
                    // marginTop: "14px",
                  }}
                  onClick={() => {
                    postAcomment();
                  }}
                >
                  <i
                    class="fa fa-paper-plane"
                    aria-hidden="true"
                    fontSize="27px"
                  ></i>
                </button>
              </div>
              </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};


ques.getInitialProps = async ({ query }) => {
  const {id} = query

  return {id}
}

export default ques;
