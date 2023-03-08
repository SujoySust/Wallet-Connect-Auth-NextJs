import { Dispatch, SetStateAction } from "react";
import Select from "react-select";
import useTranslation from "next-translate/useTranslation";
import {
  SORTING_VALUE_NEWEST,
  SORTING_VALUE_OLDEST,
  SORTING_VALUE_PRICE_L2H,
  SORTING_VALUE_PRICE_H2L,
  SORTING_VALUE_MOST_FAVOURITE,
  SORTING_VALUE_MOST_VIEWED,
} from "src/helpers/coreconstants";
interface SortingMenuType {
  className?: string;
  setSort: Dispatch<
    SetStateAction<{
      field: string;
      direction: string;
    }>
  >;
}

export const SortingMenu = ({ className, setSort }: SortingMenuType) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const SortingItemsList = [
    { value: SORTING_VALUE_NEWEST, label: t("Newest") },
    { value: SORTING_VALUE_OLDEST, label: t("Oldest") },
    { value: SORTING_VALUE_PRICE_L2H, label: t("Price Low to High") },
    { value: SORTING_VALUE_PRICE_H2L, label: t("Price High to Low") },
    { value: SORTING_VALUE_MOST_FAVOURITE, label: t("Most Favourite") },
    { value: SORTING_VALUE_MOST_VIEWED, label: t("Most Viewed") },
  ];

  /*

  This component will only change the sorting state

  So, make a sort state in the place where you're using it

  Sample: 

  const [sort, setSort] = useState({
    field: "id",
    direction: "desc",
  });

  */

  const handleSortChange = (el: any) => {
    const id = el.value;

    if (id === 1) {
      setSort({
        field: "id",
        direction: "desc",
      });
    } else if (id === 2) {
      setSort({
        field: "id",
        direction: "asc",
      });
    } else if (id === 3) {
      setSort({
        field: "price",
        direction: "asc",
      });
    } else if (id === 4) {
      setSort({
        field: "price",
        direction: "desc",
      });
    } else if (id === 5) {
      setSort({
        field: "most_favourite",
        direction: "desc",
      });
    } else if (id === 6) {
      setSort({
        field: "view",
        direction: "desc",
      });
    } else {
      setSort({
        field: "id",
        direction: "desc",
      });
    }
  };

  return (
    <Select
      classNamePrefix={"profile"}
      className={className}
      isSearchable={false}
      placeholder={t("Sort by")}
      name={t("sorting")}
      id={t("sorting")}
      options={SortingItemsList}
      // defaultValue={sortingValue}
      onChange={(el) => handleSortChange(el)}
    />
  );
};
//lang ok
