
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

const CommentContainer = ({commentData}) =>{
  return(
    <div className="my-10 border-bottom ">
      <Avatar src={commentData.user_photo} />
      <p>{commentData.date}</p>
      <p>{commentData.user_name}</p>
      <p>{commentData.comment}</p>
    </div>
  )
}
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
             <h4 className="mt-20">
               {
                 questionsData?.question
               }
             </h4>
             <div className="">
               {
                 questionsData?.comments.map(cmt=>(
                   <div key={cmt.id}>
                     <CommentContainer commentData={cmt}   />
                   </div>
                 ))
               }
             </div>
             <div className="my-10">
               <input type="text" value={ansToPost} placeholder="Type your answer" onChange={(e)=>{
                  setAnsToPost(e.target.value);
               }} />
               <button onClick={()=>{
                 postAcomment()
               }}>
                 Post your answer
               </button>
             </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

// export async function getServerSideProps(context) {
//   // Fetch data from external API
//  const res = await fetch(`https://api.jobstextile.com/question/${context.params.id}`, {
//   method: "GET",
//   headers: {
//     Authorization: `Bearer ${isAuthenticated().access_token}`,
    
//   },
// })

// const question = res.json();
  

//   // Pass data to the page via props
//   return { props: { question } }
// }

// export const getStaticProps = async (context) => {
//   // const res = await fetch(`https://api.jobstextile.com/question/${context.params.id}`,{
//   //   headers:{
//   //     Authorization:`Bearer ${isAuthenticated().access_token}`
//   //   }
//   // });
//   // const question = await res.json();
//   const question = getQuestionCommentsData(isAuthenticated().access_token,parseInt(context.params.id))
//   return {
//       props:{
//           question
//       }
//   }
// }
ques.getInitialProps = async ({ query }) => {
  const {id} = query

  return {id}
}

export default ques;
