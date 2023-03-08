import { ImageItem } from "components/Images";
import { ItemLoaderButton } from "components/Loader/ItemLoaderButton";
import { LoadingCircles } from "components/Loader/LoadingCircles";
import { NoItems } from "components/NoItems";
import { RcTooltip } from "components/Tooltip/rcTooltip";
import moment from "moment";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useInfiniteGetUserBuyOfferListsQuery } from "src/graphql/generated";
import { formatPriceK } from "src/helpers/functions";
import classes from "../MadeReceived.module.css";

const Recieve = ({ userId }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  const humanizeDifference = (endDate: string) => {
    const minutesDifference = moment(endDate).diff(new Date(), "minutes");
    const durationHumanize = moment
      .duration(minutesDifference, "minutes")
      .humanize();

    return durationHumanize;
  };
  const checkExpired = (endDate: string, status: number) => {
    const now = new Date();
    const end = new Date(endDate);
    if (now > end) {
      return true;
    } else {
      return false;
    }
  };

  const {
    data,
    isLoading,
    error,
    isSuccess,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteGetUserBuyOfferListsQuery(
    {
      first: 10,
      after: undefined,
      offer_receiver_id: userId,
    },
    {
      getNextPageParam: (p) => {
        if (p.getUserBuyOfferLists.pageInfo.hasNextPage) {
          return {
            first: 10,
            after: p.getUserBuyOfferLists.pageInfo.endCursor,
          };
        } else {
          return undefined;
        }
      },
      refetchOnWindowFocus: false,
    }
  );

  // console.log(data?.pages[0].getUserBuyOfferLists?.edges[0].node);

  const totalItems = data?.pages[0].getUserBuyOfferLists?.totalCount;

  return (
    <div className={classes.container}>
      {isLoading && (
        <NoItems
          title={
            <>
              {" "}
              <LoadingCircles />
            </>
          }
        />
      )}

      {error && <NoItems title={error} className="my-3" />}

      {isSuccess && totalItems === 0 && (
        <NoItems title={t("No data to display")} className="my-3" />
      )}

      {isSuccess && userId && totalItems !== 0 && (
        <div className="table-responsive">
          <table className="table table-borderless">
            <thead style={{ borderBottom: "1px solid var(--border-4)" }}>
              <tr>
                {" "}
                <th className="py-5">{t("Item")}</th>
                <th className="py-5 ">{t("Price")}</th>
                <th className="py-5">{t("USD Price")}</th>
                {/* <th className="py-5">{t("Floor Difference")}</th> */}
                <th className="py-5">{t("Created At")}</th>
                <th className="py-5">{t("Expired At")}</th>
                <th className="py-5">{t("From")}</th>
              </tr>
            </thead>
            <tbody className={classes.tableBody}>
              {isSuccess &&
                userId &&
                totalItems !== 0 &&
                data?.pages?.map((page) => {
                  return page.getUserBuyOfferLists?.edges?.map((item: any) => (
                    <tr className={classes.row} key={item.node.id}>
                      <td>
                        <Link href={`/assets/${item.node.item.slug}`}>
                          <a>{item.node.item?.name}</a>
                        </Link>
                      </td>
                      <td className={classes.prices}>
                        {/* offerItem.payment_token */}

                        <RcTooltip
                          overlay={item.node.payment_token?.token_symbol}
                        >
                          <img
                            src={item.node.payment_token?.logo}
                            alt={item.node.payment_token?.name}
                            className={classes.tokenLogo}
                          />
                        </RcTooltip>

                        <RcTooltip overlay={item.node.total_amount}>
                          {item.node.total_amount}{" "}
                          <span className="d-none d-sm-inline-block">
                            {item.node.payment_token?.token_symbol}
                          </span>
                        </RcTooltip>
                      </td>
                      <td>
                        <RcTooltip
                          overlay={
                            <>
                              {item.node.total_amount *
                                item.node.payment_token?.usd_rate}
                            </>
                          }
                        >
                          $
                          {formatPriceK(
                            item.node.total_amount *
                              item.node.payment_token?.usd_rate
                          )}
                        </RcTooltip>
                      </td>
                      <td>
                        <RcTooltip
                          overlay={
                            <>{moment(item.node.start_date).format("llll")}</>
                          }
                        >
                          {" "}
                          {moment(item.node.start_date).fromNow()}
                        </RcTooltip>
                      </td>
                      <td>
                        <RcTooltip
                          overlay={
                            <>{moment(item.node.end_date).format("llll")}</>
                          }
                        >
                          {" "}
                          {moment(item.node.end_date).fromNow()}
                          {/* {humanizeDifference(item.node.end_date)} */}
                        </RcTooltip>
                      </td>

                      <td>
                        <Link href={`/profile/${item.node?.user?.username}`}>
                          <a>{item.node?.user?.username}</a>
                        </Link>
                      </td>
                    </tr>
                  ));
                })}
            </tbody>
          </table>

          <ItemLoaderButton
            controls={{ fetchNextPage, hasNextPage, isFetchingNextPage }}
          />
        </div>
      )}
    </div>
  );
};

export default Recieve;
//lang ok
