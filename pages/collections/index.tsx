import useTranslation from "next-translate/useTranslation";
import {
  SETTINGS_GROUP_GENERAL,
  SETTINGS_GROUP_LOGO,
  SETTINGS_GROUP_FOOTER,
  SETTINGS_SLUG_APPLICATION_TITLE,
} from "src/helpers/slugcontanst";
import { getSettingsData } from "src/ssr/data";
import MetaHeadSection from "../../components/Meta/MetaHeadSection";
import BasicLayout from "../../layouts/basic.layout";
import BreadCrumbSection from "../../sections/BreadCrumbSection";
import { Intro } from "../../sections/Collections/CollectionHome/Intro";
import { MyCollections } from "../../sections/Collections/CollectionOwned";

const CollectionsPage = ({ data }: any) => {
  const { t } = useTranslation("common");
  const { settings } = data;
  const metadata = {
    page_title: t("My Collections"),
    title: t("My Collections"),
    description: t("My Collections"),
    site_name:
      (settings && settings[SETTINGS_SLUG_APPLICATION_TITLE]) ||
      process.env.NEXT_PUBLIC_APP_NAME,
  };

  return (
    <BasicLayout data={settings}>
      <MetaHeadSection metadata={metadata} />

      <BreadCrumbSection
        page_title={t("My Collections")}
        title={t("Collections")}
        // parent="Collections"
      />

      <section className="section">
        <div className="container">
          <Intro />

          <MyCollections />
        </div>
      </section>
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

export default CollectionsPage;
