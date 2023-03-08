import { ProfileDisclosure } from "components/ProfileDisclosure";
import useTranslation from "next-translate/useTranslation";
import { ITEM_EVENT_TYPE_LISTINGS, ITEM_EVENT_TYPE_SALES, ITEM_EVENT_TYPE_BIDS, ITEM_EVENT_TYPE_TRANSFERS, ITEM_EVENT_TYPE_MINT, ITEM_EVENT_TYPE_BUY_OFFERS } from "src/helpers/coreconstants";
import { handleSelectedFilterData } from "src/helpers/functions";
import { FilterComponentType, FilterItemType } from "src/types";
import classes from "./SidebarItems.module.css";

export const FilterEventType = ({
  selected,
  setSelected,
}: FilterComponentType) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const FilterEventTypeList = [
    { id: ITEM_EVENT_TYPE_LISTINGS, title: t("Listing") },
    { id: ITEM_EVENT_TYPE_SALES, title: t("Sale") },
    { id: ITEM_EVENT_TYPE_BIDS, title: t("Bid") },
    { id: ITEM_EVENT_TYPE_TRANSFERS, title: t("Transfer") },
    { id: ITEM_EVENT_TYPE_MINT, title: t("Mint") },
    { id: ITEM_EVENT_TYPE_BUY_OFFERS, title: t("Offer") },
  ];

  return (
    <ProfileDisclosure title={t("Event Type")} passKey={false}>
      <div className={classes.statusBtnGroup}>
        {FilterEventTypeList.map((el) => (
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
