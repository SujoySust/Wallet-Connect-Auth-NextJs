import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { SETTINGS_GROUP_GENERAL, SETTINGS_GROUP_LOGO, SETTINGS_GROUP_FOOTER } from "src/helpers/slugcontanst";
import BasicLayout from "../layouts/basic.layout";
import ErrorPageSection from "../sections/404";
import BreadCrumbSection from "../sections/BreadCrumbSection";

const ErrorPage = () => {  
  const { t } = useTranslation("common");
  return (
    <BasicLayout>
      <BreadCrumbSection page_title={t("404")} title={t("404")} />

      <ErrorPageSection />
    </BasicLayout>
  );
};

export default ErrorPage;
//lang ok
