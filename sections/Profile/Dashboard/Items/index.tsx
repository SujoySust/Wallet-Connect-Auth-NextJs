import { LoadingCircles } from "components/Loader/LoadingCircles";
import { NoItems } from "components/NoItems";
import React from "react";
import { useInfiniteGetItemListsQuery } from "src/graphql/generated";
import classes from "./items.module.css";
import useTranslation from "next-translate/useTranslation";
import { CardContainer } from "components/CardContainer";
import { ItemCard } from "components/ItemCard";
import { ItemLoaderButton } from "components/Loader/ItemLoaderButton";

const DashboardItem = ({ creatorId }: any) => {
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
  } = useInfiniteGetItemListsQuery(
    {
      first: 10,
      after: undefined,
      creator_id: creatorId,
      viewer_id: creatorId,
    },
    {
      getNextPageParam: (p) => {
        if (p.getItemLists.pageInfo.hasNextPage) {
          return {
            first: 10,
            after: p.getItemLists.pageInfo.endCursor,
          };
        } else {
          return undefined;
        }
      },
      refetchOnWindowFocus: false,
    }
  );

  const totalItems = data?.pages[0].getItemLists.totalCount;

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

      <div className={"" + classes.items}>
        {isSuccess &&
          creatorId &&
          totalItems !== 0 &&
          data?.pages?.map((page) => {
            return page.getItemLists.edges?.map((item) => (
              <>
                <ItemCard key={item.node.id} item={item.node} />
              </>
            ));
          })}
      </div>

      <ItemLoaderButton
        controls={{ fetchNextPage, hasNextPage, isFetchingNextPage }}
      />
    </>
  );
};

export default DashboardItem;
//lang ok
