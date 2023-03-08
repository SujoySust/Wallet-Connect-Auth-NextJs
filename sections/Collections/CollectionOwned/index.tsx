import { Loading } from "../../../components/Loader/Loading";
import { NoItems } from "../../../components/NoItems";
import { useCollectionsByAddressQuery } from "../../../src/graphql/generated";
import { Item } from "./Item";
import { useSelector } from "react-redux";
import { RootState } from "../../../src/store";
import useTranslation from "next-translate/useTranslation";

export const MyCollections = () => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const userData = useSelector((state: RootState) => state.userData.userData);

  const { isLoading, data, error, isSuccess } = useCollectionsByAddressQuery(
    {
      //@ts-ignore
      wallet_address: userData.wallet_address,
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      {isLoading && (
        <NoItems
          title={
            <>
              <Loading />
            </>
          }
        />
      )}

      {error && <NoItems title={t("Something went wrong!")} />}

      {isSuccess && data?.collectionsByAddress.length === 0 ? (
        <NoItems title={t("No Collection's to display")} />
      ) : (
        <div className="row">
          {data &&
            data?.collectionsByAddress?.map((item) => {
              return (
                <div
                  key={item.id}
                  className="col-md-6 col-xl-4 d-flex justify-content-center align-items-center"
                >
                  <Item item={item} widthValue={30} />
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};
