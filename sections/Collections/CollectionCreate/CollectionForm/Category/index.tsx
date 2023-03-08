import Select from "react-select";
import classes from "./Category.module.css";
import { FiX } from "react-icons/fi";
import useTranslation from "next-translate/useTranslation";

export const CategorySelect = ({
  options,
  selectedCategory,
  setSelectedCategory,
}: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  return (
    <div className={classes.categoryWrapper}>
      <Select
        className={`${classes.catSelect} ${
          selectedCategory ? classes.cartSelectDisable : ""
        }`}
        classNamePrefix="select"
        isSearchable={false}
        name="category"
        id="category"
        options={options}
        value={selectedCategory}
        placeholder={t("Select a Category")}
        onChange={(e: any) => setSelectedCategory(e)}
      />

      {selectedCategory && (
        <div className={classes.categorySelected}>
          <button
            type="button"
            className={classes.catButton}
            onClick={() => setSelectedCategory(null)}
          >
            <span> {selectedCategory.label}</span>

            <FiX />
          </button>

          <span className={classes.catInfo}>
            {t("You can select only one category.")}
          </span>
        </div>
      )}
    </div>
  );
};
