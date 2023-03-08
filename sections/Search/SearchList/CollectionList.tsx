import { RcTooltip } from "components/Tooltip/rcTooltip";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import classes from "./SearchList.module.css";

interface collectionType {
  id: number;
  name: string;
  slug: string;
  logo: string;
  blockchain: {
    id: number;
    logo: string | null | undefined;
    network_name: string;
  };
}

export const CollectionList = ({ collections }: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  return (
    <ul className={classes.list}>
      <li className={classes.caption}>{t("Collections")}</li>
      {collections.map((collection: collectionType) => (
        <li key={collection.id}>
          <Link href={`/collections/${collection.slug}`}>
            <a className={classes.collectionItem}>
              <div className={classes.collectionItemInner}>
                <img
                  src={collection.logo || "/assets/images/star.svg"}
                  alt={collection.name}
                  className={classes.image}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevent looping
                    currentTarget.src = "/assets/images/star.svg";
                  }}
                />

                <h4>{collection.name}</h4>
              </div>

              <RcTooltip overlay={collection.blockchain.network_name}>
                <img
                  src={collection.blockchain.logo || "/assets/images/star.svg"}
                  alt={collection.blockchain.network_name}
                  className={classes.tokenImage}
                />
              </RcTooltip>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
//lang ok
