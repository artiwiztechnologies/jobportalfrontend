import React from "react";
import { useState } from "react";
import PageWrapper from "../components/PageWrapper";

const Aboutus = () => {
  const [query,setQuery] = useState("");
  return (
    <>
    <PageWrapper>
      <div className="bg-default-2 pt-16 pb-12 pt-lg-22 pb-lg-27">
        <div className="container p-5">
           <div className="mx-auto text-center my-9">
           <h3>
              About Us
            </h3>
            <p>updated on 03/11/2021</p>
           </div>
           <p>
                  Jobstextile.com is the most innovative and second largest online job portal in India. Founded in 2008, over the past decade, Jobstextile.com has become a prominent name in the recruitment industry. The popularity of the portal is evident from the fact that it has crossed the 3.4 crore candidate landmark and has more than 3 lakh latest job vacancies from leading companies on the site.

Jobstextile.com connects jobseekers and recruiters by accurately matching candidate profiles to the relevant job openings through an advanced 2-way matching technology. While most job portals only focus on getting candidates the next job, JobsTextile focuses on the entire career growth of candidates. To this end, JobsTextile has launched JobsTextile Learning- India’s largest career skills site for working professionals with over 500+ courses & certifications.

As the industry shifts towards mobile, Jobstextile.com is leading the transition and is the fastest growing job portal on mobile devices, witnessing a 100% YOY growth in mobile traffic and also offers on-the-go jobs through the JobsTextile Job Search App.

JobsTextile works closely to bridge the gap between talent & opportunities and offers end-to-end recruitment solutions. JobsTextile Job Fair brings candidates and top employers under one roof. While JobsTextile HR Conclave brings top HR leaders to share insights on latest trends, innovations & best practices in the HR industry. JobsTextile also has a large reach through its print product, JobsTextile Jobs – the Tuesday Job supplement of Hindustan Times– making it the only job portal with an integrated print and online offering
                  </p>
        </div>
      </div>
    </PageWrapper>
  </>
  );
};
export default Aboutus;
