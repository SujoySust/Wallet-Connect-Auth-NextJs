import classes from "./Footer.module.css";
import useTranslation from "next-translate/useTranslation";

const FooterSection = () => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  return (
    <footer className={classes.footer}>
      <div className={classes.widgetArea}>
        <div className="container">
          <div className="row">
          </div>
        </div>
      </div>

      <div className={classes.footerBottom}>
        <div className="container">
          <p className={classes.copyrightText}>
            &copy;{" "}
            {t("All Rights Reserved by ") +
                process.env.NEXT_PUBLIC_APP_NAME
            }
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
//lang ok
