import BasicLayout from "../layouts/basic.layout";
import BreadCrumbSection from "../sections/BreadCrumbSection";
import { SettingsContent } from "../sections/Settings";
//import { getMe } from "../src/ssr/data";
import { useSelector } from "react-redux";
import { Loading } from "../components/Loader/Loading";
import { RootState } from "../src/store";
import useTranslation from "next-translate/useTranslation";

const SettingsPage = ({ data }: any) => {
  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );
  const { t } = useTranslation("common");

  return (
    <BasicLayout>
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
  const data = {};
  return {
    props: {
      data: data,
    }, // will be passed to the page component as props
  };
}

export default SettingsPage;
//lang ok
