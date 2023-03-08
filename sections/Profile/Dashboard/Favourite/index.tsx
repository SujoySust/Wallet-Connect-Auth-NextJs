import useTranslation from "next-translate/useTranslation";
import { ItemCard } from "components/ItemCard";
import { ItemLoaderButton } from "components/Loader/ItemLoaderButton";
import classes from "./Favourite.module.css";
import { LoadingCircles } from "components/Loader/LoadingCircles";
import { NoItems } from "components/NoItems";
import React from "react";
import { useInfiniteGetUserItemFavouriteListsQuery } from "src/graphql/generated";

const FavouriteList = ({ userId }: any) => {
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
  } = useInfiniteGetUserItemFavouriteListsQuery(
    {
      first: 10,
      after: undefined,
      viewer_id: userId,
    },
    {
      getNextPageParam: (p) => {
        if (p.getUserItemFavouriteLists.pageInfo.hasNextPage) {
          return {
            first: 10,
            after: p.getUserItemFavouriteLists.pageInfo.endCursor,
          };
        } else {
          return undefined;
        }
      },
      refetchOnWindowFocus: false,
    }
  );

  const totalItems = data?.pages[0].getUserItemFavouriteLists.totalCount;

  return (
    <>
      {isLoading && (
        <div className="p-3 p-sm-5">
          <NoItems title={<LoadingCircles />} />
        </div>
      )}

      {error && (
        <div className="p-3 p-sm-5">
          <NoItems title={t("Failed to load collections")} />
        </div>
      )}

      {isSuccess && totalItems === 0 && (
        <div className="p-3 p-sm-5">
          <NoItems title={t("No item found!")} />
        </div>
      )}

      {isSuccess && userId && totalItems !== 0 && (
        <div className={classes.items}>
          {data?.pages?.map((page) => {
            return page.getUserItemFavouriteLists.edges?.map((item) => (
              <ItemCard key={item.node.id} item={item.node} />
            ));
          })}
        </div>
      )}

      <ItemLoaderButton
        controls={{ fetchNextPage, hasNextPage, isFetchingNextPage }}
      />
    </>
  );
};

export default FavouriteList;
