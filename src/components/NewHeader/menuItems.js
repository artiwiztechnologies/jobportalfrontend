import { isAuthenticated } from "../../helper";

export const menuItems = [

  {
    name:"",
    label:"Home"
  },
 
    {
      name: isAuthenticated().company_id ? ("dashboard-settings"):("dashboard-settings-user"),
      label: "Dashboard"
    },
    {
      name: isAuthenticated().user_id ? "search-grid" : "dashboard-applicants",
      label:isAuthenticated().user_id ? "Find Jobs" : "Applicants"
    },

  {
    name: "pricing",
    label: "pricing"
  },
  
  {
    name: "customer-support",
    label: "Support",
    // isExternal: true,
  },
];













// import { isAuthenticated } from "../../helper";

// export const menuItems = [
//     // {
//     //   name: "dashboard",
//     //   label: "Dashboard",
//     //   items: [
//     //     { name: "dashboard-main", label: "Dashboard Main" },
//     //     // { name: "dashboard-settings-user", label: "Dashboard Settings User" },
//     //     { name: "dashboard-settings", label: "Dashboard Settings" },
//     //     {
//     //       name: "dashboard-applicants",
//     //       label: "Dashboard Applicants",
//     //     },
//     //     { name: "dashboard-jobs", label: "Dashboard Posted Jobs" },
//     //   ],
//     // },
//     {
//       name: isAuthenticated().company_id ? ("dashboard-settings"):("dashboard-settings-user"),
//       label:"Dashboard"
//     },


//     {
//       name:  "",
//       label: isAuthenticated() && "Home",
//       // items: [
//       //   { name: "", label: "Home 1" },
//       // ],
//     },
//     // {
//     //   name:  "jobs",
//     //   label: isAuthenticated() ?(
//     //     isAuthenticated().company_id ? (
//     //       "Job Listing"
//     //     ):("Find Jobss")
//     //   ):(null),
    
//     // },
    
//     {
//       name: "job-pages" ,
//       label: "Jobs",
//       items:   [
//         { name: "search-grid", label: "Find Jobs" },
//         { name: "search-list", label: "Job Listing" },
//       ],
//     },
//     // {
//     //   name:  isAuthenticated() && "pages",
//     //   label: isAuthenticated() && "Pages",
//     //   items: [
//     //     {
//     //       name: "job-pages",
//     //       label: "Job Pages",
//     //       items: [
//     //         { name: "search-grid", label: "Job Grid" },
//     //         { name: "search-list", label: "Job List" },
//     //         { name: "job-details", label: "Job Details" },
//     //       ],
//     //     },
//     //     {
//     //       name: isAuthenticated() ? "dashboard" : null,
//     //       label: isAuthenticated() ? "Dashboard" : null,
//     //       items:  [
//     //         { name: "dashboard-main", label: "Dashboard Yo" },
//     //         // { name: "dashboard-settings-user", label: "Dashboard Settings User" },
//     //         { name: "dashboard-settings", label: "Dashboard Settings" },
//     //         {
//     //           name: "dashboard-applicants",
//     //           label: "Dashboard Applicants",
//     //         },
//     //         { name: "dashboard-jobs", label: "Dashboard Posted Jobs" },
//     //       ],
//     //     },
//     //     {
//     //       name: "candidate",
//     //       label: "Candidate Pages",
//     //       items: [
//     //         { name: "candidate-profile", label: "Candidate Profile 01" },
//     //         { name: "candidate-profile-2", label: "Candidate Profile 02" },
//     //       ],
//     //     },
//     //     {
//     //       name: "search",
//     //       label: "Search Pages",
//     //       items: [
//     //         { name: "search-grid", label: "Search Grid" },
//     //         { name: "search-list", label: "Search List 01" },
//     //         { name: "search-list-2", label: "Search List 02" },
//     //       ],
//     //     },
//     //     {
//     //       name: "company-profile",
//     //       label: "Company Profile",
//     //     },
  
//     //     {
//     //       name: "essential",
//     //       label: "Essential",
//     //       items: [
//     //         { name: "faq", label: "FAQ" },
//     //         { name: "404", label: "404" },
//     //         { name: "pricing", label: "Pricing" },
//     //         { name: "contact", label: "Contact" },
//     //       ],
//     //     },
//     //   ],
//     // },
//     {
//       name: isAuthenticated() && "https://uxtheme.net/product-support/",
//       label: isAuthenticated() && "Support",
//       isExternal: true,
//     },
//   ];