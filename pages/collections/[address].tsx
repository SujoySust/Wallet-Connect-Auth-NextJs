import { getCookies } from "cookies-next";
import BasicLayoutNoFooter from "layouts/basicNoFooter.layout";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  SETTINGS_GROUP_GENERAL,
  SETTINGS_GROUP_LOGO,
  SETTINGS_GROUP_FOOTER,
  SETTINGS_SLUG_APPLICATION_TITLE,
} from "src/helpers/slugcontanst";
import MetaHeadSection from "../../components/Meta/MetaHeadSection";
import ErrorPageSection from "../../sections/404";
import { CollectionDash } from "../../sections/Collections/CollectionDash";
import { CollectionDetailsTop } from "../../sections/Collections/CollectionDetailsTop";
import { CollectionHeader } from "../../sections/Collections/CollectionHeader";
import { getCollectionDetails, getSettingsData } from "../../src/ssr/data";
import { RootState } from "../../src/store";
import { NextPageWithLayout } from "../../src/types";

const SingleCollection: NextPageWithLayout = ({
  singleCollection,
  settings,
  error,
}: any) => {
  const collection = singleCollection?.collection;
  const social_links = singleCollection?.social_links;

  const items = collection?.items;
  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );
  const myCollection = collection?.user?.id === userData.id;

  const metadata = {
    page_title: "" + collection?.name,
    title: collection?.name,
    site_name:
      (settings && settings[SETTINGS_SLUG_APPLICATION_TITLE]) ||
      process.env.NEXT_PUBLIC_APP_NAME,
    description: collection?.description,
    url: "collections/" + collection?.slug,
    image: collection?.image,
  };

  const [query, setQuery] = useState("");
  const queryInput = (e: any) => setQuery(e.target.value);

  const [categoryId, setCategoryId] = useState(0);
  const [sort, setSort] = useState<any>({
    field: "id",
    direction: "desc",
  });

  return (
    <BasicLayoutNoFooter data={settings}>
      <MetaHeadSection metadata={metadata} />

      {error ? (
        <div className="section">
          <div className="container">
            <ErrorPageSection title={error} />
          </div>
        </div>
      ) : (
        <>
          <CollectionDetailsTop
            collection={collection}
            myCollection={myCollection}
          />

          <div className="container">
            <CollectionHeader
              userData={userData}
              socialLinks={social_links}
              singleCollection={singleCollection}
            />
          </div>

          <CollectionDash
            collectionData={{
              items,
              collection,
            }}
            singleCollection={singleCollection}
            queryInput={queryInput}
          />
        </>
      )}
    </BasicLayoutNoFooter>
  );
};

export async function getServerSideProps(context: any) {
  try {
    const address = context.params.address;
    const user_wallet_address = getCookies(context).wallet_address;
    const lang = context.locale || "en";
    const settings: any = await getSettingsData(
      [SETTINGS_GROUP_FOOTER, SETTINGS_GROUP_GENERAL, SETTINGS_GROUP_LOGO],
      {
        lang: lang,
      }
    );

    if (address !== "null") {
      const singleCollection = await getCollectionDetails(
        address,
        user_wallet_address
      );
      return { props: { singleCollection, settings } };
    }
    return { props: { settings } };
  } catch (err: any) {
    return { props: { singleCollection: null, error: err.message } };
  }
}

export default SingleCollection;
