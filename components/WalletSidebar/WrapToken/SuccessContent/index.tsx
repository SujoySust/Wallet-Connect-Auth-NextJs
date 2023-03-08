import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";
import classes from "./SuccessContent.module.css";

export const SuccessContent = () => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  return (
    <div className={classes.content}>
      <span className={classes.icon}>
        <FiCheckCircle />
      </span>

      <h3>{t("Transaction Complete")}!</h3>

      <p>
        {t(
          "Your amount has been added to your account and will appear in your wallet shortly."
        )}
      </p>
    </div>
  );
};

export const SuccessContentButton = ({ onClick }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  return (
    <button type="button" className="primary-btn" onClick={onClick}>
      {t("View Wallet")}
    </button>
  );
};
//lang ok
