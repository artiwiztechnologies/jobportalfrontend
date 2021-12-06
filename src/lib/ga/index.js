// log the pageview with their URL
let googleanalyticskey = "G-1Z5ZRYH8M8";

export const pageview = (url) => {
    window.gtag('config', googleanalyticskey, {
      page_path: url,
    })
  }
  
  // log specific events happening.
  // export const event = ({ action, params }) => {
  //   window.gtag('event', action, params)
  // }