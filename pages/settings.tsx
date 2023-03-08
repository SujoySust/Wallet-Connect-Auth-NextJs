import MetaHeadSection from "../components/Meta/MetaHeadSection";
import BasicLayout from "../layouts/basic.layout";
import BreadCrumbSection from "../sections/BreadCrumbSection";
import { SettingsContent } from "../sections/Settings";
//import { getMe } from "../src/ssr/data";
import { useSelector } from "react-redux";
import { Loading } from "../components/Loader/Loading";
import { RootState } from "../src/store";
import useTranslation from "next-translate/useTranslation";
import {
  SETTINGS_GROUP_GENERAL,
  SETTINGS_GROUP_LOGO,
  SETTINGS_GROUP_FOOTER,
  SETTINGS_SLUG_APPLICATION_TITLE,
} from "src/helpers/slugcontanst";
import { getSettingsData } from "src/ssr/data";

const SettingsPage = ({ data }: any) => {
  const { settings } = data;
  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );
  const { t } = useTranslation("common");
  const metadata = {
    page_title: t("Settings"),
    title: t("Profile Settings"),
    description: t("Profile Settings"),
    site_name:
      (settings && settings[SETTINGS_SLUG_APPLICATION_TITLE]) ||
      process.env.NEXT_PUBLIC_APP_NAME,
    url: "/settings",
  };

  return (
    <BasicLayout data={settings}>
      <MetaHeadSection metadata={metadata} />

      <BreadCrumbSection page_title={t("Settings")} title={t("Settings")} />

      {!userData.wallet_address ? (
        <div className="w-100 vh-100 d-flex flex-column justify-content-center align-items-center">
          <Loading />
        </div>
      ) : (
        <SettingsContent userData={userData} />
      )}
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

export default SettingsPage;
//lang ok
