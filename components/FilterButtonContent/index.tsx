import useTranslation from "next-translate/useTranslation";
import classes from "./FilterButtonContent.module.css";

export const FilterButtonContent = ({ onClear, children }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  return (
    <div className={classes.content}>
      {children}

      <button type="button" className={classes.clear} onClick={onClear}>
        {t("Clear All")}
      </button>
    </div>
  );
};
