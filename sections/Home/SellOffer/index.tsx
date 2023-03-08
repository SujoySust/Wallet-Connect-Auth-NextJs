import { ItemRow } from "components/ItemRow";
import { ItemLoaderButton } from "components/Loader/ItemLoaderButton";
import { LoadingCircles } from "components/Loader/LoadingCircles";
import { NoItems } from "components/NoItems";
import BasicLayout from "layouts/basic.layout";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useInfiniteGetActiveSellOfferListsQuery } from "src/graphql/generated";
import {
  SETTINGS_SLUG_SELL_OFFER_DESCRIPTION,
  SETTINGS_SLUG_SELL_OFFER_TITLE,
} from "src/helpers/slugcontanst";
import style from "./selloffer.module.css";

const SellOffers = ({ home, homePageSettings }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const metadata = {
    page_title: t("Sale Offers"),
    name: t("Name"),
    description: t("Name"),
  };

  const {
    data,
    isLoading,
    error,
    isSuccess,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteGetActiveSellOfferListsQuery(
    {
      first: 5,
      after: undefined,
    },
    {
      getNextPageParam: (p) => {
        if (p.getActiveSellOfferLists.pageInfo.hasNextPage) {
          return {
            first: 5,
            after: p.getActiveSellOfferLists.pageInfo.endCursor,
          };
        } else {
          return undefined;
        }
      },
    }
  );

  const totalItems = data?.pages[0].getActiveSellOfferLists?.totalCount;

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="row mt-5">
            <div className="col-lg-6 offset-lg-3">
              <div className="section-title text-center mb-20">
                <h2 className="title mb-2">
                  {(homePageSettings &&
                    homePageSettings[SETTINGS_SLUG_SELL_OFFER_TITLE]) ||
                    t("Current Sale Offers")}
                </h2>
                <p>
                  {(homePageSettings &&
                    homePageSettings[SETTINGS_SLUG_SELL_OFFER_DESCRIPTION]) ||
                    ""}
                </p>
              </div>
            </div>
          </div>
          {isLoading && (
            <NoItems
              title={
                <>
                  <LoadingCircles />
                </>
              }
            />
          )}

          {error && <NoItems title={error} />}

          {isSuccess &&
            totalItems === 0 &&
            (home ? (
              <div className="text-center">{t("No items to display")}</div>
            ) : (
              <NoItems title={t("No items to display")} />
            ))}

          {isSuccess && totalItems !== 0 && (
            <>
              <div className="table-responsive">
                <table
                  className={`table table-borderless ${style.tableSection}`}
                >
                  <thead style={{ borderBottom: "1px solid var(--border-4)" }}>
                    <tr>
                      <th className="py-5">{t("Item")}</th>
                      <th className="py-5">{t("Price")}</th>
                      <th className="py-5">{t("Owner")}</th>
                      <th className="py-5">{t("Created At")}</th>
                      <th className="py-5">{t("Expires At")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data?.pages?.map((page) => {
                      return page.getActiveSellOfferLists.edges?.map((item) => (
                        <ItemRow key={item.node.id} data={item.node} />
                      ));
                    })}
                  </tbody>
                </table>
              </div>

              {/* <ItemLoaderButton
                controls={{ fetchNextPage, hasNextPage, isFetchingNextPage }}
              /> */}
            </>
          )}
          {home && isSuccess && totalItems !== 0 && (
            <div className="col-lg-12 text-center mt-5">
              <Link href="/sell-offers">
                <a className="primary-btn mt-5">{t("Show more")}</a>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

SellOffers.getLayout = BasicLayout;

export default SellOffers;
//lang ok
