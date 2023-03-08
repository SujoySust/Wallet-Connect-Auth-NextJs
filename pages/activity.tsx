import MetaHeadSection from "components/Meta/MetaHeadSection";
import BasicLayoutNoFooter from "layouts/basicNoFooter.layout";
import useTranslation from "next-translate/useTranslation";
import { ActivityDashboard } from "sections/Collections/ActivityDashboard";
import {
  SETTINGS_GROUP_GENERAL,
  SETTINGS_GROUP_LOGO,
  SETTINGS_GROUP_FOOTER,
  SETTINGS_SLUG_APPLICATION_TITLE,
} from "src/helpers/slugcontanst";
import { getSettingsData } from "src/ssr/data";

const Activity = ({ data }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  const { settings } = data;
  const metadata = {
    page_title: t("Activity"),
    title: t("Activities"),
    description: t("Activities"),
    url: "/activity",
    site_name:
      (settings && settings[SETTINGS_SLUG_APPLICATION_TITLE]) ||
      process.env.NEXT_PUBLIC_APP_NAME,
  };

  return (
    <BasicLayoutNoFooter data={settings}>
      <MetaHeadSection metadata={metadata} />

      <div className="container  mt-25">
        <div className="col-lg-6 offset-lg-3">
          <div className="section-title text-center">
            <h2 className="title">{t("activities")}</h2>
          </div>
        </div>
      </div>
      <ActivityDashboard
        Chart={false}
        profile={true}
        showSelected={true}
        customSidebarHeight={280}
        setting={settings}
      />
    </BasicLayoutNoFooter>
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

export default Activity;
//lang ok
