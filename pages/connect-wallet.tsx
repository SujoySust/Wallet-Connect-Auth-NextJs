import useTranslation from "next-translate/useTranslation";
import {
  SETTINGS_GROUP_GENERAL,
  SETTINGS_GROUP_LOGO,
  SETTINGS_GROUP_FOOTER,
  SETTINGS_SLUG_APPLICATION_TITLE,
} from "src/helpers/slugcontanst";
import { getSettingsData } from "src/ssr/data";
import MetaHeadSection from "../components/Meta/MetaHeadSection";
import BasicLayout from "../layouts/basic.layout";
import AddWalletComponent from "../sections/AddWallet";
import BreadCrumbSection from "../sections/BreadCrumbSection";

const AddWallet = ({ data }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  const { settings } = data;
  const metadata = {
    page_title: t("Connect Wallet"),
    title: t("Connect Wallet"),
    description: t("Connect wallet"),
    site_name:
      (settings && settings[SETTINGS_SLUG_APPLICATION_TITLE]) ||
      process.env.NEXT_PUBLIC_APP_NAME,
  };

  return (
    <BasicLayout data={settings}>
      <MetaHeadSection metadata={metadata} />
      <BreadCrumbSection
        page_title={t("Connect Wallet")}
        title={t("Connect Wallet")}
      />

      <AddWalletComponent />
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

export default AddWallet;
//lang ok
