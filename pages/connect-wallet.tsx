import useTranslation from "next-translate/useTranslation";
import {
  SETTINGS_SLUG_APPLICATION_TITLE,
} from "src/helpers/slugcontanst";
import MetaHeadSection from "../components/Meta/MetaHeadSection";
import BasicLayout from "../layouts/basic.layout";
import AddWalletComponent from "../sections/AddWallet";
import BreadCrumbSection from "../sections/BreadCrumbSection";

const AddWallet = ({ data }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  return (
    <BasicLayout>
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
  const data = {};
  return {
    props: {
      data: data,
    }, // will be passed to the page component as props
  };
}

export default AddWallet;
//lang ok
