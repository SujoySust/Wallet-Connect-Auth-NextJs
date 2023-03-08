import { ItemRow } from "components/ItemRow";
import { ItemLoaderButton } from "components/Loader/ItemLoaderButton";
import { LoadingCircles } from "components/Loader/LoadingCircles";
import { NoItems } from "components/NoItems";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { useInfiniteGetSellOfferListsByUserQuery } from "src/graphql/generated";
import classes from "../MadeReceived.module.css";

const ActiveInactive = ({ userId, status }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const {
    data,
    isLoading,
    error,
    isSuccess,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteGetSellOfferListsByUserQuery(
    {
      first: 10,
      after: undefined,
      status: status,
      user_id: userId,
    },
    {
      getNextPageParam: (p) => {
        if (p.getSellOfferListsByUser.pageInfo.hasNextPage) {
          return {
            first: 10,
            after: p.getSellOfferListsByUser.pageInfo.endCursor,
          };
        } else {
          return undefined;
        }
      },
      refetchOnWindowFocus: false,
    }
  );

  const totalItems = data?.pages[0].getSellOfferListsByUser?.totalCount;

  return (
    <>
      <div className={classes.container}>
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

        {isSuccess && totalItems === 0 && (
          <NoItems title={t("No data to display")} />
        )}

        {isSuccess && totalItems !== 0 && (
          <div className="table-responsive">
            <table className="table table-borderless">
              <thead style={{ borderBottom: "1px solid var(--border-4)" }}>
                <tr>
                  <th>{t("Item")}</th>
                  <th>{t("Price")}</th>
                  <th>{t("Owner")}</th>
                  <th>{t("Created At")}</th>
                  <th>{t("Expires At")}</th>
                </tr>
              </thead>

              <tbody>
                {userId &&
                  data?.pages?.map((page) => {
                    return page.getSellOfferListsByUser.edges?.map((item) => (
                      <ItemRow key={item.node.id} data={item.node} />
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
    </>
  );
};

export default ActiveInactive;
