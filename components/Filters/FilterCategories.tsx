import { LoadingCircles } from "components/Loader/LoadingCircles";
import { ProfileDisclosure } from "components/ProfileDisclosure";
import { useGetCategoriesQuery } from "src/graphql/generated";
import { FilterComponentType } from "src/types";
import { FilterButtonWithImage } from "./FilterButtonWithImage";
import useTranslation from "next-translate/useTranslation";

export const FilterCategories = ({
  selected,
  setSelected,
}: FilterComponentType) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const { isLoading, error, isSuccess, data } = useGetCategoriesQuery(
    {},
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <ProfileDisclosure title={t("categories")} passKey={false}>
      {isLoading && (
        <p className="text-center">
          <LoadingCircles />
        </p>
      )}

      {error && <p>{t("Something went wrong!")}</p>}

      {isSuccess && data?.getCategories?.length === 0 ? (
        <p className="text-center">{t("No categories found!")}</p>
      ) : (
        data?.getCategories.map((el) => (
          <FilterButtonWithImage
            key={el.id}
            selected={selected}
            setSelected={setSelected}
            id={el.id}
            title={el.title}
            logo={el.image}
          />
        ))
      )}
    </ProfileDisclosure>
  );
};
//lang ok
