import { NextPageWithLayout } from "../src/types";
import BasicLayout from "../layouts/basic.layout";
import HeroBannerSection from "../sections/Home/HeroBanner";
import MetaHeadSection from "../components/Meta/MetaHeadSection";
import CategorySection from "../sections/Home/Category";
import HowToUseSection from "../sections/Home/HowTo/index";
import SellOffers from "../sections/Home/SellOffer";
import Introduction from "sections/Home/Introduction";
import { HomeAsset } from "sections/Home/Assets";
import Resources from "sections/Home/Resources";
import { getSettingsData } from "src/ssr/data";
import {
  SETTINGS_GROUP_FOOTER,
  SETTINGS_GROUP_GENERAL,
  SETTINGS_GROUP_HOMEPAGE,
  SETTINGS_GROUP_LOGO,
  SETTINGS_SLUG_APPLICATION_TITLE,
  SETTINGS_SLUG_BANNER_DESCRIPTION,
  SETTINGS_SLUG_BANNER_IMAGE,
  SETTINGS_SLUG_BANNER_TITLE,
} from "src/helpers/slugcontanst";
import TrendingCollectionSection from "sections/Home/TrendingCollection";
import useTranslation from "next-translate/useTranslation";

const Home: NextPageWithLayout = ({ data }: any) => {
  const { t } = useTranslation("common");
  const { settings } = data;

  const metadata = {
    page_title: t("Home"),
    title: (settings && settings[SETTINGS_SLUG_BANNER_TITLE]) || t("Welcome!"),
    description:
      (settings && settings[SETTINGS_SLUG_BANNER_DESCRIPTION]) ||
      t(
        "The NFT can be associated with particular digital files such as photos, videos, audio, or any physical asset. It will be the certification of ownership of the asset."
      ),
    url: "/",
    image:
      (settings && settings[SETTINGS_SLUG_BANNER_IMAGE]) ||
      process.env.NEXT_PUBLIC_BASE_URL + "/assets/images/hero-banner-bg.jpg",
    site_name:
      (settings && settings[SETTINGS_SLUG_APPLICATION_TITLE]) ||
      process.env.NEXT_PUBLIC_APP_NAME,
  };

  return (
    <>
      <BasicLayout data={settings}>
        <MetaHeadSection metadata={metadata} />

        {/* <MetaHeadIndividualSection metadata={metadata} /> */}

        <HeroBannerSection homePageSettings={settings} />

        {/* <TopCollectionSection homePageSettings={homePageSettings} /> */}
        {/* trending */}
        <TrendingCollectionSection homePageSettings={settings} />

        <HomeAsset homePageSettings={settings} />

        <CategorySection homePageSettings={settings} />

        <HowToUseSection homePageSettings={settings} />

        <Resources homePageSettings={settings} />

        <SellOffers home={true} homePageSettings={settings} />

        <Introduction homePageSettings={settings} />
      </BasicLayout>

      {/* 
      
      <LiveAuctionSection />
      <TopAuthorsSection /> */}
    </>
  );
};

export async function getServerSideProps(context: any) {
  // const wallet_address = getCookie("wallet_address", { req, res }) ?? null;
  // console.log("wallet: ", wallet_address);
  const { req, res } = context;
  const lang = context.locale || "en";
  const settings: any = await getSettingsData(
    [
      SETTINGS_GROUP_HOMEPAGE,
      SETTINGS_GROUP_FOOTER,
      SETTINGS_GROUP_GENERAL,
      SETTINGS_GROUP_LOGO,
    ],
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

export default Home;
//lang ok
