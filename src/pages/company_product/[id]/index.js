import { useRouter } from "next/router";
import React, { useEffect } from "react";
import PageWrapper from "../../../components/PageWrapper";
import {getCompanyProducts} from "../../../helper3";
import {isAuthenticated, updateAuthData} from "../../../helper";
import { useState } from "react";


const CompanyProductsPrivate = () => {
    const router = useRouter()
  const { id } = router.query
  console.log(id);

  const [products,setProducts] = useState();
  const getCompProducts = () =>{
    getCompanyProducts(isAuthenticated().company_id,isAuthenticated().access_token)
        .then(data=>{
          if(data.error==="token_expired"){
            updateAuthData(isAuthenticated())
            getCompProducts();
          }else{
          console.log(data)
          setProducts(data.products);
          }
        })
  }

  const divStyle = {
    cursor:"pointer",
    width: "350px",
    // transform:"scale(1.5)"
} 

  useEffect(()=>{
    getCompProducts()

  },[])
  


  const appendTo = () =>{
    var giventring = "<div id='foo'><a href='#'>Link</a><span></span></div>";
// var doc = new DOMParser().parseFromString(xmlString, "text/xml");
    // var doc = new DOMParser().parseFromString(giventring,"text/html")
    // const d = document.getElementsByClassName("myname");
    // document.body.appendChild(doc);
    var newDiv = document.createElement('p');
    var d = document.getElementById("myname");
    

    newDiv.innerHTML = "hey";
    d.appendChild(newDiv)

    // document.body.appendChild(d)
  }

  let hey = `<p><strong>AVV </strong>nicww</p><p>Niceeeee eeeeeeeee piiiiiiiiii</p>
<p><img src="data:image/png;base64,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" width="296" height="170"/></p>
  <p>😂&nbsp;</p>
  <p><em>hehehe</em></p>
  <p><u><em>pochu</em></u></p>
  <p><br></p>`;

  return (
    <>
        <PageWrapper>
      <div className="bg-default-2 pt-16 pb-12 pt-lg-22 pb-lg-27">
        <div className="d-sm-flex flex-row align-items-center justify-content-center flex-wrap my-5" id="myname">

        
        <div dangerouslySetInnerHTML={{ __html: `${hey}` }} />
 

          

        </div>
      </div>
    </PageWrapper>
  </>
  );
};
export default CompanyProductsPrivate;
