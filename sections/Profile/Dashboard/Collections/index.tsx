import useTranslation from "next-translate/useTranslation";
import { Card } from "../../../../components/Collections/Card";
import { ItemLoaderButton } from "../../../../components/Loader/ItemLoaderButton";
import { LoadingCircles } from "../../../../components/Loader/LoadingCircles";
import { NoItems } from "../../../../components/NoItems";
import { useInfiniteGetCollectionListsPaginateQuery } from "../../../../src/graphql/generated";
import classes from "./Collection.module.css";

export const Collections = ({ userId }: any) => {
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
  } = useInfiniteGetCollectionListsPaginateQuery(
    {
      first: 10,
      after: undefined,
      user_id: userId,
    },
    {
      getNextPageParam: (p) => {
        if (p.getCollectionListsPaginate.pageInfo.hasNextPage) {
          return {
            first: 10,
            after: p.getCollectionListsPaginate.pageInfo.endCursor,
          };
        } else {
          return undefined;
        }
      },
      refetchOnWindowFocus: false,
    }
  );

  const totalCollections =
    data?.pages[0].getCollectionListsPaginate?.totalCount;

  return (
    <>
      {isLoading && (
        <div className="p3 p-sm-5">
          <NoItems title={<LoadingCircles />} />
        </div>
      )}

      {error && (
        <div className="p3 p-sm-5">
          <NoItems title={t("Failed to load collections")} />
        </div>
      )}

      {isSuccess && totalCollections === 0 && (
        <div className="p3 p-sm-5">
          <NoItems title={t("No collections found!")} />
        </div>
      )}

      {isSuccess && userId && totalCollections !== 0 && (
        <div className={classes.container}>
          {data?.pages?.map((page) => {
            return page.getCollectionListsPaginate.edges?.map((item) => (
              <Card key={item.node.id} item={item.node} widthValue={30} />
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
