import { ReactElement, useEffect } from "react";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";

// @ts-ignore
const AuthLayout = (page: ReactElement) => {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{t("Open NFT")}</title>
        <meta
          name="description"
          content="Open NFT Responsive  HTML5 Template "
        />
        <meta
          name="keywords"
          content="business,corporate, creative, woocommerach, design, gallery, minimal, modern, landing page, cv, designer, freelancer, html, one page, personal, portfolio, programmer, responsive, vcard, one page"
        />
        <meta name="author" content="Open NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {page}
    </>
  );
};

export default AuthLayout;
