import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import classes from "./Tabs.module.css";
import useTranslation from "next-translate/useTranslation";

export const MarketplaceTabs = ({ items, selected, all = true }: any) => {
  const { t } = useTranslation();
  // const t = (s: string) => s;
  const router = useRouter();
  const { query } = useRouter();
  let tab = router.query.tab;

  if (!tab) {
    tab = selected;
  }

  return (
    <div className={classes.tabsBody}>
      <div className={classes.tabsWrapper}>
        {all && (
          <Link href={`${router.pathname}`}>
            <a className={tab === selected ? classes.active : classes.normal}>
              {t("All")}
            </a>
          </Link>
        )}

        <Link
          key="Top"
          href={{
            pathname: router.pathname,
            query: { ...query, tab: "top" },
          }}
        >
          <a className={'top' === tab ? classes.active : classes.normal}>
            {t("Top")}
          </a>
        </Link>
        <Link
          key="Trending"
          href={{
            pathname: router.pathname,
            query: { ...query, tab: "trending" },
          }} 
        >
          <a className={'trending' === tab ? classes.active : classes.normal}>
            {t("Trending")}
          </a>
        </Link>
        {items.map((item: any) =>
          tab === item.tab ? (
            <a
              key={item.title}
              className={tab === item.tab ? classes.active : classes.normal}
            >
              {item.icon} {item.title}
              {item.totalCount && <span>{item.totalCount}</span>}
            </a>
          ) : (
            <Link
              key={item.title}
              href={{
                pathname: router.pathname,
                query: { ...query, tab: item.tab },
              }}
            >
              <a className={tab === item.tab ? classes.active : classes.normal}>
                {item.icon} {item.title}{" "}
                {item.totalCount && <span>{item.totalCount}</span>}
              </a>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

/*

<Link key={item.title} href={`${router.pathname}?tab=${item.tab}`}>
          <a className={tab === item.tab ? classes.active : classes.normal}>
            {item.icon} {item.title} <span>{item.totalCount}</span>
          </a>
        </Link>

*/
//lang ok
