import useTranslation from "next-translate/useTranslation";
import { STATUS_ACTIVE } from "src/helpers/coreconstants";
import {
  SETTINGS_GROUP_GENERAL,
  SETTINGS_GROUP_LOGO,
  SETTINGS_GROUP_FOOTER,
  SETTINGS_SLUG_APPLICATION_TITLE,
} from "src/helpers/slugcontanst";
import MetaHeadSection from "../../components/Meta/MetaHeadSection";
import { NoItems } from "../../components/NoItems";
import BasicLayout from "../../layouts/basic.layout";
import ErrorPageSection from "../../sections/404";
import BreadCrumbSection from "../../sections/BreadCrumbSection";
import { CollectionForm } from "../../sections/Collections/CollectionCreate/CollectionForm";
import {
  getBlockchainList,
  getCategoryList,
  getSettingsData,
  getTokenOptionList,
} from "../../src/ssr/data";

const Create = ({ dataFromServer, error }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  const { settings } = dataFromServer;
  const metadata = {
    page_title: t("Create Collection"),
    title: t("Create colletion"),
    description: t("Create collection"),
    site_name:
      (settings && settings[SETTINGS_SLUG_APPLICATION_TITLE]) ||
      process.env.NEXT_PUBLIC_APP_NAME,
  };

  // const data = {
  //   categories: dataFromServer.categories,
  //   blockchains: dataFromServer.blockchains,
  //   payment_tokens: dataFromServer.payment_tokens,
  // };

  // console.log(dataFromServer.blockchains.length);

  return (
    <BasicLayout data={settings}>
      <MetaHeadSection metadata={metadata} />

      <BreadCrumbSection
        page_title={t("Create new collection")}
        title={t("Create Collection")}
        parent={t("Collections")}
      />

      <div className="create-collection-area section">
        <div className="container">
          {error ? (
            <ErrorPageSection title={error} />
          ) : dataFromServer.blockchains.length === 0 ? (
            <NoItems
              title={
                <span className="text-center">
                  {t(
                    "No valid Blockchain is found to create a new collection."
                  )}{" "}
                  <br />
                  <br />
                  {t("Contact to Support")}
                </span>
              }
            />
          ) : (
            <>
              <div className="row">
                <div className="col-lg-6 offset-lg-3">
                  <div className="section-title text-center mb-45">
                    <h2 className="title mb-15">{t("Create Collection")}</h2>
                    <p className="sub-title mb-0"></p>
                  </div>
                </div>
              </div>

              <CollectionForm
                collection={null}
                data={{
                  categories: dataFromServer.categories,
                  blockchains: dataFromServer.blockchains,
                  payment_tokens: dataFromServer.payment_tokens,
                }}
              />
            </>
          )}
        </div>
      </div>
    </BasicLayout>
  );
};

export async function getServerSideProps(context: any) {
  try {
    const lang = context.locale || "en";
    const settings: any = await getSettingsData(
      [SETTINGS_GROUP_FOOTER, SETTINGS_GROUP_GENERAL, SETTINGS_GROUP_LOGO],
      {
        lang: lang,
      }
    );
    const dataFromServer = {
      settings: settings,
      categories: await getCategoryList(STATUS_ACTIVE),
      blockchains: await getBlockchainList(),
      payment_tokens: await getTokenOptionList(),
    };

    return { props: { dataFromServer } };
  } catch (err: any) {
    return { props: { dataFromServer: null, error: err.message } };
  }
}

export default Create;
