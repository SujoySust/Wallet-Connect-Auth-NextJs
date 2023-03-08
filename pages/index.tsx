import { NextPageWithLayout } from "../src/types";
import BasicLayout from "../layouts/basic.layout";
import HeroBannerSection from "../sections/Home/HeroBanner";
import useTranslation from "next-translate/useTranslation";

const Home: NextPageWithLayout = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <BasicLayout>
        <HeroBannerSection/>
      </BasicLayout>
    </>
  );
};

export async function getServerSideProps(context: any) {
  // const wallet_address = getCookie("wallet_address", { req, res }) ?? null;
  // console.log("wallet: ", wallet_address);
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Home;
//lang ok
