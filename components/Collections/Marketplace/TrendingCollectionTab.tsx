import { LoadingCircles } from "components/Loader/LoadingCircles";
import { NoItems } from "components/NoItems";
import useTranslation from "next-translate/useTranslation";
import { useGetTrendingCollectionListQuery } from "src/graphql/generated";
import { CardRaw } from "../Card/CardRaw";

export const TrendingCollectionTab = () => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const { data, isLoading, error, isSuccess } =
    useGetTrendingCollectionListQuery({
      limit: 21,
    });

  const totalCollections = data?.getTrendingCollectionList?.length ?? 0;

  return (
    <div className="row mt-5 ">
      {isLoading && <NoItems title={<LoadingCircles />} />}

      {error && <NoItems title={t("Failed to load collections")} />}

      {isSuccess && totalCollections === 0 && (
        <NoItems title={t("No collections found!")} />
      )}
      {isSuccess &&
        data?.getTrendingCollectionList?.map((item) => {
          return (
            <div
              key={item.id}
              className="col-md-4 col-xl-4 d-flex justify-content-center align-items-center"
            >
              <CardRaw item={item} widthValue={35} />
            </div>
          );
        })}
    </div>
  );
};
