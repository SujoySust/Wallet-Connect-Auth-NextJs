import { ProfileSection } from "../../sections/Profile";
import MetaHeadSection from "../../components/Meta/MetaHeadSection";
import { useSelector } from "react-redux";
import { RootState } from "../../src/store";
import BasicLayoutNoFooter from "layouts/basicNoFooter.layout";
import {
  SETTINGS_GROUP_GENERAL,
  SETTINGS_GROUP_LOGO,
  SETTINGS_GROUP_FOOTER,
  SETTINGS_SLUG_APPLICATION_TITLE,
} from "src/helpers/slugcontanst";
import { getSettingsData } from "src/ssr/data";

const Profile = ({ data }: any) => {
  const { settings } = data;
  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );

  const metadata = {
    page_title: userData.username,
    title: userData.name,
    description: userData.bio,
    image: userData.profile_img,
    site_name:
      (settings && settings[SETTINGS_SLUG_APPLICATION_TITLE]) ||
      process.env.NEXT_PUBLIC_APP_NAME,
  };

  return (
    <BasicLayoutNoFooter data={settings}>
      <MetaHeadSection metadata={metadata} />

      {/* <BreadCrumbSection page_title="Profile" title="Profile" /> */}

      <ProfileSection account={userData} setting={settings}/>
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

export default Profile;
