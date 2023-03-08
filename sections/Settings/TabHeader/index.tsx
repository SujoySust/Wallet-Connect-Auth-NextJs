import Link from "next/link";
import classes from "./TabHeader.module.css";

export const TabHeader = ({ title, url, icon, btnText }: any) => {
  return (
    <div className={classes.headerContainer}>
      <h2>{title}</h2>

      {url && (
        <Link href={url}>
          <a className={classes.button}>
            {icon && <span className="mr-3">{icon}</span>}

            <span>{btnText}</span>
          </a>
        </Link>
      )}
    </div>
  );
};
//lang ok
