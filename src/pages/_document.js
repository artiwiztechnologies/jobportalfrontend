// import Document from "next/document";
import { ServerStyleSheet } from "styled-components";
import Document, { Html, Head, Main, NextScript } from 'next/document'
export default class MyDocument extends Document {
  
  render() {
    let googleanalyticskey = "G-1Z5ZRYH8M8";
    return (
      <Html>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${googleanalyticskey}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleanalyticskey}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
