import * as React from "react";
import Document, {Html, Head, Main, NextScript, NextDocumentContext} from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: NextDocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return(
        <Html>
          <Head>
            <style>{`body {margin: 0; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; font-family: Noto Sans KR,Helvetica,Arial,sans-serif;;}`}</style>
            <meta charSet="utf-8"></meta>
            <meta name="author" content="JustKode"></meta>
            <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossOrigin="anonymous"></link>
            <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR" rel="stylesheet"></link>
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
    )
  }
}
