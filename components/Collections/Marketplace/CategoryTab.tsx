import { ItemLoaderButton } from "components/Loader/ItemLoaderButton";
import { LoadingCircles } from "components/Loader/LoadingCircles";
import { NoItems } from "components/NoItems";
import useTranslation from "next-translate/useTranslation";
import { useInfiniteGetCollectionListsPaginateQuery } from "src/graphql/generated";
import { Card } from "../Card";

export const CategoryTab = ({categoryId}:any)=> {
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
      first: 21,
      after: undefined,
      category_id: categoryId,
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (p) => {
        if (p.getCollectionListsPaginate.pageInfo.hasNextPage) {
          return {
            first: 21,
            after: p.getCollectionListsPaginate.pageInfo.endCursor,
          };
        } else {
          return undefined;
        }
      },
    }
  );
  const totalCollections =
  data?.pages[0].getCollectionListsPaginate?.totalCount;
  return(
    <div className="row mt-5 ">
      {isLoading && <NoItems title={<LoadingCircles />} />}

      {error && <NoItems title={t("Failed to load collections")} />}

      {isSuccess && totalCollections === 0 && (
        <NoItems title={t("No collections found!")} />
      )}
      {isSuccess &&
      data?.pages?.map((page) => {
        return page.getCollectionListsPaginate.edges?.map((item) => (
          <div key={item.node.id}
            className="col-md-4 col-xl-4 d-flex justify-content-center align-items-center"
          >
            <Card item={item.node} widthValue={35} />
          </div>
        ));
      })}
      
      <ItemLoaderButton
        controls={{ fetchNextPage, hasNextPage, isFetchingNextPage }}
      />
    </div>
    
  )

}