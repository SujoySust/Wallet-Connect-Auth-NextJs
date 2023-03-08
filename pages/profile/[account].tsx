import { NextPageWithLayout } from "../../src/types";
import { ProfileSection } from "../../sections/Profile";
import MetaHeadSection from "../../components/Meta/MetaHeadSection";
import { getAccount, getSettingsData } from "../../src/ssr/data";
import ErrorPageSection from "../../sections/404";
import BasicLayoutNoFooter from "layouts/basicNoFooter.layout";
import useTranslation from "next-translate/useTranslation";
import {
  SETTINGS_GROUP_GENERAL,
  SETTINGS_GROUP_LOGO,
  SETTINGS_GROUP_FOOTER,
  SETTINGS_SLUG_APPLICATION_TITLE,
} from "src/helpers/slugcontanst";

const Profile: NextPageWithLayout = ({ data, error, settings }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  const metadata = {
    page_title: data.username ? data.username : t("Not Found"),
    title: data?.name,
    description: data?.bio,
    image: data?.profile_img,
    url: "/profile/" + data?.username,
    site_name:
      (settings && settings[SETTINGS_SLUG_APPLICATION_TITLE]) ||
      process.env.NEXT_PUBLIC_APP_NAME,
  };

  return (
    <BasicLayoutNoFooter data={settings}>
      <MetaHeadSection metadata={metadata} />

      {error && <ErrorPageSection title={error} />}

      {data && <ProfileSection account={data} />}
    </BasicLayoutNoFooter>
  );
};

export async function getServerSideProps(context: any) {
  try {
    const account = context.params.account;
    const lang = context.locale || "en";
    const settings: any = await getSettingsData(
      [SETTINGS_GROUP_FOOTER, SETTINGS_GROUP_GENERAL, SETTINGS_GROUP_LOGO],
      {
        lang: lang,
      }
    );

    if (account !== "null") {
      const res = await getAccount(account);
      const profileData = res?.getAccount;

      return { props: { data: profileData, error: null, settings } };
    }
    return { props: {} };
  } catch (err: any) {
    return { props: { data: null, error: err.message } };
  }
}

export default Profile;
