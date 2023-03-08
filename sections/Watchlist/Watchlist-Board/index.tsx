import { CardContainer } from "components/CardContainer";
import { ItemLoaderButton } from "components/Loader/ItemLoaderButton";
import { Loading } from "components/Loader/Loading";
import { LoadingCircles } from "components/Loader/LoadingCircles";
import { NoItems } from "components/NoItems";
import React from "react";
import { Card } from "components/Collections/Card";
import { Item } from "sections/Collections/CollectionOwned/Item";
import { useInfiniteMyCollectionWatchListQuery } from "src/graphql/generated";
import useTranslation from "next-translate/useTranslation";
const WatchListBoard = () => {
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
  } = useInfiniteMyCollectionWatchListQuery(
    {
      first: 5,
    },
    {
      getNextPageParam: (p) => {
        if (p.myCollectionWatchList.pageInfo.hasNextPage) {
          return {
            first: 5,
            after: p.myCollectionWatchList.pageInfo.endCursor,
          };
        } else {
          return undefined;
        }
      },
      refetchOnWindowFocus: false,
    }
  );
  const totalCount = data?.pages[0]?.myCollectionWatchList?.totalCount;

  return (
    <div>
      {isLoading && (
        <p className="text-center">
          <LoadingCircles />
        </p>
      )}
      {error && <NoItems title={t("Something went wrong!")} />}
      {isSuccess && totalCount === 0 ? (
        <NoItems title={t("No Collection added to watchlist")} />
      ) : (
        <div className="row">
          {data?.pages?.map((page) => {
            return page?.myCollectionWatchList?.edges?.map((item) => {
              return (
                // @ts-ignore
                <CardContainer key={item.node.id}>
                  <Card item={item.node} />
                </CardContainer>
              );
            });
          })}
        </div>
      )}
      {isSuccess && (
        <ItemLoaderButton
          controls={{ fetchNextPage, hasNextPage, isFetchingNextPage }}
        />
      )}
    </div>
  );
};

export default WatchListBoard;
//lang ok
