import Link from "next/link";
import classes from "./Item.module.css";
import useTranslation from "next-translate/useTranslation";
export const Item = ({ data }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;
  return (
    <div className="col-lg-4 col-md-6">
      <Link href={data.url}>
        <a className={classes.singleWallet}>
          <img
            className={classes.walletIcon}
            src={data.icon}
            alt={data.title}
          />
          <h3 className={classes.walletTitle}>{data.title}</h3>
          <p className={classes.walletContent}>
            {t(
              "Connect with your google, facebook, twitter or discord all social media"
            )}
          </p>
        </a>
      </Link>
    </div>
  );
};
// lang ok
