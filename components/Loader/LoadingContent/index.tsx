import classes from "./LoadingContent.module.css";
import { LoadingCircles } from "../LoadingCircles";
import useTranslation from "next-translate/useTranslation";

export const LoadingContent = () => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  return (
    <div className={classes.content}>
      <LoadingCircles />

      <h3>{t("Processing")}...</h3>

      <p>
        {t(
          "Your amount will be added to your account once the transaction is processed"
        )}
        .
      </p>
    </div>
  );
};
//lang ok
