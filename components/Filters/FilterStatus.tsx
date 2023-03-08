import { ProfileDisclosure } from "components/ProfileDisclosure";
import useTranslation from "next-translate/useTranslation";
import { ITEM_FILTER_STATUS_BUY_NOW, ITEM_FILTER_STATUS_ON_AUCTION, ITEM_FILTER_STATUS_NEW, ITEM_FILTER_STATUS_HAS_OFFERS } from "src/helpers/coreconstants";
import { handleSelectedFilterData } from "src/helpers/functions";
import { FilterComponentType, FilterItemType } from "src/types";
import classes from "./SidebarItems.module.css";

export const FilterStatus = ({
  selected,
  setSelected,
}: FilterComponentType) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const FilterStatusList = [
    { id: ITEM_FILTER_STATUS_BUY_NOW, title: t("Buy Now") },
    { id: ITEM_FILTER_STATUS_ON_AUCTION, title: t("on auction") },
    { id: ITEM_FILTER_STATUS_NEW, title: t("new") },
    { id: ITEM_FILTER_STATUS_HAS_OFFERS, title: t("has offers") },
  ];

  return (
    <ProfileDisclosure title={t("status")} passKey={false}>
      <div className={classes.statusBtnGroup}>
        {FilterStatusList.map((el) => (
          <button
            key={el.id}
            type="button"
            className={`${classes.statusBtn} ${
              selected.some((item: FilterItemType) => item.id === el.id)
                ? classes.statusBtnSelected
                : classes.statusBtnUnselected
            }`}
            onClick={() => handleSelectedFilterData(el, selected, setSelected)}
          >
            {el.title}
          </button>
        ))}
      </div>
    </ProfileDisclosure>
  );
};
//lang ok
