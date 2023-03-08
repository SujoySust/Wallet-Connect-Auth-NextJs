import { getCookies } from "cookies-next";
import useTranslation from "next-translate/useTranslation";
import { useSelector } from "react-redux";
import { CollectionForm } from "sections/Collections/CollectionCreate/CollectionForm";
import { STATUS_ACTIVE } from "src/helpers/coreconstants";
import {
  SETTINGS_GROUP_GENERAL,
  SETTINGS_GROUP_LOGO,
  SETTINGS_GROUP_FOOTER,
  SETTINGS_SLUG_APPLICATION_TITLE,
} from "src/helpers/slugcontanst";
import { LoadingCircles } from "../../../components/Loader/LoadingCircles";
import MetaHeadSection from "../../../components/Meta/MetaHeadSection";
import { NoItems } from "../../../components/NoItems";
import BasicLayout from "../../../layouts/basic.layout";
import BreadCrumbSection from "../../../sections/BreadCrumbSection";
import {
  getBlockchainList,
  getCategoryList,
  getCollectionDetails,
  getSettingsData,
  getTokenOptionList,
} from "../../../src/ssr/data";
import { RootState } from "../../../src/store";

const EditCollection = (props: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );

  const { dataFromServer } = props;
  const data = {
    categories: dataFromServer.categories,
    blockchains: dataFromServer.blockchains,
    payment_tokens: dataFromServer.payment_tokens,
    collection: dataFromServer.collection,
  };
  const metadata = {
    page_title: t("Edit Collection"),
    name: t("Edit Collection"),
    description: t("Edit Collection"),
    site_name:
      (dataFromServer.settings &&
        dataFromServer.settings[SETTINGS_SLUG_APPLICATION_TITLE]) ||
      process.env.NEXT_PUBLIC_APP_NAME,
  };

  return (
    <BasicLayout data={dataFromServer.settings}>
      <MetaHeadSection metadata={metadata} />

      <BreadCrumbSection
        page_title={t("Update collection")}
        title={t("Edit Collection")}
        parent="Collections"
      />

      {userData.wallet_address ? (
        userData.id == data.collection.collection.user.id ? (
          <div className="create-collection-area section">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 offset-lg-3">
                  <div className="section-title text-center mb-45">
                    <h2 className="title mb-15">{t("Edit Collection")}</h2>
                    <p className="sub-title mb-0"></p>
                  </div>
                </div>
              </div>
              <CollectionForm collection={data.collection} data={data} />
            </div>
          </div>
        ) : (
          <NoItems
            title={`${t("Your account is not authorized to modify the")} ${
              data.collection.collection.name
            } ${t("collection.")}`}
          />
        )
      ) : (
        <div
          className="section"
          style={{ display: "grid", placeItems: "center" }}
        >
          <LoadingCircles />
        </div>
      )}
    </BasicLayout>
  );
};
export async function getServerSideProps(context: any) {
  try {
    const slug = context.params.slug;
    const user_wallet_address = getCookies(context).wallet_address;

    const lang = context.locale || "en";
    const settings: any = await getSettingsData(
      [SETTINGS_GROUP_FOOTER, SETTINGS_GROUP_GENERAL, SETTINGS_GROUP_LOGO],
      {
        lang: lang,
      }
    );

    const collection = await getCollectionDetails(slug, user_wallet_address);
    const categories = await getCategoryList(STATUS_ACTIVE);
    const blockchains = await getBlockchainList();
    const payment_tokens = await getTokenOptionList();
    const dataFromServer = {
      settings,
      slug,
      categories: categories,
      blockchains: blockchains,
      payment_tokens: payment_tokens,
      collection: collection,
    };
    // Rest of `getServerSideProps` code
    return {
      props: { dataFromServer },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: true,
        destination: "/404",
      },
      // props: {}
    };
  }
}

export default EditCollection;
