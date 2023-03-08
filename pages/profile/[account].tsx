import { NextPageWithLayout } from "../../src/types";
import { ProfileSection } from "../../sections/Profile";
import { getAccount } from "../../src/ssr/data";
import ErrorPageSection from "../../sections/404";
import BasicLayoutNoFooter from "layouts/basicNoFooter.layout";
import useTranslation from "next-translate/useTranslation";

const Profile: NextPageWithLayout = ({ data, error }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  return (
    <BasicLayoutNoFooter>
      {error && <ErrorPageSection title={error} />}
      {data && <ProfileSection account={data} />}
    </BasicLayoutNoFooter>
  );
};

export async function getServerSideProps(context: any) {
  try {
    const account = context.params.account;
    const lang = context.locale || "en";

    if (account !== "null") {
      const res = await getAccount(account);
      const profileData = res?.getAccount;

      return { props: { data: profileData, error: null} };
    }
    return { props: {} };
  } catch (err: any) {
    return { props: { data: null, error: err.message } };
  }
}

export default Profile;
