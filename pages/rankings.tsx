import MetaHeadSection from "components/Meta/MetaHeadSection";
import BasicLayout from "layouts/basic.layout";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import RankingSection from "sections/Ranking";
import RankingList from "sections/Ranking/RankingList";
import {
  SETTINGS_GROUP_GENERAL,
  SETTINGS_GROUP_LOGO,
  SETTINGS_GROUP_FOOTER,
  SETTINGS_SLUG_APPLICATION_TITLE,
} from "src/helpers/slugcontanst";
import { getSettingsData } from "src/ssr/data";

const Rankings = ({ data }: any) => {
  const { t } = useTranslation("common");
  const { settings } = data;
  const metadata = {
    page_title: t("Rankings"),
    title: t("Rankings History"),
    description: t("Rankings History"),
    url: "/rankings",
    site_name:
      (settings && settings[SETTINGS_SLUG_APPLICATION_TITLE]) ||
      process.env.NEXT_PUBLIC_APP_NAME,
  };

  return (
    <BasicLayout data={settings}>
      <MetaHeadSection metadata={metadata} />
      <div className="container mt-50 mb-40">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="section-title text-center">
              <h2 className="title">{t("Ranking History")} </h2>
            </div>
          </div>
        </div>

        <RankingList />
      </div>
    </BasicLayout>
  );
};
export async function getServerSideProps(context: any) {
  const lang = context.locale || "en";
  const settings: any = await getSettingsData(
    [SETTINGS_GROUP_FOOTER, SETTINGS_GROUP_GENERAL, SETTINGS_GROUP_LOGO],
    {
      lang: lang,
    }
  );

  const data = {
    settings,
  };
  return {
    props: {
      data: data,
    }, // will be passed to the page component as props
  };
}
export default Rankings;
//lang ok
