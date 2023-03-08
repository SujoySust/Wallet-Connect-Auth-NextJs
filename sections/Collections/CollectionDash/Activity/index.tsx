import useTranslation from "next-translate/useTranslation";
import { ItemLoaderButton } from "../../../../components/Loader/ItemLoaderButton";
import { LoadingCircles } from "../../../../components/Loader/LoadingCircles";
import { NoItems } from "../../../../components/NoItems";
import { useInfiniteGetItemActivitiesPaginateQuery } from "../../../../src/graphql/generated";
import { ActivityRow } from "./ActivityRow";
import { CollectionChart } from "components/Collections/Chart";

export const CollectionActivity = ({
  collectionId,
  selectedEvent,
  selectedCollection,
  selectedChains,
  userId,
  Chart,
}: any) => {
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
  } = useInfiniteGetItemActivitiesPaginateQuery(
    {
      first: 25,
      after: undefined,
      collection_id: selectedCollection.length
        ? selectedCollection.map((c: any) => c.id)
        : collectionId
        ? collectionId
        : null,
      user_id: userId ? userId : null,
      event_type: selectedEvent.length
        ? selectedEvent?.map((item: any) => item.id)
        : undefined,
      blockchain_id: selectedChains.length
        ? selectedChains.map((item: any) => item.id)
        : undefined,
    },
    {
      getNextPageParam: (p) => {
        if (p.getItemActivitiesPaginate.pageInfo.hasNextPage) {
          return {
            first: 25,
            after: p.getItemActivitiesPaginate.pageInfo.endCursor,
          };
        } else {
          return undefined;
        }
      },
      refetchOnWindowFocus: false,
    }
  );
  const totalItems = data?.pages[0].getItemActivitiesPaginate?.totalCount;
  return (
    <>
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
        <NoItems title={t("No activities to display")} />
      )}

      {isSuccess && totalItems !== 0 && (
        <>
          {Chart !== false && <CollectionChart collection_id={collectionId} />}
          <div className="table-responsive">
            <table className="table table-borderless">
              <thead style={{ borderBottom: "1px solid var(--border-4)" }}>
                <tr>
                  <th className="py-5">{t("Event")}</th>
                  <th className="py-5">{t("Item")}</th>
                  <th className="py-5">{t("Price")}</th>
                  <th className="py-5">{t("From")}</th>
                  <th className="py-5">{t("To")}</th>
                  <th className="py-5">{t("Time")}</th>
                </tr>
              </thead>

              <tbody>
                {data?.pages?.map((page) => {
                  return page.getItemActivitiesPaginate.edges?.map((item) => (
                    <ActivityRow key={item.node.id} data={item.node} />
                  ));
                })}
              </tbody>
            </table>

            <ItemLoaderButton
              controls={{ fetchNextPage, hasNextPage, isFetchingNextPage }}
            />
          </div>
        </>
      )}
    </>
  );
};
//lang ok
