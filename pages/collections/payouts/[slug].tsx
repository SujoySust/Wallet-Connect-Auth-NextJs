import useTranslation from "next-translate/useTranslation";
import {
  SETTINGS_GROUP_GENERAL,
  SETTINGS_GROUP_LOGO,
  SETTINGS_GROUP_FOOTER,
  SETTINGS_SLUG_APPLICATION_TITLE,
} from "src/helpers/slugcontanst";
import { getSettingsData } from "src/ssr/data";
import MetaHeadSection from "../../../components/Meta/MetaHeadSection";
import BasicLayout from "../../../layouts/basic.layout";
import BreadCrumbSection from "../../../sections/BreadCrumbSection";
import { CreatorEarningsSection } from "../../../sections/Collections/CreatorEarnings";

const Payouts = ({ slug, settings }: any) => {
  const { t } = useTranslation("common");
  const metadata = {
    page_title: t("Creator Earnings"),
    title: t("Creator Earnings"),
    description: t("Creator Earnings"),
    site_name:
      (settings && settings[SETTINGS_SLUG_APPLICATION_TITLE]) ||
      process.env.NEXT_PUBLIC_APP_NAME,
  };

  return (
    <BasicLayout data={settings}>
      <MetaHeadSection metadata={metadata} />
      <BreadCrumbSection
        page_title={t("Creator Earnings")}
        title={t("Creator Earnings")}
      />

      <CreatorEarningsSection slug={slug} profile={false} />
    </BasicLayout>
  );
};

export async function getServerSideProps(context: any) {
  const slug = context.params.slug;
  const lang = context.locale || "en";
  const settings: any = await getSettingsData(
    [SETTINGS_GROUP_FOOTER, SETTINGS_GROUP_GENERAL, SETTINGS_GROUP_LOGO],
    {
      lang: lang,
    }
  );

  return { props: { slug, settings } };
}

export default Payouts;
