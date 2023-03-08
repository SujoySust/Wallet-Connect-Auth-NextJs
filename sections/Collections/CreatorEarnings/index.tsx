import { Loading } from "../../../components/Loader/Loading";
import { NoItems } from "../../../components/NoItems";
import { items } from "../../../data/earningsHistory";
import classes from "./CreatorEarnings.module.css";
import useTranslation from "next-translate/useTranslation";
import { useInfiniteGetCreatorEarningListPaginateQuery } from "src/graphql/generated";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { ItemLoaderButton } from "components/Loader/ItemLoaderButton";
import { LoadingCircles } from "components/Loader/LoadingCircles";
import moment from "moment";
import { RcTooltip } from "components/Tooltip/rcTooltip";
import { collapseAddress, noExponents } from "src/helpers/functions";
import Link from "next/link";
export const CreatorEarningsSection = ({ slug, profile }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  const userData: any = useSelector(
    (state: RootState) => state.userData.userData
  );
  const router = useRouter();
  const { collectionid } = router.query;
  const loading = false;

  const {
    data,
    isLoading,
    error,
    isSuccess,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteGetCreatorEarningListPaginateQuery(
    {
      first: 5,
      after: undefined,
      //@ts-ignore
      collection_id: profile === false ? parseInt(collectionid) : null,
      user_id: userData.id,
    },
    {
      getNextPageParam: (p) => {
        if (p.getCreatorEarningListPaginate.pageInfo.hasNextPage) {
          return {
            first: 4,
            after: p.getCreatorEarningListPaginate.pageInfo.endCursor,
          };
        } else {
          return undefined;
        }
      },
    }
  );
  const totallist = data?.pages[0].getCreatorEarningListPaginate.edges?.length;
  return (
    <section className={`section ${classes.wrapper}`}>
      <div className="container">
        {profile === false && (
          <div className={classes.topSection}>
            <h2>
              {t("Creator Earnings of")} {slug}
            </h2>
          </div>
        )}

        {isLoading && <NoItems title={<LoadingCircles />} />}

        {error && <NoItems title={t("Failed to load Creator Earnings")} />}

        {isSuccess && totallist === 0 && (
          <NoItems title={t("No earnings found!")} />
        )}

        {/* @ts-ignore */}
        {isSuccess && totallist > 0 && (
          <div className={`table-responsive-md ps-5 ${classes.wrapper}`}>
            <table className={`table ${classes.table}`}>
              <caption>{t("Creator Earnings History")}</caption>
              <thead>
                <tr>
                  <th className="col-1 pl-5">{t("Item")}</th>
                  <th className="col-1">{t("Royalty earned")}</th>
                  <th className="col-1">{t("Payout address")}</th>
                  <th className="col-1">{t("Date")}</th>
                </tr>
              </thead>

              {loading && <Loading />}

              <tbody>
                {/* @ts-ignore */}
                {isSuccess &&
                  data?.pages?.map((page) => {
                    return page?.getCreatorEarningListPaginate?.edges?.map(
                      (item: any, index) => (
                        <tr
                          key={item?.node?.item?.name + index}
                          className={`${classes.row} `}
                        >
                          <td>
                            <img
                              src={
                                item?.node?.item?.thumbnail_path ||
                                "/assets/images/star.svg"
                              }
                              alt={item?.node?.item?.name}
                              width={48}
                              height={48}
                            />
                            <Link href={`/assets/${item?.node?.item?.slug}`}>
                              <a>
                                <span className="ml-2">
                                  {item?.node?.item?.name}
                                </span>
                              </a>
                            </Link>
                          </td>
                          <td>
                            <RcTooltip
                              overlay={item?.node?.payment_token?.token_symbol}
                            >
                              <img
                                src={
                                  item?.node?.payment_token?.logo ||
                                  "/assets/images/star.svg"
                                }
                                alt={item?.node?.payment_token?.token_symbol}
                                width={10}
                                height={10}
                              />
                            </RcTooltip>
                            <span className="ml-1">
                              {noExponents(item?.node?.royalty_amount, 18)}
                            </span>
                          </td>
                          <td>
                            <RcTooltip overlay={item?.node?.royalty_address}>
                              {collapseAddress(item?.node?.royalty_address)}
                            </RcTooltip>
                          </td>
                          <td>{moment(item?.node?.created_at).fromNow()}</td>
                        </tr>
                      )
                    );
                  })}
              </tbody>
            </table>

            <ItemLoaderButton
              controls={{ fetchNextPage, hasNextPage, isFetchingNextPage }}
            />
          </div>
        )}
      </div>
    </section>
  );
};
//lang ok
