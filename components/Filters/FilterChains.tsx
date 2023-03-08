import { LoadingCircles } from "components/Loader/LoadingCircles";
import { ProfileDisclosure } from "components/ProfileDisclosure";
import useTranslation from "next-translate/useTranslation";
import { FilterButtonWithImage } from "./FilterButtonWithImage";
import { useGetBlockchainListsForFilterQuery } from "src/graphql/generated";
import { FilterComponentType } from "src/types";

export const FilterChains = ({
  selected,
  setSelected,
}: FilterComponentType) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  // fetch chains from the query
  const { isLoading, error, isSuccess, data } =
    useGetBlockchainListsForFilterQuery(
      {},
      {
        refetchOnWindowFocus: false,
      }
    );

  return (
    <ProfileDisclosure title={t("chains")}>
      {isLoading && (
        <p className="text-center">
          <LoadingCircles />
        </p>
      )}

      {error && <p className="text-center">{t("Couldn't fetch!")}</p>}

      {isSuccess && data?.getBlockchainLists.length === 0 ? (
        <p className="text-center">{t("No blockchain found!")}</p>
      ) : (
        data?.getBlockchainLists.map((el) => (
          <FilterButtonWithImage
            key={el.id}
            selected={selected}
            setSelected={setSelected}
            id={el.id}
            title={el.network_name}
            logo={el.logo}
          />
        ))
      )}
    </ProfileDisclosure>
  );
};
//lang ok
