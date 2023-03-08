import classes from "./Alert.module.css";
import { FiX } from "react-icons/fi";
import { RcTooltip } from "../Tooltip/rcTooltip";
import { useState } from "react";
import useTranslation from "next-translate/useTranslation";
export const Alert = ({ title }: any) => {
  const [hidden, setHidden] = useState(false);
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  return (
    <div hidden={hidden} className={classes.alert}>
      <div className={`container ${classes.alertContainer}`}>
        <span className={classes.title}>{title || t("Alert")}</span>

        <RcTooltip overlay={`Close`}>
          <button
            type="button"
            className={classes.close}
            onClick={() => setHidden(true)}
            aria-label={t("close alert")}
          >
            <FiX aria-label={t("close alert")} />
          </button>
        </RcTooltip>
      </div>
    </div>
  );
};
