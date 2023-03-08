import { FcCheckmark } from "react-icons/fc";
import { handleSelectedFilterData } from "src/helpers/functions";
import { FilterItemType } from "src/types";
import classes from "./SidebarItems.module.css";

interface FilterButtonWithImageType {
  selected: FilterItemType[];
  setSelected: React.Dispatch<React.SetStateAction<FilterItemType[]>>;
  id: number;
  title: string;
  logo?: string | null | undefined;
  amount?: number | undefined;
}

export const FilterButtonWithImage = ({
  selected,
  setSelected,
  id,
  title,
  logo,
  amount,
}: FilterButtonWithImageType) => {
  return (
    <button
      type="button"
      className={classes.FilterButton}
      onClick={() =>
        handleSelectedFilterData(
          {
            id,
            title,
          },
          selected,
          setSelected
        )
      }
    >
      <div>
        <span className={`rounded-circle mr-3 ${classes.FilterButtonIcon}`}>
          {selected?.some((item: FilterItemType) => item.id === id) ? (
            <FcCheckmark aria-label="selected item" />
          ) : (
            <img
              // @ts-ignore
              src={logo || "/assets/images/star.svg"}
              alt={title}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevent looping
                currentTarget.src = "/assets/images/star.svg";
              }}
            />
          )}
        </span>
        <span className={`overflow-text ${classes.title}`}>{title}</span>
      </div>

      <span className={classes.rightSide}>{amount && amount}</span>
    </button>
  );
};
//lang ok
