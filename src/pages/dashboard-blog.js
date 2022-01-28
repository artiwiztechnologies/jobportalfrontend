import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Avatar } from "@material-ui/core";
import PageWrapper from "../components/PageWrapper";
import { Select } from "../components/Core";
import { isAuthenticated, updateAuthData } from "../helper/index";
import Notiflix from "notiflix";
import Link from "next/link";
import { alertWarning, checkSubscription, getBlogList } from "../helper2";
import imgB1 from "../assets/image/l2/png/blog-img1.png";
import imgB2 from "../assets/image/l2/png/blog-img2.png";
import imgB3 from "../assets/image/l2/png/blog-img3.png";
import user from "../assets/user.jpg";
import imgBU1 from "../assets/image/l2/png/blog-user-img1.png";
import imgBU2 from "../assets/image/l2/png/blog-user-img2.png";
import imgBU3 from "../assets/image/l2/png/blog-user-img3.png";
import GlobalContext from "../context/GlobalContext";
import SingleBlog from "../pages/company-profile/[id]";
import { useContext } from "react";

const DashboarBlogSecond = () => {
  const router = useRouter();
  const gContext = useContext(GlobalContext);
  const [blogData, setBlogData] = useState([]);

  const getBlogListDatafun = () => {
    getBlogList(isAuthenticated().access_token).then((data) => {
      if (data.error && data.error === "token_expired") {
        updateAuthData(isAuthenticated());
        getBlogListDatafun();
      } else {
        setBlogData(data.blogs);
      }
    });
  };

  useEffect(() => {
    if(isAuthenticated().company_id){
      getBlogListDatafun();
      
    }else{
      checkSubscription(isAuthenticated().access_token)
      .then(data=>{
        console.log("subsdata",data)
        if(data.active==true){
          getBlogListDatafun();
        }
        else{
          router.push("/pricing");
          alertWarning("Please subscribe to a plan!");
        }
      })
    }
    // if(isAuthenticated()){
    //       getBlogListDatafun();

    // }
  }, [blogData]);

  console.log(blogData);

  const truncate = (str) => {
    return str.length > 15 ? str.substring(0, 15) + "..." : str;
  };

  console.log(blogData);

  return (
    <>
      <PageWrapper
        headerConfig={{
          button: "profile",
          isFluid: true,
          bgClass: "bg-default",
          reveal: false,
        }}
      >
        <div
          className="dashboard-main-container mt-24 mt-lg-31"
          id="dashboard-body"
        >
          <div className="container">
            <div className="row justify-content-center">
              <div
                className="col-xl-7 col-lg-8 col-md-10"
                data-aos="fade-in"
                data-aos-duration="1000"
              >
                {/* <!-- section-title start --> */}
                <div className="section-title text-center pb-lg-15 pb-8 px-xxl-10">
                  <h3 className="mb-9">Research and Development</h3>
                  {/* <p className="text-default-color font-size-5">
                    Collaboratively administrate empowered markets via
                    plug-and-play networks. Dynamically procrastinate{" "}
                  </p> */}
                </div>
                {/* <!-- section-title end --> */}
              </div>
            </div>
            <div className="row justify-content-center">
              {blogData?.map((blog) => (
                <div
                  className="col-xl-4 col-md-6 mb-xl-0 mb-13"
                  data-aos="fade-right"
                  data-aos-duration="500"
                >
                  {/* <Link
                    href={{
                      pathname: "/company-profile",
                      query: { id: blog?.id },
                    }}
                  > */}
                  <div
                    onClick={() => {
                      // gContext.setBlog_Id(blog?.id);
                      localStorage.setItem("tempblog_id", blog?.id);
                      router.push(`/blog_details/${blog?.id}`);
                    }}
                    style={{ cursor: "pointer" }}
                    className="bg-white px-8 pt-9 pb-7 rounded-4 mb-9 feature-cardOne-adjustments"
                  >
                    {/* <img src={imgB1} className="card-img-top" alt="..." /> */}
                    {blog?.photoURL ? (
                      <img
                        width="333px"
                        height="242px"
                        src={blog?.photoURL}
                        className="card-img-top"
                        alt="..."
                      />
                    ) : (
                      <img
                        width="333px"
                        height="242px"
                        src={user}
                        className="card-img-top"
                        alt="..."
                      />
                    )}

                    <div className="card-body pt-11 px-0 pb-0">
                      <Link href="">
                        <a className="text-uppercase font-size-3 font-weight-bold px-4 py-1">
                          {blog?.date}
                        </a>
                      </Link>
                      <h4>
                        <Link href="">
                          <a className="card-title font-size-7 mt-8 mb-6 heading-default-color">
                            {truncate(blog?.title)}
                          </a>
                        </Link>
                      </h4>
                      
                      <div className="media mb-5 pr-9">
                        <Link href="">
                          <a>
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9pwsN7oN02FOgJSVg2fe-R1dMMFRZi9J7Lw&usqp=CAU"
                              className="align-self-center circle-54 mr-3 mt-2"
                              alt=""
                            />
                          </a>
                        </Link>
                        {/* <!-- media img start --> */}
                        {/* <!-- media body start --> */}
                        <div className="media-body pl-4 pt-2">
                          <h6 className="mb-0">
                            <Link href="/#">
                              <a className="mb-0 font-size-4 font-weight-semibold heading-default-color line-height-reset">
                                Admin
                              </a>
                            </Link>
                          </h6>
                          <p className="mb-0">
                            <Link href="">
                              <a className="font-size-3 text-default-color">
                                Jobs Textile
                              </a>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* </Link> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};
export default DashboarBlogSecond;