import { CategoryTab } from "components/Collections/Marketplace/CategoryTab";
import { TopCollectionTab } from "components/Collections/Marketplace/TopCollectionTab";
import { TrendingCollectionTab } from "components/Collections/Marketplace/TrendingCollectionTab";
import { LoadingCircles } from "components/Loader/LoadingCircles";
import { MarketplaceTabs } from "components/Tabs/MarketplaceTab";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGetCategoriesForMarketPlaceQuery } from "src/graphql/generated";
import {
  SETTINGS_GROUP_GENERAL,
  SETTINGS_GROUP_LOGO,
  SETTINGS_GROUP_FOOTER,
  SETTINGS_SLUG_APPLICATION_TITLE,
} from "src/helpers/slugcontanst";
import { getSettingsData } from "src/ssr/data";
import MetaHeadSection from "../components/Meta/MetaHeadSection";
import BasicLayout from "../layouts/basic.layout";

const MarketPlace = ({ data }: any) => {
  const { settings } = data;
  const { t } = useTranslation("common");
  const metadata = {
    page_title: t("Marketplace"),
    title: t("Explore Marketplace"),
    description: t("Explore Marketplace"),
    site_name:
      (settings && settings[SETTINGS_SLUG_APPLICATION_TITLE]) ||
      process.env.NEXT_PUBLIC_APP_NAME,
    url: "/marketplace",
  };
  const router = useRouter();
  const [tab, setTab]: any = useState("null");

  useEffect(() => {
    router.query.tab ? setTab(router.query.tab) : setTab("null");
  }, [router]);

  // get categories
  const { data: categoryQuery, isLoading: isLoadingCategory } =
    useGetCategoriesForMarketPlaceQuery(
      {},
      {
        refetchOnWindowFocus: false,
      }
    );
  const categories = categoryQuery?.getCategories.map((el) => {
    return { ...el, tab: el.title.toLowerCase() };
  });
  const categoryId = categories?.filter((el) => el.tab === tab)[0];

  // get data of collections in paginate

  return (
    <BasicLayout data={settings}>
      <MetaHeadSection metadata={metadata} />

      {/* <BreadCrumbSection page_title="Marketplace" title="Marketplace" /> */}

      <div className="section">
        <div className="container">
          <div className="section-title text-center mb-60">
            <h2 className="title mb-15">{t("Explore Marketplace")}</h2>
          </div>

          {/* tabs */}
          {isLoadingCategory ? (
            <div className="text-center">
              <LoadingCircles />
            </div>
          ) : (
            <MarketplaceTabs items={categories} selected="null" />
          )}
          {tab === "top" && <TopCollectionTab />}
          {tab === "trending" && <TrendingCollectionTab />}
          {!["top", "trending"].includes(tab) && (
            <CategoryTab categoryId={categoryId ? categoryId.id : null} />
          )}
        </div>
      </div>
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

export default MarketPlace;
//lang ok
