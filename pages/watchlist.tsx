import { Loading } from "components/Loader/Loading";
import MetaHeadSection from "components/Meta/MetaHeadSection";
import BasicLayout from "layouts/basic.layout";
import useTranslation from "next-translate/useTranslation";
import { useSelector } from "react-redux";
import BreadCrumbSection from "sections/BreadCrumbSection";
import WatchListBoard from "sections/Watchlist/Watchlist-Board";
import {
  SETTINGS_GROUP_GENERAL,
  SETTINGS_GROUP_LOGO,
  SETTINGS_GROUP_FOOTER,
  SETTINGS_SLUG_APPLICATION_TITLE,
} from "src/helpers/slugcontanst";
import { getSettingsData } from "src/ssr/data";
import { RootState } from "src/store";

const WatchlistPage = ({ data }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  const { settings } = data;
  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );

  const metadata = {
    page_title: t("Watchlist"),
    title: t("Watch List"),
    description: t("Watch List"),
    site_name:
      (settings && settings[SETTINGS_SLUG_APPLICATION_TITLE]) ||
      process.env.NEXT_PUBLIC_APP_NAME,
    url: "/watchlist",
  };

  return (
    <BasicLayout data={settings}>
      <MetaHeadSection metadata={metadata} />

      <BreadCrumbSection page_title={t("Watchlist")} title={t("Watchlist")} />

      <section className="section">
        <div className="container">
          <div className="section-title text-center">
            <h2 className="title">{t("Watch list")}</h2>
          </div>
        </div>
        <div className="container">
          {!userData.wallet_address ? <Loading /> : <WatchListBoard />}
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

export default WatchlistPage;
